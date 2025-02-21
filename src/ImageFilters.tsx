import React, { useRef, useEffect } from 'react';
import { predefinedFilters } from './helpers/filters';
import { useDebounce } from './hooks/useDebounce';
import {convert4x4to4x5, multiplyColorMatrices} from "./hooks/matrixUtils";
import { v4 as uuidv4 } from 'uuid';
export type FilterProps = {
    imageUrl: string;
    filter?: string;
    redChannel?: number;
    greenChannel?: number;
    blueChannel?: number;
    brightness?: number;
    contrast?: number;
    saturation?: number;
    hueRotate?: number;
    vignette?: number;
    shadows?: number;
    grain?: number;
    intensity?: number;
    sharpness?: number;
    styles?: React.CSSProperties;
    saveImage?: (file: File) => void;
    preview?: boolean;
};

const WebGLImageFilter: React.FC<FilterProps> = ({
                                                     imageUrl,
                                                     filter,
                                                     redChannel = 1,
                                                     greenChannel = 1,
                                                     blueChannel = 1,
                                                     brightness = 100,
                                                     contrast = 100,
                                                     saturation = 100,
                                                     hueRotate = 0,
                                                     vignette = 0,
                                                     shadows = 100,
                                                     grain = 0,
                                                     intensity = 100,
                                                     sharpness = 0, // sharpness is disabled by default
                                                     saveImage,
                                                     styles,
                                                     preview
                                                 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(new Image());
   // const [savedImage, setSavedImage] = useState<string | null>(null);
    const filterId = `filter-${uuidv4()}`;

    // Debounce the values
    const debouncedBrightness = useDebounce(brightness, 300);
    const debouncedContrast = useDebounce(contrast, 300);
    const debouncedSaturation = useDebounce(saturation, 300);
    const debouncedHueRotate = useDebounce(hueRotate, 300);
    const debouncedRedChannel = useDebounce(redChannel, 300);
    const debouncedGreenChannel = useDebounce(greenChannel, 300);
    const debouncedBlueChannel = useDebounce(blueChannel, 300);
    const debouncedShadows = useDebounce(shadows, 300);
    const debouncedVignette = useDebounce(vignette ?? 0, 300);
    const debouncedGrain = useDebounce(grain ?? 0, 300);
    const debouncedSharpness = useDebounce(sharpness ?? 0, 300);
    const debouncedIntensity = useDebounce(intensity ?? 100, 300);

    // Get the predefined filter settings if available
    const predefinedFilterObj =
        filter && predefinedFilters[filter] ? predefinedFilters[filter] : {};

    // Calculate the final parameter values.
    // For example, the final brightness is computed as:
    // finalBrightness = predefinedBrightness * (brightness / 100)
    const finalBrightness = (predefinedFilterObj.brightness ?? 1) * (brightness / 100);
    const finalContrast = (predefinedFilterObj.contrast ?? 1) * (contrast / 100);
    const finalSaturation = (predefinedFilterObj.saturate ?? 1) * (saturation / 100);
    const finalHue = ((predefinedFilterObj.hueRotate ?? 0) + hueRotate) / 360
    const finalVignette = vignette / 100;
    const u_shadows = shadows / 100;
    const u_grainIntensity = grain / 100;
    const u_sharpness = sharpness / 100;

    // Calculate the final color matrix:
    // If the filter has a colorMatrix, combine it with the user matrix.
    const userMatrix: Float32Array = new Float32Array([
        redChannel, 0, 0, 0,
        0, greenChannel, 0, 0,
        0, 0, blueChannel, 0,
        0, 0, 0, 1,
    ]);
    let finalMatrix = userMatrix;
    if (predefinedFilterObj.colorMatrix) {
        finalMatrix = multiplyColorMatrices(predefinedFilterObj.colorMatrix, userMatrix);
    }
    const u_colorMatrix = new Float32Array(finalMatrix);
    const u_bias = new Float32Array([0, 0, 0, 0]);

    // The filter opacity: if intensity = 100, the full effect is applied; if 0, only the original is used.
    const intensityFactor = (intensity ?? 100) / 100;

    const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
  `;

    const fragmentShaderSource = `
    precision mediump float;
    uniform sampler2D u_image;
    uniform mat4 u_colorMatrix;
    uniform vec4 u_bias;
    uniform float u_brightness;
    uniform float u_contrast;
    uniform float u_saturation;
    uniform float u_hue;
    uniform float u_vignette;
    uniform float u_shadows;
    uniform float u_grainIntensity;
    uniform float u_sharpness;
    uniform vec2 u_resolution;
    uniform float u_intensity;  // filter opacity (0..1)
    varying vec2 v_texCoord;

    // Functions for color operations
    vec3 rgb2yiq(vec3 color) {
      return vec3(
        dot(color, vec3(0.299, 0.587, 0.114)),
        dot(color, vec3(0.596, -0.274, -0.322)),
        dot(color, vec3(0.211, -0.523, 0.312))
      );
    }
    vec3 yiq2rgb(vec3 yiq) {
      return vec3(
        yiq.x + 0.956 * yiq.y + 0.621 * yiq.z,
        yiq.x - 0.272 * yiq.y - 0.647 * yiq.z,
        yiq.x - 1.106 * yiq.y + 1.703 * yiq.z
      );
    }

vec3 rgb2hsl(vec3 color) {
  float maxC = max(color.r, max(color.g, color.b));
  float minC = min(color.r, min(color.g, color.b));
  float delta = maxC - minC;
  float h = 0.0;
  float s = 0.0;
  float l = (maxC + minC) / 2.0;
  
  if (delta != 0.0) {
    s = l < 0.5 ? (delta / (maxC + minC)) : (delta / (2.0 - maxC - minC));
    if (maxC == color.r)
      h = (color.g - color.b) / delta + (color.g < color.b ? 6.0 : 0.0);
    else if (maxC == color.g)
      h = (color.b - color.r) / delta + 2.0;
    else
      h = (color.r - color.g) / delta + 4.0;
    h /= 6.0;
  }
  return vec3(h, s, l);
}

float hue2rgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  if (t < 1.0/6.0) return p + (q - p) * 6.0 * t;
  if (t < 1.0/2.0) return q;
  if (t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
  return p;
}


vec3 hsl2rgb(vec3 hsl) {
  float r, g, b;
  if (hsl.y == 0.0) {
    r = g = b = hsl.z;
  } else {
    float q = hsl.z < 0.5 ? hsl.z * (1.0 + hsl.y) : hsl.z + hsl.y - hsl.z * hsl.y;
    float p = 2.0 * hsl.z - q;
    r = hue2rgb(p, q, hsl.x + 1.0/3.0);
    g = hue2rgb(p, q, hsl.x);
    b = hue2rgb(p, q, hsl.x - 1.0/3.0);
  }
  return vec3(r, g, b);
}


vec3 adjustHueHSL(vec3 color, float hueRotation) {
  vec3 hsl = rgb2hsl(color);
  hsl.x = mod(hsl.x + hueRotation, 1.0);
  return hsl2rgb(hsl);
}
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      // Get the original pixel color
      vec4 origColor = texture2D(u_image, v_texCoord);
      
      // Apply the filter to a copy of the original color
      vec4 color = origColor;
      color = u_colorMatrix * color + u_bias;
      color.rgb *= u_brightness;
      color.rgb = ((color.rgb - 0.5) * u_contrast) + 0.5;
      float gray = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
       color.rgb = mix(vec3(gray), color.rgb, u_saturation);
      color.rgb = adjustHueHSL(color.rgb, u_hue);
      float dist = distance(v_texCoord, vec2(0.5, 0.5));
      float vig = smoothstep(0.5, 1.0, dist);
      color.rgb = mix(color.rgb, color.rgb * (1.0 - vig), u_vignette);
      float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float shadowFactor = mix(u_shadows, 1.0, smoothstep(0.0, 0.5, lum));
      color.rgb *= shadowFactor;
      
      float noise = random(v_texCoord);
      color.rgb += (noise - 0.5) * u_grainIntensity;
      
      if (u_sharpness > 0.0) {
        vec2 texel = 1.0 / u_resolution;
        vec4 north = texture2D(u_image, v_texCoord + vec2(0.0, texel.y));
        vec4 south = texture2D(u_image, v_texCoord - vec2(0.0, texel.y));
        vec4 east  = texture2D(u_image, v_texCoord + vec2(texel.x, 0.0));
        vec4 west  = texture2D(u_image, v_texCoord - vec2(texel.x, 0.0));
        vec4 sharpened = color * (1.0 + 4.0 * u_sharpness) - (north + south + east + west) * u_sharpness;
        color = clamp(sharpened, 0.0, 1.0);
      }
      
      // Final result: mix the original color with the filtered color using u_intensity
      gl_FragColor = mix(origColor, color, u_intensity);
    }
  `;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile error:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

        // Create and bind the vertex buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,  1, -1, -1,  1,
            -1,  1,  1, -1,  1,  1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Create and bind the texture coordinate buffer
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        const texCoords = new Float32Array([
            0, 0,  1, 0,  0, 1,
            0, 1,  1, 0,  1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Setup the texture
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        // Set uniforms
        const u_colorMatrixLoc = gl.getUniformLocation(program, "u_colorMatrix");
        const u_biasLoc = gl.getUniformLocation(program, "u_bias");
        gl.uniformMatrix4fv(u_colorMatrixLoc, false, u_colorMatrix);
        gl.uniform4fv(u_biasLoc, u_bias);

        const u_brightnessLoc = gl.getUniformLocation(program, "u_brightness");
        const u_contrastLoc = gl.getUniformLocation(program, "u_contrast");
        const u_saturationLoc = gl.getUniformLocation(program, "u_saturation");
        const u_hueLoc = gl.getUniformLocation(program, "u_hue");
        const u_vignetteLoc = gl.getUniformLocation(program, "u_vignette");
        const u_shadowsLoc = gl.getUniformLocation(program, "u_shadows");
        const u_grainIntensityLoc = gl.getUniformLocation(program, "u_grainIntensity");
        const u_sharpnessLoc = gl.getUniformLocation(program, "u_sharpness");
        const u_intensityLoc = gl.getUniformLocation(program, "u_intensity");
        gl.uniform1f(u_brightnessLoc, finalBrightness);
        gl.uniform1f(u_contrastLoc, finalContrast);
        gl.uniform1f(u_saturationLoc, finalSaturation);
        gl.uniform1f(u_hueLoc, finalHue);
        gl.uniform1f(u_vignetteLoc, finalVignette);
        gl.uniform1f(u_shadowsLoc, u_shadows);
        gl.uniform1f(u_grainIntensityLoc, u_grainIntensity);
        gl.uniform1f(u_sharpnessLoc, u_sharpness);
        gl.uniform1f(u_intensityLoc, intensityFactor);

        const u_resolutionLoc = gl.getUniformLocation(program, "u_resolution");

        imageRef.current.crossOrigin = "anonymous";
        imageRef.current.src = imageUrl;
        imageRef.current.onload = () => {
            canvas.width = imageRef.current.naturalWidth;
            canvas.height = imageRef.current.naturalHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(u_resolutionLoc, canvas.width, canvas.height);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                imageRef.current
            );
            gl.drawArrays(gl.TRIANGLES, 0, 6);

        };

    }, [
        imageUrl,
        brightness,
        contrast,
        saturation,
        hueRotate,
        vignette,
        u_colorMatrix,
        u_bias,
        finalBrightness,
        finalContrast,
        finalSaturation,
        finalHue,
        finalVignette,
        grain,
        sharpness,
        intensity,
        filter,
    ]);

    // Save the image if a saveImage function is provided
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !saveImage) return;


        setTimeout(() => {
            if (
                !imageRef.current.complete ||
                imageRef.current.naturalWidth === 0 ||
                imageRef.current.naturalHeight === 0
            ) {
                console.error(" 'Not Found'.");
                return;
            }

            const gl = canvas.getContext("webgl");
            if (!gl) return;

            const width = canvas.width;
            const height = canvas.height;
            const pixels = new Uint8Array(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

            const flippedPixels = new Uint8Array(width * height * 4);
            for (let row = 0; row < height; row++) {
                const srcStart = row * width * 4;
                const destStart = (height - row - 1) * width * 4;
                for (let i = 0; i < width * 4; i++) {
                    flippedPixels[destStart + i] = pixels[srcStart + i];
                }
            }


            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = width;
            tempCanvas.height = height;
            const ctx = tempCanvas.getContext("2d");
            if (!ctx) return;

            const imageData = new ImageData(new Uint8ClampedArray(flippedPixels), width, height);
            ctx.putImageData(imageData, 0, 0);


            tempCanvas.toBlob(blob => {
                if (blob) {
                    console.log("📸 Image saved!");
                    const file = new File([blob], "filtered-image.png", { type: "image/png" });
                    //const imUrl = URL.createObjectURL(file);
                   // setSavedImage(imUrl);
                    saveImage(file);
                }
            }, "image/png");
        }, 100);
    }, [
        filter,
        debouncedBrightness,
        debouncedContrast,
        debouncedSaturation,
        debouncedHueRotate,
        debouncedRedChannel,
        debouncedGreenChannel,
        debouncedBlueChannel,
        debouncedShadows,
        debouncedVignette,
        debouncedGrain,
        debouncedSharpness,
        debouncedIntensity,
    ]);


    const previewFilters = `brightness(${finalBrightness*100}%) 
    contrast(${finalContrast*100}%) 
    saturate(${finalSaturation*100}%)
     hue-rotate(${finalHue*360}deg)`;
    console.log(previewFilters)
    const previewMatrix = convert4x4to4x5(finalMatrix);

    if (preview) {
        return (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <svg width="1" height="1">
                    <filter id={filterId} colorInterpolationFilters="sRGB" >
                        <feColorMatrix type="matrix"  values={previewMatrix}/>
                    </filter>
                </svg>
                <img
                    crossOrigin="anonymous"
                    key={filterId}
                    src={imageUrl}
                    alt="Filtered"
                    style={{
                        filter: `url(#${filterId}) ${previewFilters}`,
                        width: '100%',
                        height: '100%',
                        ...styles,
                    }}
                />
            </div>
        );}


    return (
        <div style={{ position: 'absolute', width: '100%', height: '100%',overflow: 'hidden', ...styles }}>
            <canvas
                ref={canvasRef}
                style={preview ? { display: 'none' } : { width: '100%', height: '100%',position: 'relative', top: 0, left: 0, right: 0, bottom: 0 }}
            />
        </div>
    );
};

export default WebGLImageFilter;
