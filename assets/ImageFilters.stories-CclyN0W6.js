import{r as b,R as I}from"./index-BYb6XiQz.js";const Y={grayscale:{saturate:0},sepia:{sepia:1},brightness:{brightness:1.5},contrast:{contrast:2},saturate:{saturate:2},hue:{hueRotate:90},vintage:{sepia:.5,contrast:1.2,brightness:.9},cool:{hueRotate:270,saturate:1.5},fancyEffect:{brightness:1.2,contrast:1.1,colorMatrix:new Float32Array([1.2,0,0,0,0,1,.5,0,0,0,1.5,0,0,0,0,1])},deep:{colorMatrix:new Float32Array([1.5,0,0,0,0,1.2,0,0,0,0,2,0,0,0,0,1])},cozySnow:{brightness:.99,contrast:1.03,saturate:.91,hueRotate:381,colorMatrix:new Float32Array([.6,0,0,0,0,.8,0,0,0,0,.8,0,0,0,0,1])},retro:{saturate:1.5,contrast:.85},pastel:{saturate:1.2,brightness:1.1,hueRotate:-20},mutedSepia:{sepia:.4,brightness:.9,contrast:1.05},moody:{brightness:.8,contrast:.9,saturate:.5},goldenHour:{sepia:.2,brightness:1.2,contrast:1.1,hueRotate:25},oceanBreeze:{saturate:1.4,hueRotate:-50,brightness:1.1},cinematic:{contrast:1.2,brightness:.9,sepia:.1},noir:{saturate:0,contrast:1.2,brightness:.8},sunKissed:{brightness:1.15,contrast:1.05,hueRotate:15},nightVibes:{brightness:.7,contrast:1.3,saturate:.9,hueRotate:-10},vintageFilm:{sepia:.6,contrast:.9,brightness:.85,saturate:.8},deepBlue:{colorMatrix:new Float32Array([.5,0,0,0,0,.7,0,0,0,0,1.2,0,0,0,0,1])},goldenTint:{colorMatrix:new Float32Array([1,.2,0,0,.1,.9,0,0,0,.2,.8,0,0,0,0,1])},lavenderHaze:{colorMatrix:new Float32Array([.7,.1,.3,0,.2,.6,.3,0,.2,.1,.7,0,0,0,0,1])},emeraldGlow:{colorMatrix:new Float32Array([.6,0,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},roseTint:{colorMatrix:new Float32Array([1.2,.1,.2,0,.2,.8,.2,0,.1,.2,.9,0,0,0,0,1])},arcticInversion:{colorMatrix:new Float32Array([1,0,0,0,0,.8,0,0,0,0,-1.8,0,0,0,0,1])},crimsonGlow:{colorMatrix:new Float32Array([1.3,0,0,0,0,.8,0,0,0,0,1,0,0,0,0,1])},rusticSunset:{brightness:.94,contrast:.93,saturate:.8,hueRotate:1,colorMatrix:new Float32Array([1.2,0,0,0,0,.7,0,0,0,0,.6,0,0,0,0,1])},sunsetDream:{colorMatrix:new Float32Array([1.2,.1,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},blueLagoon:{colorMatrix:new Float32Array([.8,0,.1,0,0,.9,0,0,0,0,1.5,0,0,0,0,1])},amberGlow:{colorMatrix:new Float32Array([1.2,0,0,0,0,1.1,0,0,0,0,.6,0,0,0,0,1])}};function o(n,s){const[f,c]=b.useState(n);return b.useEffect(()=>{const u=setTimeout(()=>{c(n)},s);return()=>{clearTimeout(u)}},[n,s]),f}function Se(n,s){const f=new Float32Array(16);for(let c=0;c<4;c++)for(let u=0;u<4;u++){let h=0;for(let d=0;d<4;d++)h+=n[c*4+d]*s[d*4+u];f[c*4+u]=h}return f}const M=({imageUrl:n,filter:s,redChannel:f=1,greenChannel:c=1,blueChannel:u=1,brightness:h=100,contrast:d=100,saturation:w=100,hueRotate:R=0,vignette:E=0,shadows:D=100,grain:F=0,intensity:L=100,sharpness:S=0,saveImage:P,styles:Q})=>{const q=b.useRef(null),_=b.useRef(new Image),J=o(h,300),Z=o(d,300),$=o(w,300),ee=o(R,300),te=o(f,300),re=o(c,300),oe=o(u,300),ae=o(D,300),ne=o(E??0,300),se=o(F??0,300),ie=o(S??0,300),ce=o(L??100,300),y=s&&Y[s]?Y[s]:{},B=(y.brightness??1)*(h/100),G=(y.contrast??1)*(d/100),V=(y.saturate??1)*(w/100),H=((y.hueRotate??0)+R)*Math.PI/180,N=E/100,ue=D/100,le=F/100,de=S/100,W=new Float32Array([f,0,0,0,0,c,0,0,0,0,u,0,0,0,0,1]);let X=W;y.colorMatrix&&(X=Se(y.colorMatrix,W));const O=new Float32Array(X),z=new Float32Array([0,0,0,0]),fe=(L??100)/100,me=`
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
  `,ge=`
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
    vec3 adjustHue(vec3 color, float hue) {
      vec3 yiq = rgb2yiq(color);
      float cosHue = cos(hue);
      float sinHue = sin(hue);
      float i = yiq.y * cosHue - yiq.z * sinHue;
      float q = yiq.y * sinHue + yiq.z * cosHue;
      return yiq2rgb(vec3(yiq.x, i, q));
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
      color.rgb = adjustHue(color.rgb, u_hue);
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
  `;return b.useEffect(()=>{const r=q.current;if(!r)return;const e=r.getContext("webgl");if(!e){console.error("WebGL not supported");return}const a=(Fe,Le)=>{const p=e.createShader(Fe);return p?(e.shaderSource(p,Le),e.compileShader(p),e.getShaderParameter(p,e.COMPILE_STATUS)?p:(console.error("Shader compile error:",e.getShaderInfoLog(p)),e.deleteShader(p),null)):null},i=a(e.VERTEX_SHADER,me),v=a(e.FRAGMENT_SHADER,ge);if(!i||!v)return;const t=e.createProgram();if(!t)return;if(e.attachShader(t,i),e.attachShader(t,v),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(t));return}e.useProgram(t);const m=e.getAttribLocation(t,"a_position"),x=e.getAttribLocation(t,"a_texCoord"),C=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,C);const l=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW),e.enableVertexAttribArray(m),e.vertexAttribPointer(m,2,e.FLOAT,!1,0,0);const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A);const U=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);e.bufferData(e.ARRAY_BUFFER,U,e.STATIC_DRAW),e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0);const g=e.createTexture();e.bindTexture(e.TEXTURE_2D,g),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const pe=e.getUniformLocation(t,"u_colorMatrix"),he=e.getUniformLocation(t,"u_bias");e.uniformMatrix4fv(pe,!1,O),e.uniform4fv(he,z);const _e=e.getUniformLocation(t,"u_brightness"),ye=e.getUniformLocation(t,"u_contrast"),be=e.getUniformLocation(t,"u_saturation"),ve=e.getUniformLocation(t,"u_hue"),xe=e.getUniformLocation(t,"u_vignette"),Ae=e.getUniformLocation(t,"u_shadows"),Te=e.getUniformLocation(t,"u_grainIntensity"),we=e.getUniformLocation(t,"u_sharpness"),Re=e.getUniformLocation(t,"u_intensity");e.uniform1f(_e,B),e.uniform1f(ye,G),e.uniform1f(be,V),e.uniform1f(ve,H),e.uniform1f(xe,N),e.uniform1f(Ae,ue),e.uniform1f(Te,le),e.uniform1f(we,de),e.uniform1f(Re,fe);const Ee=e.getUniformLocation(t,"u_resolution");_.current.crossOrigin="anonymous",_.current.src=n,_.current.onload=()=>{r.width=_.current.naturalWidth,r.height=_.current.naturalHeight,e.viewport(0,0,r.width,r.height),e.uniform2f(Ee,r.width,r.height),e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,_.current),e.drawArrays(e.TRIANGLES,0,6)}},[n,h,d,w,R,E,O,z,B,G,V,H,N,F,S,L,s]),b.useEffect(()=>{const r=q.current;!r||!P||requestAnimationFrame(()=>{const e=r.getContext("webgl");if(!e)return;const a=r.width,i=r.height,v=new Uint8Array(a*i*4);e.readPixels(0,0,a,i,e.RGBA,e.UNSIGNED_BYTE,v);const t=new Uint8Array(a*i*4);for(let l=0;l<i;l++){const A=l*a*4,U=(i-l-1)*a*4;for(let g=0;g<a*4;g++)t[U+g]=v[A+g]}const m=document.createElement("canvas");m.width=a,m.height=i;const x=m.getContext("2d");if(!x)return;const C=new ImageData(new Uint8ClampedArray(t),a,i);x.putImageData(C,0,0),m.toBlob(l=>{if(l){console.log("📸 Image saved!");const A=new File([l],"filtered-image.png",{type:"image/png"});P(A)}},"image/png")})},[s,J,Z,$,ee,te,re,oe,ae,ne,se,ie,ce]),I.createElement("div",{style:{position:"relative",width:"100%",height:"100%",...Q}},I.createElement("canvas",{ref:q,style:{width:"100%",height:"100%"}}))};M.__docgenInfo={description:"",methods:[],displayName:"WebGLImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},vignette:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},shadows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},grain:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sharpness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""}}};const Ue={title:"ImageFilters",component:M,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},qe=n=>I.createElement(M,{...n}),T=qe.bind({});T.args={saveImage:()=>{},imageUrl:"https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"};var j,k,K;T.parameters={...T.parameters,docs:{...(j=T.parameters)==null?void 0:j.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(K=(k=T.parameters)==null?void 0:k.docs)==null?void 0:K.source}}};const Ie=["Default"];export{T as Default,Ie as __namedExportsOrder,Ue as default};
