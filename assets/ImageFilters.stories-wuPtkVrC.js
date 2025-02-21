import{r as v,R as h}from"./index-BYb6XiQz.js";const J={grayscale:{saturate:0},brightness:{brightness:1.5},contrast:{contrast:2},saturate:{saturate:2},hue:{hueRotate:90},vintage:{sepia:.5,contrast:1.2,brightness:.9},cool:{hueRotate:270,saturate:1.5},fancyEffect:{brightness:1.2,contrast:1.1,colorMatrix:new Float32Array([1.2,0,0,0,0,1,.5,0,0,0,1.5,0,0,0,0,1])},deep:{colorMatrix:new Float32Array([1.5,0,0,0,0,1.2,0,0,0,0,2,0,0,0,0,1])},cozySnow:{brightness:.99,contrast:1.03,saturate:.91,hueRotate:334,colorMatrix:new Float32Array([.6,0,0,0,0,.8,0,0,0,0,.8,0,0,0,0,1])},retro:{saturate:1.5,contrast:.85},pastel:{saturate:1.2,brightness:1.1,hueRotate:-20},mutedSepia:{brightness:.9,contrast:1.05},moody:{brightness:.8,contrast:.9,saturate:.5},goldenHour:{brightness:1.2,contrast:1.1,hueRotate:25},oceanBreeze:{saturate:1.4,hueRotate:-50,brightness:1.1},cinematic:{contrast:1.2,brightness:.9,sepia:.1},noir:{saturate:0,contrast:1.2,brightness:.8},sunKissed:{brightness:1.15,contrast:1.05,hueRotate:15},nightVibes:{brightness:.7,contrast:1.3,saturate:.9,hueRotate:-10},vintageFilm:{contrast:.9,brightness:.85,saturate:.8},deepBlue:{colorMatrix:new Float32Array([.5,0,0,0,0,.7,0,0,0,0,1.2,0,0,0,0,1])},goldenTint:{colorMatrix:new Float32Array([1,.2,0,0,.1,.9,0,0,0,.2,.8,0,0,0,0,1])},lavenderHaze:{colorMatrix:new Float32Array([.7,.1,.3,0,.2,.6,.3,0,.2,.1,.7,0,0,0,0,1])},emeraldGlow:{colorMatrix:new Float32Array([.6,0,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},roseTint:{colorMatrix:new Float32Array([1.2,.1,.2,0,.2,.8,.2,0,.1,.2,.9,0,0,0,0,1])},arcticInversion:{colorMatrix:new Float32Array([1,0,0,0,0,.8,0,0,0,0,-1.8,0,0,0,0,1])},crimsonGlow:{colorMatrix:new Float32Array([1.3,0,0,0,0,.8,0,0,0,0,1,0,0,0,0,1])},rusticSunset:{brightness:.94,contrast:.93,saturate:.8,hueRotate:1,colorMatrix:new Float32Array([1.2,0,0,0,0,.7,0,0,0,0,.6,0,0,0,0,1])},sunsetDream:{colorMatrix:new Float32Array([1.2,.1,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},blueLagoon:{colorMatrix:new Float32Array([.8,0,.1,0,0,.9,0,0,0,0,1.5,0,0,0,0,1])},amberGlow:{colorMatrix:new Float32Array([1.2,0,0,0,0,1.1,0,0,0,0,.6,0,0,0,0,1])}};function l(t,r){const[i,a]=v.useState(t);return v.useEffect(()=>{const c=setTimeout(()=>{a(t)},r);return()=>{clearTimeout(c)}},[t,r]),i}function Pe(t,r){const i=new Float32Array(16);for(let a=0;a<4;a++)for(let c=0;c<4;c++){let _=0;for(let g=0;g<4;g++)_+=t[a*4+g]*r[g*4+c];i[a*4+c]=_}return i}function Ve(t){if(t.length!==16)throw new Error("Ожидается матрица 4x4 (16 элементов)");const r=[];for(let i=0;i<4;i++)r.push(t[i*4]),r.push(t[i*4+1]),r.push(t[i*4+2]),r.push(t[i*4+3]),r.push(0);return r.join(" ")}const n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function Be(t,r=0){return(n[t[r+0]]+n[t[r+1]]+n[t[r+2]]+n[t[r+3]]+"-"+n[t[r+4]]+n[t[r+5]]+"-"+n[t[r+6]]+n[t[r+7]]+"-"+n[t[r+8]]+n[t[r+9]]+"-"+n[t[r+10]]+n[t[r+11]]+n[t[r+12]]+n[t[r+13]]+n[t[r+14]]+n[t[r+15]]).toLowerCase()}let z;const Ge=new Uint8Array(16);function He(){if(!z){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");z=crypto.getRandomValues.bind(crypto)}return z(Ge)}const ze=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Z={randomUUID:ze};function Ne(t,r,i){var c;if(Z.randomUUID&&!r&&!t)return Z.randomUUID();t=t||{};const a=t.random??((c=t.rng)==null?void 0:c.call(t))??He();if(a.length<16)throw new Error("Random bytes length must be >= 16");return a[6]=a[6]&15|64,a[8]=a[8]&63|128,Be(a)}const N=({imageUrl:t,filter:r,redChannel:i=1,greenChannel:a=1,blueChannel:c=1,brightness:_=100,contrast:g=100,saturation:E=100,hueRotate:C=0,vignette:F=0,shadows:W=100,grain:L=0,intensity:S=100,sharpness:U=0,saveImage:X,styles:O,preview:Y})=>{const q=v.useRef(null),m=v.useRef(new Image),I=`filter-${Ne()}`,oe=l(_,300),ne=l(g,300),ae=l(E,300),ie=l(C,300),se=l(i,300),ce=l(a,300),le=l(c,300),ue=l(W,300),de=l(F??0,300),me=l(L??0,300),fe=l(U??0,300),ge=l(S??100,300),x=r&&J[r]?J[r]:{},D=(x.brightness??1)*(_/100),M=(x.contrast??1)*(g/100),P=(x.saturate??1)*(E/100),V=((x.hueRotate??0)+C)/360,$=F/100,he=W/100,pe=L/100,be=U/100,j=new Float32Array([i,0,0,0,0,a,0,0,0,0,c,0,0,0,0,1]);let B=j;x.colorMatrix&&(B=Pe(x.colorMatrix,j));const k=new Float32Array(B),K=new Float32Array([0,0,0,0]),ye=(S??100)/100,_e=`
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texCoord = a_texCoord;
    }
  `,xe=`
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
  `;v.useEffect(()=>{const s=q.current;if(!s)return;const e=s.getContext("webgl");if(!e){console.error("WebGL not supported");return}const u=(De,Me)=>{const y=e.createShader(De);return y?(e.shaderSource(y,Me),e.compileShader(y),e.getShaderParameter(y,e.COMPILE_STATUS)?y:(console.error("Shader compile error:",e.getShaderInfoLog(y)),e.deleteShader(y),null)):null},d=u(e.VERTEX_SHADER,_e),w=u(e.FRAGMENT_SHADER,xe);if(!d||!w)return;const o=e.createProgram();if(!o)return;if(e.attachShader(o,d),e.attachShader(o,w),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(o));return}e.useProgram(o);const p=e.getAttribLocation(o,"a_position"),T=e.getAttribLocation(o,"a_texCoord"),G=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,G);const f=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,0,0);const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A);const H=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);e.bufferData(e.ARRAY_BUFFER,H,e.STATIC_DRAW),e.enableVertexAttribArray(T),e.vertexAttribPointer(T,2,e.FLOAT,!1,0,0);const b=e.createTexture();e.bindTexture(e.TEXTURE_2D,b),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const we=e.getUniformLocation(o,"u_colorMatrix"),Te=e.getUniformLocation(o,"u_bias");e.uniformMatrix4fv(we,!1,k),e.uniform4fv(Te,K);const Ae=e.getUniformLocation(o,"u_brightness"),Re=e.getUniformLocation(o,"u_contrast"),Ee=e.getUniformLocation(o,"u_saturation"),Ce=e.getUniformLocation(o,"u_hue"),Fe=e.getUniformLocation(o,"u_vignette"),Le=e.getUniformLocation(o,"u_shadows"),Se=e.getUniformLocation(o,"u_grainIntensity"),Ue=e.getUniformLocation(o,"u_sharpness"),qe=e.getUniformLocation(o,"u_intensity");e.uniform1f(Ae,D),e.uniform1f(Re,M),e.uniform1f(Ee,P),e.uniform1f(Ce,V),e.uniform1f(Fe,$),e.uniform1f(Le,he),e.uniform1f(Se,pe),e.uniform1f(Ue,be),e.uniform1f(qe,ye);const Ie=e.getUniformLocation(o,"u_resolution");m.current.crossOrigin="anonymous",m.current.src=t,m.current.onload=()=>{s.width=m.current.naturalWidth,s.height=m.current.naturalHeight,e.viewport(0,0,s.width,s.height),e.uniform2f(Ie,s.width,s.height),e.bindTexture(e.TEXTURE_2D,b),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,m.current),e.drawArrays(e.TRIANGLES,0,6)}},[t,_,g,E,C,F,k,K,D,M,P,V,$,L,U,S,r]),v.useEffect(()=>{const s=q.current;!s||!X||setTimeout(()=>{if(!m.current.complete||m.current.naturalWidth===0||m.current.naturalHeight===0){console.error(" 'Not Found'.");return}const e=s.getContext("webgl");if(!e)return;const u=s.width,d=s.height,w=new Uint8Array(u*d*4);e.readPixels(0,0,u,d,e.RGBA,e.UNSIGNED_BYTE,w);const o=new Uint8Array(u*d*4);for(let f=0;f<d;f++){const A=f*u*4,H=(d-f-1)*u*4;for(let b=0;b<u*4;b++)o[H+b]=w[A+b]}const p=document.createElement("canvas");p.width=u,p.height=d;const T=p.getContext("2d");if(!T)return;const G=new ImageData(new Uint8ClampedArray(o),u,d);T.putImageData(G,0,0),p.toBlob(f=>{if(f){console.log("📸 Image saved!");const A=new File([f],"filtered-image.png",{type:"image/png"});X(A)}},"image/png")},100)},[r,oe,ne,ae,ie,se,ce,le,ue,de,me,fe,ge]);const Q=`brightness(${D*100}%) 
    contrast(${M*100}%) 
    saturate(${P*100}%)
     hue-rotate(${V*360}deg)`;console.log(Q);const ve=Ve(B);return Y?h.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},h.createElement("svg",{width:"1",height:"1"},h.createElement("filter",{id:I,colorInterpolationFilters:"sRGB"},h.createElement("feColorMatrix",{type:"matrix",values:ve}))),h.createElement("img",{crossOrigin:"anonymous",key:I,src:t,alt:"Filtered",style:{filter:`url(#${I}) ${Q}`,width:"100%",height:"100%",...O}})):h.createElement("div",{style:{position:"absolute",width:"100%",height:"100%",overflow:"hidden",...O}},h.createElement("canvas",{ref:q,style:Y?{display:"none"}:{width:"100%",height:"100%",position:"relative",top:0,left:0,right:0,bottom:0}}))};N.__docgenInfo={description:"",methods:[],displayName:"WebGLImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},vignette:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},shadows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},grain:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sharpness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const Oe={title:"ImageFilters",component:N,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},We=t=>h.createElement(N,{...t}),R=We.bind({});R.args={saveImage:()=>{},imageUrl:"https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"};var ee,te,re;R.parameters={...R.parameters,docs:{...(ee=R.parameters)==null?void 0:ee.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(re=(te=R.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};const Ye=["Default"];export{R as Default,Ye as __namedExportsOrder,Oe as default};
