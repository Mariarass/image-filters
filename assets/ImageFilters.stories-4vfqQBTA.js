import{r as x,R as p}from"./index-BYb6XiQz.js";const Z={grayscale:{saturate:0},tokyo:{brightness:1.03,contrast:.82,hueRotate:355,saturate:.93,shadows:1.02,grain:.3,vignette:.5,colorMatrix:new Float32Array([1.3,0,0,0,0,.92,0,0,0,0,.97,0,0,0,0,1])},malibu:{brightness:.98,contrast:.99,hueRotate:1,saturate:.67,shadows:1.79,grain:.1,vignette:.5,colorMatrix:new Float32Array([1.25,0,0,0,0,.96,0,0,0,0,1,0,0,0,0,1])},brightness:{brightness:1.5},contrast:{contrast:2},saturate:{saturate:2},hue:{hueRotate:90},vintage:{sepia:.5,contrast:1.2,brightness:.9},cool:{hueRotate:270,saturate:1.5},fancyEffect:{brightness:1.2,contrast:1.1,colorMatrix:new Float32Array([1.2,0,0,0,0,1,.5,0,0,0,1.5,0,0,0,0,1])},deep:{colorMatrix:new Float32Array([1.5,0,0,0,0,1.2,0,0,0,0,2,0,0,0,0,1])},cozySnow:{brightness:.99,contrast:1.03,saturate:.91,hueRotate:334,colorMatrix:new Float32Array([.6,0,0,0,0,.8,0,0,0,0,.8,0,0,0,0,1])},retro:{saturate:1.5,contrast:.85},pastel:{saturate:1.2,brightness:1.1,hueRotate:-20},mutedSepia:{brightness:.9,contrast:1.05},moody:{brightness:.8,contrast:.9,saturate:.5},goldenHour:{brightness:1.2,contrast:1.1,hueRotate:25},oceanBreeze:{saturate:1.4,hueRotate:-50,brightness:1.1},cinematic:{contrast:1.2,brightness:.9,sepia:.1},noir:{saturate:0,contrast:1.2,brightness:.8},sunKissed:{brightness:1.15,contrast:1.05,hueRotate:15},nightVibes:{brightness:.7,contrast:1.3,saturate:.9,hueRotate:-10},vintageFilm:{contrast:.9,brightness:.85,saturate:.8},deepBlue:{colorMatrix:new Float32Array([.5,0,0,0,0,.7,0,0,0,0,1.2,0,0,0,0,1])},goldenTint:{colorMatrix:new Float32Array([1,.2,0,0,.1,.9,0,0,0,.2,.8,0,0,0,0,1])},lavenderHaze:{colorMatrix:new Float32Array([.7,.1,.3,0,.2,.6,.3,0,.2,.1,.7,0,0,0,0,1])},emeraldGlow:{colorMatrix:new Float32Array([.6,0,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},roseTint:{colorMatrix:new Float32Array([1.2,.1,.2,0,.2,.8,.2,0,.1,.2,.9,0,0,0,0,1])},arcticInversion:{colorMatrix:new Float32Array([1,0,0,0,0,.8,0,0,0,0,-1.8,0,0,0,0,1])},crimsonGlow:{colorMatrix:new Float32Array([1.3,0,0,0,0,.8,0,0,0,0,1,0,0,0,0,1])},rusticSunset:{brightness:.94,contrast:.93,saturate:.8,hueRotate:1,colorMatrix:new Float32Array([1.2,0,0,0,0,.7,0,0,0,0,.6,0,0,0,0,1])},sunsetDream:{colorMatrix:new Float32Array([1.2,.1,0,0,0,1.1,0,0,0,0,.7,0,0,0,0,1])},blueLagoon:{colorMatrix:new Float32Array([.8,0,.1,0,0,.9,0,0,0,0,1.5,0,0,0,0,1])},amberGlow:{colorMatrix:new Float32Array([1.2,0,0,0,0,1.1,0,0,0,0,.6,0,0,0,0,1])}};function l(t,r){const[i,a]=x.useState(t);return x.useEffect(()=>{const c=setTimeout(()=>{a(t)},r);return()=>{clearTimeout(c)}},[t,r]),i}function Pe(t,r){const i=new Float32Array(16);for(let a=0;a<4;a++)for(let c=0;c<4;c++){let v=0;for(let h=0;h<4;h++)v+=t[a*4+h]*r[h*4+c];i[a*4+c]=v}return i}function Be(t){if(t.length!==16)throw new Error("Ожидается матрица 4x4 (16 элементов)");const r=[];for(let i=0;i<4;i++)r.push(t[i*4]),r.push(t[i*4+1]),r.push(t[i*4+2]),r.push(t[i*4+3]),r.push(0);return r.join(" ")}const n=[];for(let t=0;t<256;++t)n.push((t+256).toString(16).slice(1));function Ge(t,r=0){return(n[t[r+0]]+n[t[r+1]]+n[t[r+2]]+n[t[r+3]]+"-"+n[t[r+4]]+n[t[r+5]]+"-"+n[t[r+6]]+n[t[r+7]]+"-"+n[t[r+8]]+n[t[r+9]]+"-"+n[t[r+10]]+n[t[r+11]]+n[t[r+12]]+n[t[r+13]]+n[t[r+14]]+n[t[r+15]]).toLowerCase()}let N;const Ve=new Uint8Array(16);function He(){if(!N){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");N=crypto.getRandomValues.bind(crypto)}return N(Ve)}const ze=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),ee={randomUUID:ze};function Ne(t,r,i){var c;if(ee.randomUUID&&!r&&!t)return ee.randomUUID();t=t||{};const a=t.random??((c=t.rng)==null?void 0:c.call(t))??He();if(a.length<16)throw new Error("Random bytes length must be >= 16");return a[6]=a[6]&15|64,a[8]=a[8]&63|128,Ge(a)}const W=({imageUrl:t,filter:r,redChannel:i=1,greenChannel:a=1,blueChannel:c=1,brightness:v=100,contrast:h=100,saturation:E=100,hueRotate:F=0,vignette:C=1,shadows:X=100,grain:O=1,intensity:S=100,sharpness:L=0,saveImage:U,styles:Y,preview:$})=>{const I=x.useRef(null),f=x.useRef(new Image),q=`filter-${Ne()}`,ne=l(v,300),ae=l(h,300),ie=l(E,300),se=l(F,300),ce=l(i,300),le=l(a,300),ue=l(c,300),de=l(X,300),fe=l(C??0,300),me=l(O??0,300),ge=l(L??0,300),he=l(S??100,300),m=r&&Z[r]?Z[r]:{},D=(m.brightness??1)*(v/100),M=(m.contrast??1)*(h/100),P=(m.saturate??1)*(E/100),B=((m.hueRotate??0)+F)/360,j=(m.shadows??1)*(X/100),k=(m.grain??1)+O/100,G=(m.vignette??1)+C/10,pe=L/100;console.log("finalGrainIntensity",G);const K=new Float32Array([i,0,0,0,0,a,0,0,0,0,c,0,0,0,0,1]);let V=K;m.colorMatrix&&(V=Pe(m.colorMatrix,K));const Q=new Float32Array(V),J=new Float32Array([0,0,0,0]),be=(S??100)/100,ye=`
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
  `;x.useEffect(()=>{const s=I.current;if(!s)return;const e=s.getContext("webgl",{preserveDrawingBuffer:!0});if(!e){console.error("WebGL not supported");return}const u=(De,Me)=>{const _=e.createShader(De);return _?(e.shaderSource(_,Me),e.compileShader(_),e.getShaderParameter(_,e.COMPILE_STATUS)?_:(console.error("Shader compile error:",e.getShaderInfoLog(_)),e.deleteShader(_),null)):null},d=u(e.VERTEX_SHADER,ye),w=u(e.FRAGMENT_SHADER,_e);if(!d||!w)return;const o=e.createProgram();if(!o)return;if(e.attachShader(o,d),e.attachShader(o,w),e.linkProgram(o),!e.getProgramParameter(o,e.LINK_STATUS)){console.error("Program link error:",e.getProgramInfoLog(o));return}e.useProgram(o);const b=e.getAttribLocation(o,"a_position"),A=e.getAttribLocation(o,"a_texCoord"),H=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,H);const g=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]);e.bufferData(e.ARRAY_BUFFER,g,e.STATIC_DRAW),e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0);const T=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,T);const z=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]);e.bufferData(e.ARRAY_BUFFER,z,e.STATIC_DRAW),e.enableVertexAttribArray(A),e.vertexAttribPointer(A,2,e.FLOAT,!1,0,0);const y=e.createTexture();e.bindTexture(e.TEXTURE_2D,y),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!0),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR);const we=e.getUniformLocation(o,"u_colorMatrix"),Ae=e.getUniformLocation(o,"u_bias");e.uniformMatrix4fv(we,!1,Q),e.uniform4fv(Ae,J);const Te=e.getUniformLocation(o,"u_brightness"),Re=e.getUniformLocation(o,"u_contrast"),Ee=e.getUniformLocation(o,"u_saturation"),Fe=e.getUniformLocation(o,"u_hue"),Ce=e.getUniformLocation(o,"u_vignette"),Se=e.getUniformLocation(o,"u_shadows"),Le=e.getUniformLocation(o,"u_grainIntensity"),Ue=e.getUniformLocation(o,"u_sharpness"),Ie=e.getUniformLocation(o,"u_intensity");e.uniform1f(Te,D),e.uniform1f(Re,M),e.uniform1f(Ee,P),e.uniform1f(Fe,B),e.uniform1f(Ce,G),e.uniform1f(Se,j),e.uniform1f(Le,k),e.uniform1f(Ue,pe),e.uniform1f(Ie,be);const qe=e.getUniformLocation(o,"u_resolution");f.current.crossOrigin="anonymous",f.current.src=t,f.current.onload=()=>{s.width=f.current.naturalWidth,s.height=f.current.naturalHeight,e.viewport(0,0,s.width,s.height),e.uniform2f(qe,s.width,s.height),e.bindTexture(e.TEXTURE_2D,y),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,f.current),e.drawArrays(e.TRIANGLES,0,6)}},[t,v,h,E,F,C,Q,J,D,M,P,B,j,k,G,L,S,r]),x.useEffect(()=>{console.log("saveImage",U);const s=I.current;!s||!U||setTimeout(()=>{if(!f.current.complete||f.current.naturalWidth===0||f.current.naturalHeight===0){console.error(" 'Not Found'.");return}const e=s.getContext("webgl",{preserveDrawingBuffer:!0});if(!e)return;const u=s.width,d=s.height,w=new Uint8Array(u*d*4);e.readPixels(0,0,u,d,e.RGBA,e.UNSIGNED_BYTE,w);const o=new Uint8Array(u*d*4);for(let g=0;g<d;g++){const T=g*u*4,z=(d-g-1)*u*4;for(let y=0;y<u*4;y++)o[z+y]=w[T+y]}const b=document.createElement("canvas");b.width=u,b.height=d;const A=b.getContext("2d");if(!A)return;const H=new ImageData(new Uint8ClampedArray(o),u,d);A.putImageData(H,0,0),b.toBlob(g=>{if(g){console.log("📸 Image saved!");const T=new File([g],"filtered-image.png",{type:"image/png"});U(T)}},"image/png")},100)},[r,ne,ae,ie,se,ce,le,ue,de,fe,me,ge,he]);const ve=`brightness(${D*100}%) 
    contrast(${M*100}%) 
    saturate(${P*100}%)
     hue-rotate(${B*360}deg)`,xe=Be(V);return $?p.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},p.createElement("svg",{width:"1",height:"1"},p.createElement("filter",{id:q,colorInterpolationFilters:"sRGB"},p.createElement("feColorMatrix",{type:"matrix",values:xe}))),p.createElement("img",{crossOrigin:"anonymous",key:q,src:t,alt:"Filtered",style:{filter:`url(#${q}) ${ve}`,width:"100%",height:"100%",...Y}})):p.createElement("div",{style:{position:"absolute",width:"100%",height:"100%",overflow:"hidden",...Y}},p.createElement("canvas",{ref:I,style:$?{display:"none"}:{width:"100%",height:"100%",position:"relative",top:0,left:0,right:0,bottom:0}}))};W.__docgenInfo={description:"",methods:[],displayName:"WebGLImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},vignette:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},shadows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},grain:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},intensity:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},sharpness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""},preview:{required:!1,tsType:{name:"boolean"},description:""}}};const Oe={title:"ImageFilters",component:W,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},We=t=>p.createElement(W,{...t}),R=We.bind({});R.args={saveImage:()=>{console.log("saveImage")},imageUrl:"https://simpleecreate.com/images/rCfBiP7oGHVJOWMPHhY365ZGlWt3bjQGLXQq38bP.png"};var te,re,oe;R.parameters={...R.parameters,docs:{...(te=R.parameters)==null?void 0:te.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(oe=(re=R.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};const Ye=["Default"];export{R as Default,Ye as __namedExportsOrder,Oe as default};
