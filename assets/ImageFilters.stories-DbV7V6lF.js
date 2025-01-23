import{r as w,R as a}from"./index-BYb6XiQz.js";const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function D(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}let F;const _=new Uint8Array(16);function z(){if(!F){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");F=crypto.getRandomValues.bind(crypto)}return F(_)}const H=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:H};function O(e,t,l){var n;if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const s=e.random??((n=e.rng)==null?void 0:n.call(e))??z();if(s.length<16)throw new Error("Random bytes length must be >= 16");return s[6]=s[6]&15|64,s[8]=s[8]&63|128,D(s)}const B={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
            1.2 0   0   0 0
            0   1.0 0.5 0 0
            0   0   1.5 0 0
            0   0   0   1 0
        `},deep:{cssFilter:"none",colorMatrix:`
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
        `}},b=({imageUrl:e,filter:t,redChannel:l=1,greenChannel:s=1,blueChannel:n=1,brightness:u=100,contrast:d=100,saturation:g=100,hueRotate:m=0,saveImage:v,styles:U})=>{const c=`filter-${O()}`,p=w.useRef(null),[M,S]=a.useState(!1),V=()=>{M||S(!0)},h=B[t||""]||{cssFilter:"",colorMatrix:void 0},q=h.colorMatrix||`
        ${l} 0 0 0 0
        0 ${s} 0 0 0
        0 0 ${n} 0 0
        0 0 0 1 0
    `,R=()=>{if(p.current&&v){const i=document.createElement("canvas"),f=i.getContext("2d");if(!f)return;const y=p.current;i.width=y.naturalWidth,i.height=y.naturalHeight,f.filter=`url(#${c}) ${h.cssFilter||""} brightness(${u}%) contrast(${d}%) saturate(${g}%) hue-rotate(${m}deg)`,f.drawImage(y,0,0,i.width,i.height),i.toBlob(x=>{if(x){const C=new File([x],"filtered-image.png",{type:"image/png"});v(C)}},"image/png")}};return w.useEffect(()=>{R()},[e,t,l,s,n,u,d,g,m]),a.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},a.createElement("svg",{width:"1",height:"1"},a.createElement("filter",{id:c},a.createElement("feColorMatrix",{type:"matrix",values:q}))),a.createElement("img",{ref:p,crossOrigin:"anonymous",key:c,src:e,onError:V,alt:"Filtered",style:{filter:`url(#${c}) ${h.cssFilter||""} brightness(${u}%) contrast(${d}%) saturate(${g}%) hue-rotate(${m}deg)`,width:"100%",height:"100%",...U}}))};b.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},saveImage:{required:!1,tsType:{name:"signature",type:"function",raw:"(file: File) => void",signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"void"}}},description:""}}};const P={title:"ImageFilters",component:b,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},j=e=>a.createElement(b,{...e}),o=j.bind({});o.args={saveImage:()=>{},imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var $,E,I;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(I=(E=o.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const A=["Default"];export{o as Default,A as __namedExportsOrder,P as default};
