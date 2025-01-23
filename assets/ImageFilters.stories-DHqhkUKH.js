import{r as d,R as i}from"./index-BYb6XiQz.js";const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function G(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}let x;const P=new Uint8Array(16);function A(){if(!x){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");x=crypto.getRandomValues.bind(crypto)}return x(P)}const K=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),E={randomUUID:K};function L(e,t,c){var a;if(E.randomUUID&&!t&&!e)return E.randomUUID();e=e||{};const s=e.random??((a=e.rng)==null?void 0:a.call(e))??A();if(s.length<16)throw new Error("Random bytes length must be >= 16");return s[6]=s[6]&15|64,s[8]=s[8]&63|128,G(s)}const N={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
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
        `}};function n(e,t){const[c,s]=d.useState(e);return d.useEffect(()=>{const a=setTimeout(()=>{s(e)},t);return()=>{clearTimeout(a)}},[e,t]),c}const v=({imageUrl:e,filter:t,redChannel:c=1,greenChannel:s=1,blueChannel:a=1,brightness:m=100,contrast:g=100,saturation:p=100,hueRotate:h=0,saveImage:w,styles:U})=>{const u=`filter-${L()}`,f=d.useRef(null),[V,M]=i.useState(!1),R=n(m,300),q=n(g,300),C=n(p,300),D=n(h,300),B=n(c,300),H=n(s,300),_=n(a,300),z=()=>{V||M(!0)},y=N[t||""]||{cssFilter:"",colorMatrix:void 0},O=y.colorMatrix||`
        ${c} 0 0 0 0
        0 ${s} 0 0 0
        0 0 ${a} 0 0
        0 0 0 1 0
    `,j=()=>{if(f.current&&w){const o=document.createElement("canvas"),b=o.getContext("2d");if(!b)return;const F=f.current;o.width=F.naturalWidth,o.height=F.naturalHeight,b.filter=`url(#${u}) ${y.cssFilter||""} brightness(${m}%) contrast(${g}%) saturate(${p}%) hue-rotate(${h}deg)`,b.drawImage(F,0,0,o.width,o.height),o.toBlob(T=>{if(T){const k=new File([T],"filtered-image.png",{type:"image/png"});w(k)}},"image/png")}};return d.useEffect(()=>{j()},[R,q,C,D,B,H,_]),i.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},i.createElement("svg",{width:"1",height:"1"},i.createElement("filter",{id:u},i.createElement("feColorMatrix",{type:"matrix",values:O}))),i.createElement("img",{ref:f,crossOrigin:"anonymous",key:u,src:e,onError:z,alt:"Filtered",style:{filter:`url(#${u}) ${y.cssFilter||""} brightness(${m}%) contrast(${g}%) saturate(${p}%) hue-rotate(${h}deg)`,width:"100%",height:"100%",...U}}))};v.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""}}};const Q={title:"ImageFilters",component:v,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},W=e=>i.createElement(v,{...e}),l=W.bind({});l.args={saveImage:()=>{},imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var $,I,S;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(S=(I=l.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};const X=["Default"];export{l as Default,X as __namedExportsOrder,Q as default};
