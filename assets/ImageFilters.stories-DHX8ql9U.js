import{r as _,R as w}from"./index-BYb6XiQz.js";const k={grayscale:{saturate:0},sepia:{sepia:1},brightness:{brightness:1.5},contrast:{contrast:2},saturate:{saturate:2},hue:{hueRotate:90},vintage:{sepia:.5,contrast:1.2,brightness:.9},cool:{hueRotate:270,saturate:1.5},fancyEffect:{brightness:1.2,contrast:1.1,colorMatrix:new Float32Array([1.2,0,0,0,0,1,.5,0,0,0,1.5,0,0,0,0,1])},deep:{colorMatrix:new Float32Array([1.5,0,0,0,0,1.2,0,0,0,0,2,0,0,0,0,1])},cozySnow:{brightness:.99,contrast:1.03,saturate:.91,hueRotate:381,colorMatrix:new Float32Array([.6,0,0,0,0,.8,0,0,0,0,.8,0,0,0,0,1])},retro:{saturate:1.5,contrast:.85},pastel:{saturate:1.2,brightness:1.1,hueRotate:-20},mutedSepia:{sepia:.4,brightness:.9,contrast:1.05},moody:{brightness:.8,contrast:.9,saturate:.5},goldenHour:{sepia:.2,brightness:1.2,contrast:1.1,hueRotate:25},oceanBreeze:{saturate:1.4,hueRotate:-50,brightness:1.1},cinematic:{contrast:1.2,brightness:.9,sepia:.1},noir:{saturate:0,contrast:1.2,brightness:.8},sunKissed:{brightness:1.15,contrast:1.05,hueRotate:15},nightVibes:{brightness:.7,contrast:1.3,saturate:.9,hueRotate:-10},vintageFilm:{sepia:.6,contrast:.9,brightness:.85,saturate:.8},deepBlue:{colorMatrix:new Float32Array([.5,0,0,0,0,.7,0,0,0,0,1.2,0,0,0,0,1])},goldenTint:{colorMatrix:new Float32Array([1,.2,0,0,.1,.9,0,0,0,.2,.8,0,0,0,0,1])},lavenderHaze:{colorMatrix:new Float32Array([.7,.1,.3,0,.2,.6,.3,0,.2,.1,.7,0,0,0,0,1])},emeraldGlow:{colorMatrix:new Float32Array([.6,0,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},roseTint:{colorMatrix:new Float32Array([1.2,.1,.2,0,.2,.8,.2,0,.1,.2,.9,0,0,0,0,1])},arcticInversion:{colorMatrix:new Float32Array([1,0,0,0,0,.8,0,0,0,0,-1.8,0,0,0,0,1])},crimsonGlow:{colorMatrix:new Float32Array([1.3,0,0,0,0,.8,0,0,0,0,1,0,0,0,0,1])},rusticSunset:{brightness:.94,contrast:.93,saturate:.8,hueRotate:1,colorMatrix:new Float32Array([1.2,0,0,0,0,.7,0,0,0,0,.6,0,0,0,0,1])},sunsetDream:{colorMatrix:new Float32Array([1.2,.1,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},blueLagoon:{colorMatrix:new Float32Array([.8,0,.1,0,0,.9,0,0,0,0,1.5,0,0,0,0,1])},amberGlow:{colorMatrix:new Float32Array([1.2,0,0,0,0,1.1,0,0,0,0,.6,0,0,0,0,1])}};function o(n,s){const[m,c]=_.useState(n);return _.useEffect(()=>{const u=setTimeout(()=>{c(n)},s);return()=>{clearTimeout(u)}},[n,s]),m}function Ue(n,s){const m=new Float32Array(16);for(let c=0;c<4;c++)for(let u=0;u<4;u++){let y=0;for(let f=0;f<4;f++)y+=n[c*4+f]*s[f*4+u];m[c*4+u]=y}return m}const D=({imageUrl:n,filter:s,redChannel:m=1,greenChannel:c=1,blueChannel:u=1,brightness:y=100,contrast:f=100,saturation:E=100,hueRotate:F=0,vignette:L=0,shadows:P=100,grain:S=0,intensity:q=100,sharpness:C=0,saveImage:B,styles:Z,preview:G})=>{const U=_.useRef(null),l=_.useRef(new Image),[I,$]=_.useState(null),ee=o(y,300),te=o(f,300),re=o(E,300),oe=o(F,300),ae=o(m,300),ne=o(c,300),se=o(u,300),ie=o(P,300),ce=o(L??0,300),ue=o(S??0,300),le=o(C??0,300),de=o(q??100,300),b=s&&k[s]?k[s]:{},V=(b.brightness??1)*(y/100),H=(b.contrast??1)*(f/100),N=(b.saturate??1)*(E/100),W=((b.hueRotate??0)+F)*Math.PI/180,X=L/100,fe=P/100,me=S/100,ge=C/100,O=new Float32Array([m,0,0,0,0,c,0,0,0,0,u,0,0,0,0,1]);let z=O;b.colorMatrix&&(z=Ue(b.colorMatrix,O));const Y=new Float32Array(z),j=new Float32Array([0,0,0,0]),pe=(q??100)/100,he=`
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
  `,_e=`
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
  `;return _.useEffect(()=>{const r=U.current;if(console.log("filter"),!r)return;const e=r.getContext("webgl");if(!e){console.error("WebGL not supported");return}const a=(qe,Ce)=>{const h=e.createShader(qe);return h?(e.shaderSource(h,Ce),e.compileShader(h),e.getShaderParameter(h,e.COMPILE_STATUS)?h:(console.error("Shader compile error:",e.getShaderInfoLog(h)),e.deleteShader(h),null)):null},i=a(e.VERTEX_SHADER,he),x=a(e.FRAGMENT_SHADER,_e);if(!i||!x)return;const t=e.createProgram();if(!t)return;if(e.attachShader(t,i),e.attachShader(t,x),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(t));return}e.useProgram(t);const g=e.getAttribLocation(t,"a_position"),T=e.getAttribLocation(t,"a_texCoord"),M=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,M);const d=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,d,e.STATIC_DRAW),e.enableVertexAttribArray(g),e.vertexAttribPointer(g,2,e.FLOAT,!1,0,0);const v=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,v);const A=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);e.bufferData(e.ARRAY_BUFFER,A,e.STATIC_DRAW),e.enableVertexAttribArray(T),e.vertexAttribPointer(T,2,e.FLOAT,!1,0,0);const p=e.createTexture();e.bindTexture(e.TEXTURE_2D,p),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const ye=e.getUniformLocation(t,"u_colorMatrix"),be=e.getUniformLocation(t,"u_bias");e.uniformMatrix4fv(ye,!1,Y),e.uniform4fv(be,j);const ve=e.getUniformLocation(t,"u_brightness"),xe=e.getUniformLocation(t,"u_contrast"),Te=e.getUniformLocation(t,"u_saturation"),Ae=e.getUniformLocation(t,"u_hue"),we=e.getUniformLocation(t,"u_vignette"),Re=e.getUniformLocation(t,"u_shadows"),Ee=e.getUniformLocation(t,"u_grainIntensity"),Fe=e.getUniformLocation(t,"u_sharpness"),Le=e.getUniformLocation(t,"u_intensity");e.uniform1f(ve,V),e.uniform1f(xe,H),e.uniform1f(Te,N),e.uniform1f(Ae,W),e.uniform1f(we,X),e.uniform1f(Re,fe),e.uniform1f(Ee,me),e.uniform1f(Fe,ge),e.uniform1f(Le,pe);const Se=e.getUniformLocation(t,"u_resolution");l.current.crossOrigin="anonymous",l.current.src=n,l.current.onload=()=>{r.width=l.current.naturalWidth,r.height=l.current.naturalHeight,e.viewport(0,0,r.width,r.height),e.uniform2f(Se,r.width,r.height),e.bindTexture(e.TEXTURE_2D,p),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,l.current),e.drawArrays(e.TRIANGLES,0,6)}},[n,y,f,E,F,L,Y,j,V,H,N,W,X,S,C,q,s]),_.useEffect(()=>{const r=U.current;!r||!B||setTimeout(()=>{if(!l.current.complete||l.current.naturalWidth===0||l.current.naturalHeight===0){console.error(" 'Not Found'.");return}const e=r.getContext("webgl");if(!e)return;const a=r.width,i=r.height,x=new Uint8Array(a*i*4);e.readPixels(0,0,a,i,e.RGBA,e.UNSIGNED_BYTE,x);const t=new Uint8Array(a*i*4);for(let d=0;d<i;d++){const v=d*a*4,A=(i-d-1)*a*4;for(let p=0;p<a*4;p++)t[A+p]=x[v+p]}const g=document.createElement("canvas");g.width=a,g.height=i;const T=g.getContext("2d");if(!T)return;const M=new ImageData(new Uint8ClampedArray(t),a,i);T.putImageData(M,0,0),g.toBlob(d=>{if(d){console.log("📸 Image saved!");const v=new File([d],"filtered-image.png",{type:"image/png"}),A=URL.createObjectURL(v);$(A),B(v)}},"image/png")},100)},[s,ee,te,re,oe,ae,ne,se,ie,ce,ue,le,de]),console.log(I),w.createElement("div",{style:{position:"relative",width:"100%",height:"100%",...Z}},w.createElement("canvas",{ref:U,style:G?{display:"none"}:{width:"100%",height:"100%"}}),G&&(I?w.createElement("img",{src:I,alt:"Saved preview",style:{width:"100%",height:"100%"}}):w.createElement("div",null,"Загрузка превью...")))};D.__docgenInfo={description:"",methods:[],displayName:"WebGLImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},vignette:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},shadows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},grain:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sharpness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const De={title:"ImageFilters",component:D,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},Ie=n=>w.createElement(D,{...n}),R=Ie.bind({});R.args={saveImage:()=>{},imageUrl:"https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"};var K,Q,J;R.parameters={...R.parameters,docs:{...(K=R.parameters)==null?void 0:K.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(J=(Q=R.parameters)==null?void 0:Q.docs)==null?void 0:J.source}}};const Pe=["Default"];export{R as Default,Pe as __namedExportsOrder,De as default};
