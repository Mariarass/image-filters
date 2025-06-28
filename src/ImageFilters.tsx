import React, { useRef, useEffect, useState, useMemo } from 'react';
import { predefinedFilters } from './helpers/filters';
import { useDebounce } from './hooks/useDebounce';
import {convert4x4to4x5, multiplyColorMatrices} from "./hooks/matrixUtils";
import { v4 as uuidv4 } from 'uuid';

// Gradient cache
const gradientCache = new Map<string, HTMLCanvasElement>();

// Function to programmatically create a gradient
function createGradientCanvas(width: number, height: number, gradientString: string): HTMLCanvasElement {
    // Check cache
    const cacheKey = `${gradientString}_${width}x${height}`;
    if (gradientCache.has(cacheKey)) {
     
        return gradientCache.get(cacheKey)!;
    }

  
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Determine gradient type
    let gradientType = 'linear';
    let gradientMatch = gradientString.match(/(linear|radial)-gradient\(([^)]+)\)/);
    if (!gradientMatch) {
      
        return canvas;
    }
    gradientType = gradientMatch[1];
    const fullContent = gradientMatch[2];
   

    // For linear-gradient, look for angle
    let angle = '0deg';
    let stopsContent = fullContent;
    if (gradientType === 'linear') {
        const angleMatch = fullContent.match(/^(\d+deg)/);
        if (angleMatch) {
            angle = angleMatch[1];
            stopsContent = fullContent.substring(angleMatch[0].length + 1);
        }

    } else {
        // For radial-gradient, just take all content as stops
        stopsContent = fullContent;
    }

    // Split stops, taking into account commas inside rgba
    const stops: string[] = [];
    let currentStop = '';
    let parenCount = 0;
    for (let i = 0; i < stopsContent.length; i++) {
        const char = stopsContent[i];
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        if (char === ',' && parenCount === 0) {
            stops.push(currentStop.trim());
            currentStop = '';
        } else {
            currentStop += char;
        }
    }
    if (currentStop) {
        stops.push(currentStop.trim());
    }
  

    // Create gradient
    let gradient: CanvasGradient | undefined = undefined;
    if (gradientType === 'linear') {
        if (angle.includes('deg')) {
            const deg = parseInt(angle);
            const rad = (deg * Math.PI) / 180;
            const x1 = width / 2 - Math.cos(rad) * width / 2;
            const y1 = height / 2 - Math.sin(rad) * height / 2;
            const x2 = width / 2 + Math.cos(rad) * width / 2;
            const y2 = height / 2 + Math.sin(rad) * height / 2;
            gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        
        } else {
            gradient = ctx.createLinearGradient(0, 0, 0, height);
        }
    } else if (gradientType === 'radial') {
        // radial-gradient(circle, ...)
        // Canvas must be the same size as the image
        const cx = width / 2;
        const cy = height / 2;
        const r = Math.max(width, height) / 2;
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      
    }

    if (!gradient) {

        return canvas;
    }

    // Add color stops
    stops.forEach((stop, index) => {
     
        let color = '';
        let position = '';
        // Only hex + position
        const hexMatch = stop.match(/(#[0-9a-fA-F]{6,8}|#[0-9a-fA-F]{3,4})(.*)/);
        if (hexMatch) {
            color = hexMatch[1];
            position = (hexMatch[2] || '').trim();
        } else {
         
            return;
        }
        // Convert position to a value from 0 to 1
        let positionValue;
        if (position && (position.includes('%') || !isNaN(Number(position)))) {
            if (position.includes('%')) {
                positionValue = parseFloat(position) / 100;
            } else {
                positionValue = parseFloat(position);
            }
        } else {
            positionValue = stops.length === 1 ? 0 : index / (stops.length - 1);
        }
        positionValue = Math.max(0, Math.min(1, positionValue));
        if (!isFinite(positionValue)) {
          
            return;
        }
        gradient?.addColorStop(positionValue, color);
      
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    gradientCache.set(cacheKey, canvas);
 
    return canvas;
}

// Function to clear the cache (can be called when changing the image)
function clearGradientCache() {
    gradientCache.clear();
}

type CropRect = { x: number; y: number; width: number; height: number };
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
    filterIntensity?: number;
    sharpness?: number;
    styles?: React.CSSProperties;
    saveImage?: (file: File) => void;
    preview?: boolean;
    highlights?: number;
    canvasColor?:{
        r:number,
        g:number,
        b:number,
        a:number
    }
    gradient?:string
    crop?: CropRect;
};

const WebGLImageFilter: React.FC<FilterProps> = ({
                                                     imageUrl,
                                                     filter,
                                                     redChannel = 1,
                                                     greenChannel = 1,
                                                     blueChannel = 1,
                                                     brightness = 0,
                                                     contrast = 0,
                                                     saturation = 0,
                                                     hueRotate = 0,
                                                     vignette = 0,
                                                     shadows = 0,
                                                     grain = 0, 
                                                     filterIntensity = 100,
                                                     sharpness = 0,
                                                     saveImage,
                                                     styles,
                                                     preview,
                                                     highlights = 0,
                                                     canvasColor,
                                                     gradient,
                                                     crop
                                                 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(new Image());
    const [gradCanvas, setGradCanvas] = useState<HTMLCanvasElement | null>(null);
    const [gradReady, setGradReady] = useState(false);
  //  const [savedImage, setSavedImage] = useState<string | null>(null);
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
    const debouncedFilterIntensity = useDebounce(filterIntensity ?? 100, 300);
    const debouncedHighlights = useDebounce(highlights, 300);
    const debouncedCanvasColor = useDebounce(canvasColor, 300);
    const debouncedGradient = useDebounce(gradient, 300);

    
    const prevGradientRef = useRef<string | undefined>();
    const prevWidthRef = useRef<number>();
    const prevHeightRef = useRef<number>();

   
    const predefinedFilterObj =
        filter && predefinedFilters[filter] ? predefinedFilters[filter] : {};

    const fi = (filterIntensity ?? 0) / 100;
    
    // Calculate the final parameter values.
    // User parameters are applied directly
    const userBrightness = (brightness + 100) / 100;
    const userContrast = (contrast + 100) / 100;
    const userSaturation = (saturation + 100) / 100;
    const userHue = hueRotate / 360;
    const userShadows = (shadows + 100) / 100;
    const userGrain = grain / 100;
    const userVignette = vignette / 10;
    const userSharpness = sharpness / 100;
    const userHighlights = (highlights + 100) / 100;


    // Apply filter intensity only to preset filter parameters
    const presetBrightness = (predefinedFilterObj.brightness ?? 0) / 100 + 1;
    const presetContrast = (predefinedFilterObj.contrast ?? 0) / 100 + 1;
    const presetSaturation = (predefinedFilterObj.saturate ?? 0) / 100 + 1;
    const presetHue = predefinedFilterObj.hueRotate ?? 0;
    const presetShadows = (predefinedFilterObj.shadows ?? 0) / 100 + 1;
    const presetVignette = (predefinedFilterObj.vignette ?? 0) / 10;
    const presetHighlights = (predefinedFilterObj.highlights ?? 0) / 100 + 1;
  

    // Mix preset filter parameters with neutral values based on intensity
    const adjustedPresetBrightness = 1 + (presetBrightness - 1) * fi;
    const adjustedPresetContrast = 1 + (presetContrast - 1) * fi;
    const adjustedPresetSaturation = 1 + (presetSaturation - 1) * fi;
    const adjustedPresetShadows = 1 + (presetShadows - 1) * fi;
    const adjustedPresetVignette = presetVignette * fi;
    const adjustedPresetHighlights = 1 + (presetHighlights - 1) * fi;
   

    // Combine user parameters with adjusted preset parameters
    const finalBrightness = Math.min(2, userBrightness * adjustedPresetBrightness);
    const finalContrast = userContrast * adjustedPresetContrast;
    const finalSaturation = userSaturation * adjustedPresetSaturation;
    const finalHue = userHue;
    const finalShadows = userShadows * adjustedPresetShadows;
    const finalGrainIntensity = userGrain;
    const finalVignette = userVignette + adjustedPresetVignette;
    const u_sharpness = userSharpness;
    const finalHighlights = userHighlights * adjustedPresetHighlights;

    // Calculate the final color matrix:
    // If the filter has a colorMatrix, combine it with the user matrix.
    const userMatrix: Float32Array = new Float32Array([
        redChannel, 0, 0, 0,
        0, greenChannel, 0, 0,
        0, 0, blueChannel, 0,
        0, 0, 0, 1,
    ]);
    let finalMatrix = userMatrix;
    if (predefinedFilterObj.colorMatrix && fi > 0) {
        // Create identity matrix for blending
        const identityMatrix = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ]);
        // Blend filter matrix with identity matrix based on intensity
        const mixedMatrix = new Float32Array(16);
        for (let i = 0; i < 16; i++) {
            mixedMatrix[i] = identityMatrix[i] + (predefinedFilterObj.colorMatrix[i] - identityMatrix[i]) * fi;
        }
        finalMatrix = multiplyColorMatrices(userMatrix, mixedMatrix);
    }
    const u_colorMatrix = useMemo(() => new Float32Array(finalMatrix), [finalMatrix]);
    const u_bias = useMemo(() => new Float32Array([0, 0, 0, 0]), []);

    // The filter opacity is now always 1.0 since we apply intensity to each preset parameter separately


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
    precision highp float;
    uniform sampler2D u_image;
    uniform sampler2D u_gradient;
    uniform mat4 u_colorMatrix;
    uniform vec4 u_bias;
    uniform float u_brightness;
    uniform float u_contrast;
    uniform float u_saturation;
    uniform float u_hue;
    uniform float u_presetHue;
    uniform float u_intensity;
    uniform float u_vignette;
    uniform float u_shadows;
    uniform float u_grainIntensity;
    uniform float u_sharpness;
    uniform float u_highlights;
    uniform vec4 u_canvasColor;
    uniform vec2 u_resolution;
    uniform int u_hasGradient;
    uniform vec4 u_crop;
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
      vec2 cropOrigin = u_crop.xy;
      vec2 cropSize = u_crop.zw;
      vec2 texSize = u_resolution;
      vec2 cropCoord = (v_texCoord * cropSize + cropOrigin) / texSize;
      vec4 origColor = texture2D(u_image, cropCoord);
      
      // Always apply colorMatrix (userMatrix * presetMatrix)
      vec4 color = u_colorMatrix * origColor + u_bias;
      
      // Then all other filters
      color.rgb = clamp(color.rgb * u_brightness, 0.0, 1.0);
      color.rgb = ((color.rgb - 0.5) * u_contrast) + 0.5;
      float gray = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
      color.rgb = mix(vec3(gray), color.rgb, u_saturation);
      
      // Always apply user hue first
      color.rgb = adjustHueHSL(color.rgb, u_hue);
      
      // If there's a preset hue, mix result with hue-filter by intensity
      if (u_presetHue != 0.0) {
        vec3 hueApplied = adjustHueHSL(color.rgb, u_presetHue);
        color.rgb = mix(color.rgb, hueApplied, u_intensity);
      }
      
      float dist = distance(v_texCoord, vec2(0.5, 0.5));
      float vig = smoothstep(0.3, 0.9, dist);
      color.rgb = mix(color.rgb, color.rgb * (1.0 - vig), u_vignette);
      
      float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float shadowFactor = mix(u_shadows, 1.0, smoothstep(0.0, 0.5, lum));
      float highlightFactor = mix(1.0, u_highlights, smoothstep(0.5, 1.0, lum));
      color.rgb *= shadowFactor * highlightFactor;
      
      float noise = (random(v_texCoord) - 0.5) * (u_grainIntensity / max(u_brightness, 0.1));
      color.rgb = clamp(color.rgb + noise, 0.0, 1.0);
      
      if (u_sharpness > 0.0) {
        vec2 texel = 1.0 / u_resolution;
        vec4 north = texture2D(u_image, v_texCoord + vec2(0.0, texel.y));
        vec4 south = texture2D(u_image, v_texCoord - vec2(0.0, texel.y));
        vec4 east  = texture2D(u_image, v_texCoord + vec2(texel.x, 0.0));
        vec4 west  = texture2D(u_image, v_texCoord - vec2(texel.x, 0.0));
        vec4 sharpened = color * (1.0 + 4.0 * u_sharpness) - (north + south + east + west) * u_sharpness;
        color = clamp(sharpened, 0.0, 1.0);
      }
      
      color.rgb = clamp(color.rgb, 0.0, 1.0);

      // Apply gradient
      if (u_hasGradient == 1) {
        vec4 gradColor = texture2D(u_gradient, v_texCoord);
        // Mix with gradient, using gradient alpha channel
        color.rgb = mix(color.rgb, gradColor.rgb, gradColor.a);
      }
     
      // Apply canvas color
      color.rgb = mix(color.rgb, u_canvasColor.rgb, u_canvasColor.a);
      
      gl_FragColor = color;
    }
  `;
   const prepareGradient = () => {
    setGradReady(false);
    if (!gradient) {
        setGradCanvas(null);
        setGradReady(true);
        return;
    }

    // Wait for image loading for dimensions
    if (!imageRef.current || !imageRef.current.naturalWidth) {
      
        setGradCanvas(null);
        setGradReady(true);

        return;
    }
    const width = imageRef.current.naturalWidth;
    const height = imageRef.current.naturalHeight;
    // Check if gradCanvas already exists
   
    if (
        gradCanvas &&
        prevGradientRef.current === gradient &&
        prevWidthRef.current === width &&
        prevHeightRef.current === height
    ) {
        setGradReady(true);
        return;
    }
    prevGradientRef.current = gradient;
    prevWidthRef.current = width;
    prevHeightRef.current = height;
    
    // Create gradient programmatically instead of html2canvas
    const newGradCanvas = createGradientCanvas(width, height, gradient);
        setGradCanvas(newGradCanvas);
        setGradReady(true);

}



    useEffect(() => {
      
        if (gradient) {  
            prepareGradient();
        } else {
            setGradCanvas(null);
            setGradReady(true);
        }
    }, [gradient, imageUrl, debouncedGradient]);



        useEffect(() => {
            setGradCanvas(null);
            setGradReady(false);
        
            if (!imageUrl) return;
        
            const img = imageRef.current;
            img.crossOrigin = "anonymous";
            img.src = imageUrl;
        
            const onLoad = () => {
        
            if (gradient) {
                prepareGradient();
            } else {
                setGradCanvas(null);
                setGradReady(true);
            }
            };
        
            if (img.complete && img.naturalWidth > 0) {
            onLoad();
            } else {
            img.onload = onLoad;
            }
        
            return () => {
            img.onload = null;
            };
        }, []);

    useEffect(() => {
        clearGradientCache();
    }, [imageUrl]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }
        let gradTexture: WebGLTexture | null = null;
        let imageTexture: WebGLTexture | null = null;
        let width = 0;
        let height = 0;
        function setCanvasSizes(img: HTMLImageElement) {
            if (!canvas) return;
            width = img.naturalWidth;
            height = img.naturalHeight;
            canvas.width = crop?.width ?? width;
            canvas.height = crop?.height ?? height;
        }
        async function renderWebGL() {
            if (!gl || !canvas) return;
            imageRef.current.crossOrigin = "anonymous";
            imageRef.current.src = imageUrl;
            imageRef.current.onload = async () => {
                setCanvasSizes(imageRef.current);
             
                let hasGradient = !!gradient && gradCanvas;
              
                // --- WebGL pipeline ---
                const createShader = (type: number, source: string) => {
                console.log('createShader');
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
                // --- Image texture ---
                imageTexture = gl.createTexture();
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, imageTexture);
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    imageRef.current
                );
                // --- Gradient texture ---
                if (hasGradient && gradCanvas) {
                    
                    gradTexture = gl.createTexture();
                    gl.activeTexture(gl.TEXTURE1);
                    gl.bindTexture(gl.TEXTURE_2D, gradTexture);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                    gl.texImage2D(
                        gl.TEXTURE_2D,
                        0,
                        gl.RGBA,
                        gl.RGBA,
                        gl.UNSIGNED_BYTE,
                        gradCanvas
                    );
                   
                } else {
                    console.log('❌ Gradient texture not created:', {
                        hasGradient,
                        gradCanvas: !!gradCanvas
                    });
                }
                // Set uniforms
                const u_colorMatrixLoc = gl.getUniformLocation(program, "u_colorMatrix");
                const u_biasLoc = gl.getUniformLocation(program, "u_bias");
                const u_brightnessLoc = gl.getUniformLocation(program, "u_brightness");
                const u_contrastLoc = gl.getUniformLocation(program, "u_contrast");
                const u_saturationLoc = gl.getUniformLocation(program, "u_saturation");
                const u_hueLoc = gl.getUniformLocation(program, "u_hue");
                const u_presetHueLoc = gl.getUniformLocation(program, "u_presetHue");
                const u_vignetteLoc = gl.getUniformLocation(program, "u_vignette");
                const u_shadowsLoc = gl.getUniformLocation(program, "u_shadows");
                const u_grainIntensityLoc = gl.getUniformLocation(program, "u_grainIntensity");
                const u_sharpnessLoc = gl.getUniformLocation(program, "u_sharpness");
                const u_intensityLoc = gl.getUniformLocation(program, "u_intensity");
                const u_highlightsLoc = gl.getUniformLocation(program, "u_highlights");
                const u_canvasColorLoc = gl.getUniformLocation(program, "u_canvasColor");
                const u_hasGradientLoc = gl.getUniformLocation(program, "u_hasGradient");
                const u_cropLoc = gl.getUniformLocation(program, "u_crop");
                gl.uniformMatrix4fv(u_colorMatrixLoc, false, u_colorMatrix);
                gl.uniform4fv(u_biasLoc, u_bias);
                gl.uniform1f(u_brightnessLoc, finalBrightness);
                gl.uniform1f(u_contrastLoc, finalContrast);
                gl.uniform1f(u_saturationLoc, finalSaturation);
                gl.uniform1f(u_hueLoc, finalHue);
                gl.uniform1f(u_presetHueLoc, presetHue / 360);
                gl.uniform1f(u_vignetteLoc, finalVignette);
                gl.uniform1f(u_shadowsLoc, finalShadows);
                gl.uniform1f(u_grainIntensityLoc, finalGrainIntensity);
                gl.uniform1f(u_sharpnessLoc, u_sharpness);
                gl.uniform1f(u_intensityLoc, fi);
                gl.uniform1f(u_highlightsLoc, finalHighlights);
                gl.uniform4f(
                  u_canvasColorLoc,
                  (canvasColor?.r ?? 0) / 255,
                  (canvasColor?.g ?? 0) / 255,
                  (canvasColor?.b ?? 0) / 255,
                  (canvasColor?.a ?? 0) / 100
                );
                gl.uniform1i(u_hasGradientLoc, hasGradient ? 1 : 0);
                gl.uniform4f(
                  u_cropLoc,
                  crop?.x ?? 0,
                  crop?.y ?? 0,
                  crop?.width ?? width,
                  crop?.height ?? height
                );
                const u_resolutionLoc = gl.getUniformLocation(program, "u_resolution");
                gl.uniform2f(u_resolutionLoc, width, height);
             
                
                // Bind textures to samplers
                const u_imageLoc = gl.getUniformLocation(program, "u_image");
                gl.uniform1i(u_imageLoc, 0); // TEXTURE0
                if (hasGradient && gradTexture) {
                    const u_gradientLoc = gl.getUniformLocation(program, "u_gradient");
                    gl.uniform1i(u_gradientLoc, 1); // TEXTURE1
                }
                gl.viewport(0, 0, width, height);
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            };
        }
        // If gradient exists, wait for its readiness
        if (gradient && !gradReady) {
        
            return;
        }
 
        renderWebGL();
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
        finalShadows,
        finalGrainIntensity,
        finalVignette,
        u_sharpness,
        filterIntensity,
        filter,
        finalHighlights,
        canvasColor,
        gradient,
        gradCanvas,
        gradReady,
        crop,
    ]);



    

    // Save the image if a saveImage function is provided
    useEffect(() => {
      console.log('saveImage',saveImage);
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

            const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
          
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
                  //  const imUrl = URL.createObjectURL(file);
                  //  setSavedImage(imUrl);
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
        debouncedFilterIntensity,
        debouncedHighlights,  
        debouncedCanvasColor,
        debouncedGradient,
     
    ]);


    const previewFilters = `brightness(${finalBrightness*100}%) 
    contrast(${finalContrast*100}%) 
    saturate(${finalSaturation*100}%)
     hue-rotate(${finalHue*360}deg)`;
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
        // <div style={{ position: 'absolute', width: '100%', height: '100%',overflow: 'hidden', ...styles }}>
            <canvas
                ref={canvasRef}
                style={preview ? { display: 'none' } : { width: '100%', height: '100%',position: 'relative',
                  objectFit: 'cover',
                  top: 0, left: 0, right: 0, bottom: 0 }}
            />
            


            
        // </div>
    );
};

function isCanvasColorEqual(a?: {r:number,g:number,b:number,a:number}, b?: {r:number,g:number,b:number,a:number}) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
}

function isCropEqual(a?: CropRect, b?: CropRect) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

const areEqual = (prev: FilterProps, next: FilterProps) => {
  return (
    prev.imageUrl === next.imageUrl &&
    prev.filter === next.filter &&
    prev.redChannel === next.redChannel &&
    prev.greenChannel === next.greenChannel &&
    prev.blueChannel === next.blueChannel &&
    prev.brightness === next.brightness &&
    prev.contrast === next.contrast &&
    prev.saturation === next.saturation &&
    prev.hueRotate === next.hueRotate &&
    prev.vignette === next.vignette &&
    prev.shadows === next.shadows &&
    prev.grain === next.grain &&
    prev.filterIntensity === next.filterIntensity &&
    prev.sharpness === next.sharpness &&
    prev.preview === next.preview &&
    prev.highlights === next.highlights &&
    isCanvasColorEqual(prev.canvasColor, next.canvasColor) &&
    prev.gradient === next.gradient &&
    isCropEqual(prev.crop, next.crop)
  );
};

const MemoWebGLImageFilter = React.memo(WebGLImageFilter, areEqual);

export default MemoWebGLImageFilter;
