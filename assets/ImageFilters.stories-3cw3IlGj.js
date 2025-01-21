import{R as a}from"./index-BYb6XiQz.js";const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function w(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}let l;const T=new Uint8Array(16);function U(){if(!l){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");l=crypto.getRandomValues.bind(crypto)}return l(T)}const M=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),p={randomUUID:M};function V(e,t,u){var n;if(p.randomUUID&&!t&&!e)return p.randomUUID();e=e||{};const s=e.random??((n=e.rng)==null?void 0:n.call(e))??U();if(s.length<16)throw new Error("Random bytes length must be >= 16");return s[6]=s[6]&15|64,s[8]=s[8]&63|128,w(s)}const I={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
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
        `}},c=({imageUrl:e,filter:t,redChannel:u=1,greenChannel:s=1,blueChannel:n=1,brightness:y=100,contrast:b=100,saturation:f=100,hueRotate:F=0,styles:x})=>{const o=`filter-${V()}`,d=I[t||""]||{cssFilter:"",colorMatrix:void 0},v=d.colorMatrix||`
        ${u} 0 0 0 0
        0 ${s} 0 0 0
        0 0 ${n} 0 0
        0 0 0 1 0
    `;return a.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},a.createElement("svg",{width:"1",height:"1"},a.createElement("filter",{id:o},a.createElement("feColorMatrix",{type:"matrix",values:v}))),a.createElement("img",{key:o,src:e,alt:"Filtered",style:{filter:`url(#${o}) ${d.cssFilter||""} brightness(${y}%) contrast(${b}%) saturate(${f}%) hue-rotate(${F}deg)`,width:"100%",height:"100%",...x}}))};c.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},styles:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};const R={title:"ImageFilters",component:c,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},q=e=>a.createElement(c,{...e}),i=q.bind({});i.args={imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var m,g,h;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(h=(g=i.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const S=["Default"];export{i as Default,S as __namedExportsOrder,R as default};
