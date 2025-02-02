import{r as v,R as y}from"./index-BYb6XiQz.js";const u=[];for(let e=0;e<256;++e)u.push((e+256).toString(16).slice(1));function Y(e,s=0){return(u[e[s+0]]+u[e[s+1]]+u[e[s+2]]+u[e[s+3]]+"-"+u[e[s+4]]+u[e[s+5]]+"-"+u[e[s+6]]+u[e[s+7]]+"-"+u[e[s+8]]+u[e[s+9]]+"-"+u[e[s+10]]+u[e[s+11]]+u[e[s+12]]+u[e[s+13]]+u[e[s+14]]+u[e[s+15]]).toLowerCase()}let I;const Z=new Uint8Array(16);function ee(){if(!I){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");I=crypto.getRandomValues.bind(crypto)}return I(Z)}const te=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),V={randomUUID:te};function se(e,s,t){var n;if(V.randomUUID&&!s&&!e)return V.randomUUID();e=e||{};const r=e.random??((n=e.rng)==null?void 0:n.call(e))??ee();if(r.length<16)throw new Error("Random bytes length must be >= 16");return r[6]=r[6]&15|64,r[8]=r[8]&63|128,Y(r)}const D={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
            1.2 0   0   0 0
            0   1.0 0.5 0 0
            0   0   1.5 0 0
            0   0   0   1 0
        `},deep:{colorMatrix:`
            1.5 0   0   0 0
            0   1.2 0   0 0
            0   0   2.0 0 0
            0   0   0   1 0
        `},cozySnow:{cssFilter:"brightness(99%) contrast(103%) saturate(91%) hue-rotate(334deg)",colorMatrix:`
            0.6 0   0   0 0
            0   0.8 0   0 0
            0   0   0.8 0 0
            0   0   0   1 0
        `},retro:{cssFilter:"saturate(150%) contrast(85%)"},pastel:{cssFilter:"saturate(120%) brightness(110%) hue-rotate(-20deg)"},mutedSepia:{cssFilter:"sepia(40%) brightness(0.9) contrast(1.05)"},moody:{cssFilter:"brightness(0.8) contrast(0.9) saturate(50%)"},goldenHour:{cssFilter:"sepia(20%) brightness(120%) contrast(110%) hue-rotate(25deg)"},oceanBreeze:{cssFilter:"saturate(140%) hue-rotate(-50deg) brightness(110%)"},cinematic:{cssFilter:"contrast(120%) brightness(90%) sepia(10%)"},noir:{cssFilter:"grayscale(100%) contrast(120%) brightness(80%)"},sunKissed:{cssFilter:"brightness(115%) contrast(105%) hue-rotate(15deg)"},nightVibes:{cssFilter:"brightness(70%) contrast(130%) saturate(90%) hue-rotate(-10deg)"},vintageFilm:{cssFilter:"sepia(60%) contrast(90%) brightness(85%) saturate(80%)"},deepBlue:{colorMatrix:`
            0.5 0   0   0 0
            0   0.7 0   0 0
            0   0   1.2 0 0
            0   0   0   1 0
        `},goldenTint:{colorMatrix:`
            1.0 0.2 0   0 0
            0.1 0.9 0   0 0
            0   0.2 0.8 0 0
            0   0   0   1 0
        `},lavenderHaze:{colorMatrix:`
            0.7 0.1 0.3 0 0
            0.2 0.6 0.3 0 0
            0.2 0.1 0.7 0 0
            0   0   0   1 0
        `},emeraldGlow:{colorMatrix:`
            0.6 0   0   0 0
            0   1.1 0   0 0
            0   0   0.7 0 0
            0   0   0   1 0
        `},roseTint:{colorMatrix:`
            1.2 0.1 0.2 0 0
            0.2 0.8 0.2 0 0
            0.1 0.2 0.9 0 0
            0   0   0   1 0
        `},arcticInversion:{colorMatrix:`
    1    0    0    0 0
    0   0.8   0    0 0
    0    0  -1.8   0 0
    0    0    0    1 0
  `},crimsonGlow:{colorMatrix:`
    1.3  0    0    0 0
    0   0.8   0    0 0
    0    0    1    0 0
    0    0    0    1 0
  `},rusticSunset:{cssFilter:"brightness(94%) contrast(93%) saturate(80%) hue-rotate(1deg)",colorMatrix:`
    1.2 0     0    0 0
    0    0.7  0    0 0
    0    0    0.6  0 0
    0    0     0   1 0
  `},sunsetDream:{colorMatrix:`
      1.2 0.1 0.0 0 0
      0.0 1.1 0.0 0 0
      0.0 0.0 0.7 0 0
      0   0   0   1 0
    `},blueLagoon:{colorMatrix:`
      0.8 0.0 0.1 0 0
      0.0 0.9 0.0 0 0
      0.0 0.0 1.5 0 0
      0   0   0   1 0
    `},amberGlow:{colorMatrix:`
      1.2 0.0 0.0 0 0
      0.0 1.1 0.0 0 0
      0.0 0.0 0.6 0 0
      0   0   0   1 0
    `}};function f(e,s){const[t,r]=v.useState(e);return v.useEffect(()=>{const n=setTimeout(()=>{r(e)},s);return()=>{clearTimeout(n)}},[e,s]),t}function U(e){return e.trim().split(/\s+/).map(s=>parseFloat(s))}function re(e){const s=[];for(let t=0;t<20;t+=5)s.push(e.slice(t,t+5).map(r=>r.toFixed(2)).join(" "));return s.join(`
`)}function ne(e,s){const t=new Array(20).fill(0);for(let r=0;r<4;r++){for(let o=0;o<4;o++){let i=0;for(let c=0;c<4;c++)i+=e[r*5+c]*s[c*5+o];t[r*5+o]=i}let n=e[r*5+4]*255;for(let o=0;o<4;o++)n+=e[r*5+o]*s[o*5+4]*255;t[r*5+4]=n/255}return t}function oe(e,s,t,r,n,o){const i=H(s,t,r,n,o),c=ce(i);le(e,c)}function H(e,s,t,r,n){const o=`
    brightness(${s}%)
    contrast(${t}%)
    saturate(${r}%)
    hue-rotate(${n}deg)
  `.trim();return[e,o].filter(Boolean).join(" ")}function ie(e,s){const t=s.trim().split(/\s+/).map(r=>parseFloat(r));if(t.length!==20){console.warn("colorMatrix must have 20 numbers exactly");return}for(let r=0;r<e.length;r+=4){const n=e[r],o=e[r+1],i=e[r+2],c=e[r+3],l=t[0]*n+t[1]*o+t[2]*i+t[3]*c+t[4],a=t[5]*n+t[6]*o+t[7]*i+t[8]*c+t[9],m=t[10]*n+t[11]*o+t[12]*i+t[13]*c+t[14],p=t[15]*n+t[16]*o+t[17]*i+t[18]*c+t[19];e[r]=g(l),e[r+1]=g(a),e[r+2]=g(m),e[r+3]=g(p)}}function ce(e){const s=[],t=e.trim();return t&&t.split(")").map(n=>n.trim()).filter(Boolean).forEach(n=>{const i=(n+")").match(/^(.*?)\((.*)\)$/);if(!i)return;const c=i[1].trim();let l=i[2].trim();const a=l.endsWith("%");a&&(l=l.slice(0,-1));const m=parseFloat(l);if(isNaN(m))return;const p=a?m/100:m;switch(c){case"grayscale":case"invert":case"sepia":case"brightness":case"contrast":case"saturate":s.push({name:c,value:p});break;case"hue-rotate":if(l.endsWith("deg")){const d=parseFloat(l.replace("deg",""));isNaN(d)||s.push({name:"hue-rotate",value:d})}break}}),s}function le(e,s){s.forEach(t=>{switch(t.name){case"brightness":ae(e,t.value);break;case"contrast":ue(e,t.value);break;case"saturate":me(e,t.value);break;case"sepia":de(e,t.value);break;case"grayscale":pe(e,t.value);break;case"invert":ge(e,t.value);break;case"hue-rotate":he(e,t.value);break}})}function ae(e,s){for(let t=0;t<e.length;t+=4)e[t]*=s,e[t+1]*=s,e[t+2]*=s}function ue(e,s){for(let t=0;t<e.length;t+=4)e[t]=(e[t]-128)*s+128,e[t+1]=(e[t+1]-128)*s+128,e[t+2]=(e[t+2]-128)*s+128}function me(e,s){for(let t=0;t<e.length;t+=4){let r=e[t],n=e[t+1],o=e[t+2];const[i,c,l]=P(r,n,o),a=c*s,[m,p,d]=G(i,a,l);e[t]=g(m),e[t+1]=g(p),e[t+2]=g(d)}}function pe(e,s){for(let t=0;t<e.length;t+=4){const r=e[t],n=e[t+1],o=e[t+2],i=.3*r+.59*n+.11*o;e[t]=r+(i-r)*s,e[t+1]=n+(i-n)*s,e[t+2]=o+(i-o)*s}}function ge(e,s){for(let t=0;t<e.length;t+=4)e[t]=e[t]+(255-e[t])*s,e[t+1]=e[t+1]+(255-e[t+1])*s,e[t+2]=e[t+2]+(255-e[t+2])*s}function de(e,s){for(let t=0;t<e.length;t+=4){const r=e[t],n=e[t+1],o=e[t+2],i=.393*r+.769*n+.189*o,c=.349*r+.686*n+.168*o,l=.272*r+.534*n+.131*o;e[t]=r+(i-r)*s,e[t+1]=n+(c-n)*s,e[t+2]=o+(l-o)*s}}function he(e,s){for(let t=0;t<e.length;t+=4){let r=e[t],n=e[t+1],o=e[t+2],[i,c,l]=P(r,n,o);i=(i+s)%360;const[a,m,p]=G(i,c,l);e[t]=g(a),e[t+1]=g(m),e[t+2]=g(p)}}function g(e){return Math.max(0,Math.min(255,Math.round(e)))}function P(e,s,t){e/=255,s/=255,t/=255;const r=Math.max(e,s,t),n=Math.min(e,s,t);let o=0,i=0;const c=(r+n)/2;if(r===n)o=0,i=0;else{const a=r-n;switch(i=c>.5?a/(2-r-n):a/(r+n),r){case e:o=(s-t)/a+(s<t?6:0);break;case s:o=(t-e)/a+2;break;case t:default:o=(e-s)/a+4;break}o*=60}i*=100;const l=c*100;return[o,i,l]}function G(e,s,t){s/=100,t/=100;const r=(1-Math.abs(2*t-1))*s,n=r*(1-Math.abs(e/60%2-1)),o=t-r/2;let i=0,c=0,l=0;return 0<=e&&e<60?(i=r,c=n):60<=e&&e<120?(i=n,c=r):120<=e&&e<180?(c=r,l=n):180<=e&&e<240?(c=n,l=r):240<=e&&e<300?(i=n,l=r):(i=r,l=n),[(i+o)*255,(c+o)*255,(l+o)*255]}const C=({imageUrl:e,filter:s,redChannel:t=1,greenChannel:r=1,blueChannel:n=1,brightness:o=100,contrast:i=100,saturation:c=100,hueRotate:l=0,saveImage:a,styles:m})=>{const p=`filter-${se()}`,d=v.useRef(null),[T,N]=v.useState(!1),O=f(o,300),j=f(i,300),_=f(c,300),z=f(l,300),L=f(t,300),W=f(r,300),K=f(n,300),A=()=>{N(!0)},M=s&&D[s]?D[s]:{cssFilter:"",colorMatrix:void 0},S=`
    ${t} 0 0 0 0
    0 ${r} 0 0 0
    0 0 ${n} 0 0
    0 0 0 1 0
  `;let w=S;if(M.colorMatrix){const F=U(M.colorMatrix),h=U(S),b=ne(F,h);w=re(b)}const J=H(M.cssFilter,o,i,c,l),Q=()=>{if(!d.current||!T||!a)return;const F=d.current,h=document.createElement("canvas"),b=h.getContext("2d");if(!b)return;h.width=F.naturalWidth,h.height=F.naturalHeight,b.drawImage(F,0,0);const R=b.getImageData(0,0,h.width,h.height),k=R.data;ie(k,w),oe(k,M.cssFilter,o,i,c,l),b.putImageData(R,0,0),h.toBlob(E=>{if(!E)return;const X=new File([E],"filtered-image.png",{type:"image/png"});a(X)},"image/png")};return v.useEffect(()=>{Q()},[s,O,j,_,z,L,W,K,T]),y.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},y.createElement("svg",{width:"1",height:"1"},y.createElement("filter",{id:p,colorInterpolationFilters:"sRGB"},y.createElement("feColorMatrix",{type:"matrix",values:w}))),y.createElement("img",{ref:d,crossOrigin:"anonymous",key:p,src:e,alt:"Filtered",onLoad:A,style:{filter:`url(#${p}) ${J}`,width:"100%",height:"100%",...m}}))};C.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""}}};const ye={title:"ImageFilters",component:C,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},fe=e=>y.createElement(C,{...e}),x=fe.bind({});x.args={saveImage:()=>{},imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var q,$,B;x.parameters={...x.parameters,docs:{...(q=x.parameters)==null?void 0:q.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(B=($=x.parameters)==null?void 0:$.docs)==null?void 0:B.source}}};const Fe=["Default"];export{x as Default,Fe as __namedExportsOrder,ye as default};
