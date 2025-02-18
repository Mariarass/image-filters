import{r as h,R}from"./index-BYb6XiQz.js";const Y={grayscale:{saturate:0},sepia:{sepia:1},brightness:{brightness:1.5},contrast:{contrast:2},saturate:{saturate:2},hue:{hueRotate:90},vintage:{sepia:.5,contrast:1.2,brightness:.9},cool:{hueRotate:270,saturate:1.5},fancyEffect:{brightness:1.2,contrast:1.1,colorMatrix:new Float32Array([1.2,0,0,0,0,1,.5,0,0,0,1.5,0,0,0,0,1])},deep:{colorMatrix:new Float32Array([1.5,0,0,0,0,1.2,0,0,0,0,2,0,0,0,0,1])},cozySnow:{brightness:.99,contrast:1.03,saturate:.91,hueRotate:381,colorMatrix:new Float32Array([.6,0,0,0,0,.8,0,0,0,0,.8,0,0,0,0,1])},retro:{saturate:1.5,contrast:.85},pastel:{saturate:1.2,brightness:1.1,hueRotate:-20},mutedSepia:{sepia:.4,brightness:.9,contrast:1.05},moody:{brightness:.8,contrast:.9,saturate:.5},goldenHour:{sepia:.2,brightness:1.2,contrast:1.1,hueRotate:25},oceanBreeze:{saturate:1.4,hueRotate:-50,brightness:1.1},cinematic:{contrast:1.2,brightness:.9,sepia:.1},noir:{saturate:0,contrast:1.2,brightness:.8},sunKissed:{brightness:1.15,contrast:1.05,hueRotate:15},nightVibes:{brightness:.7,contrast:1.3,saturate:.9,hueRotate:-10},vintageFilm:{sepia:.6,contrast:.9,brightness:.85,saturate:.8},deepBlue:{colorMatrix:new Float32Array([.5,0,0,0,0,.7,0,0,0,0,1.2,0,0,0,0,1])},goldenTint:{colorMatrix:new Float32Array([1,.2,0,0,.1,.9,0,0,0,.2,.8,0,0,0,0,1])},lavenderHaze:{colorMatrix:new Float32Array([.7,.1,.3,0,.2,.6,.3,0,.2,.1,.7,0,0,0,0,1])},emeraldGlow:{colorMatrix:new Float32Array([.6,0,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},roseTint:{colorMatrix:new Float32Array([1.2,.1,.2,0,.2,.8,.2,0,.1,.2,.9,0,0,0,0,1])},arcticInversion:{colorMatrix:new Float32Array([1,0,0,0,0,.8,0,0,0,0,-1.8,0,0,0,0,1])},crimsonGlow:{colorMatrix:new Float32Array([1.3,0,0,0,0,.8,0,0,0,0,1,0,0,0,0,1])},rusticSunset:{brightness:.94,contrast:.93,saturate:.8,hueRotate:1,colorMatrix:new Float32Array([1.2,0,0,0,0,.7,0,0,0,0,.6,0,0,0,0,1])},sunsetDream:{colorMatrix:new Float32Array([1.2,.1,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},blueLagoon:{colorMatrix:new Float32Array([.8,0,.1,0,0,.9,0,0,0,0,1.5,0,0,0,0,1])},amberGlow:{colorMatrix:new Float32Array([1.2,0,0,0,0,1.1,0,0,0,0,.6,0,0,0,0,1])}};function o(n,s){const[f,c]=h.useState(n);return h.useEffect(()=>{const u=setTimeout(()=>{c(n)},s);return()=>{clearTimeout(u)}},[n,s]),f}function Ce(n,s){const f=new Float32Array(16);for(let c=0;c<4;c++)for(let u=0;u<4;u++){let _=0;for(let d=0;d<4;d++)_+=n[c*4+d]*s[d*4+u];f[c*4+u]=_}return f}const M=({imageUrl:n,filter:s,redChannel:f=1,greenChannel:c=1,blueChannel:u=1,brightness:_=100,contrast:d=100,saturation:E=100,hueRotate:F=0,vignette:L=0,shadows:P=100,grain:S=0,intensity:q=100,sharpness:C=0,saveImage:U,styles:J})=>{const I=h.useRef(null),y=h.useRef(new Image),[Q,Z]=h.useState(null),$=o(_,300),ee=o(d,300),te=o(E,300),re=o(F,300),oe=o(f,300),ae=o(c,300),ne=o(u,300),ie=o(P,300),se=o(L??0,300),ce=o(S??0,300),ue=o(C??0,300),le=o(q??100,300),v=s&&Y[s]?Y[s]:{},B=(v.brightness??1)*(_/100),V=(v.contrast??1)*(d/100),G=(v.saturate??1)*(E/100),H=((v.hueRotate??0)+F)*Math.PI/180,N=L/100,de=P/100,fe=S/100,me=C/100,X=new Float32Array([f,0,0,0,0,c,0,0,0,0,u,0,0,0,0,1]);let z=X;v.colorMatrix&&(z=Ce(v.colorMatrix,X));const O=new Float32Array(z),W=new Float32Array([0,0,0,0]),ge=(q??100)/100,pe=`
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
  `,he=`
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
  `;return h.useEffect(()=>{const r=I.current;if(!r)return;const e=r.getContext("webgl");if(!e){console.error("WebGL not supported");return}const a=(Se,qe)=>{const p=e.createShader(Se);return p?(e.shaderSource(p,qe),e.compileShader(p),e.getShaderParameter(p,e.COMPILE_STATUS)?p:(console.error("Shader compile error:",e.getShaderInfoLog(p)),e.deleteShader(p),null)):null},i=a(e.VERTEX_SHADER,pe),x=a(e.FRAGMENT_SHADER,he);if(!i||!x)return;const t=e.createProgram();if(!t)return;if(e.attachShader(t,i),e.attachShader(t,x),e.linkProgram(t),!e.getProgramParameter(t,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(t));return}e.useProgram(t);const m=e.getAttribLocation(t,"a_position"),A=e.getAttribLocation(t,"a_texCoord"),D=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,D);const l=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,l,e.STATIC_DRAW),e.enableVertexAttribArray(m),e.vertexAttribPointer(m,2,e.FLOAT,!1,0,0);const b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b);const w=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);e.bufferData(e.ARRAY_BUFFER,w,e.STATIC_DRAW),e.enableVertexAttribArray(A),e.vertexAttribPointer(A,2,e.FLOAT,!1,0,0);const g=e.createTexture();e.bindTexture(e.TEXTURE_2D,g),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const _e=e.getUniformLocation(t,"u_colorMatrix"),ye=e.getUniformLocation(t,"u_bias");e.uniformMatrix4fv(_e,!1,O),e.uniform4fv(ye,W);const ve=e.getUniformLocation(t,"u_brightness"),be=e.getUniformLocation(t,"u_contrast"),xe=e.getUniformLocation(t,"u_saturation"),Ae=e.getUniformLocation(t,"u_hue"),we=e.getUniformLocation(t,"u_vignette"),Te=e.getUniformLocation(t,"u_shadows"),Re=e.getUniformLocation(t,"u_grainIntensity"),Ee=e.getUniformLocation(t,"u_sharpness"),Fe=e.getUniformLocation(t,"u_intensity");e.uniform1f(ve,B),e.uniform1f(be,V),e.uniform1f(xe,G),e.uniform1f(Ae,H),e.uniform1f(we,N),e.uniform1f(Te,de),e.uniform1f(Re,fe),e.uniform1f(Ee,me),e.uniform1f(Fe,ge);const Le=e.getUniformLocation(t,"u_resolution");y.current.crossOrigin="anonymous",y.current.src=n,y.current.onload=()=>{r.width=y.current.naturalWidth,r.height=y.current.naturalHeight,e.viewport(0,0,r.width,r.height),e.uniform2f(Le,r.width,r.height),e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,y.current),e.drawArrays(e.TRIANGLES,0,6)}},[n,_,d,E,F,L,O,W,B,V,G,H,N,S,C,q]),h.useEffect(()=>{const r=I.current;!r||!U||requestAnimationFrame(()=>{const e=r.getContext("webgl");if(!e)return;const a=r.width,i=r.height,x=new Uint8Array(a*i*4);e.readPixels(0,0,a,i,e.RGBA,e.UNSIGNED_BYTE,x);const t=new Uint8Array(a*i*4);for(let l=0;l<i;l++){const b=l*a*4,w=(i-l-1)*a*4;for(let g=0;g<a*4;g++)t[w+g]=x[b+g]}const m=document.createElement("canvas");m.width=a,m.height=i;const A=m.getContext("2d");if(!A)return;const D=new ImageData(new Uint8ClampedArray(t),a,i);A.putImageData(D,0,0),m.toBlob(l=>{if(l){console.log("📸 Image saved!");const b=new File([l],"filtered-image.png",{type:"image/png"}),w=URL.createObjectURL(b);Z(w),U(b)}},"image/png")})},[s,$,ee,te,re,oe,ae,ne,ie,se,ce,ue,le]),R.createElement("div",{style:{position:"relative",width:"100%",height:"100%",...J}},R.createElement("canvas",{ref:I,style:{width:"100%",height:"100%"}}),U&&R.createElement("img",{src:Q??void 0,alt:"Saved preview",style:{width:"200px"}}))};M.__docgenInfo={description:"",methods:[],displayName:"WebGLImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},vignette:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},shadows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},grain:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sharpness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""}}};const De={title:"ImageFilters",component:M,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},Ue=n=>R.createElement(M,{...n}),T=Ue.bind({});T.args={saveImage:()=>{},imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var j,k,K;T.parameters={...T.parameters,docs:{...(j=T.parameters)==null?void 0:j.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(K=(k=T.parameters)==null?void 0:k.docs)==null?void 0:K.source}}};const Me=["Default"];export{T as Default,Me as __namedExportsOrder,De as default};
