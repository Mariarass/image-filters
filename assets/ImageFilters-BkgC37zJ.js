import{r as m,R as e}from"./index-BYb6XiQz.js";const f={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},invert:{cssFilter:"invert(100%)"},blur:{cssFilter:"blur(6px)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
            1.2 0   0   0 0
            0   1.0 0.5 0 0
            0   0   1.5 0 0
            0   0   0   1 0
        `},customRedBlue:{cssFilter:"none",colorMatrix:`
            1.5 0   0   0 0
            0   1.2 0   0 0
            0   0   2.0 0 0
            0   0   0   1 0
        `}},g=({imageUrl:s,filter:a,redChannel:i=1,greenChannel:l=1,blueChannel:n=1,brightness:u=100,contrast:c=100,saturation:o=100,hueRotate:d=0})=>{const t=m.useId(),r=f[a||""]||{cssFilter:"",colorMatrix:void 0},p=r.colorMatrix||`
        ${i} 0 0 0 0
        0 ${l} 0 0 0
        0 0 ${n} 0 0
        0 0 0 1 0
    `;return e.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},e.createElement("svg",{width:"0",height:"0"},e.createElement("filter",{id:t},e.createElement("feColorMatrix",{type:"matrix",values:p}))),e.createElement("img",{src:s,alt:"Filtered",style:{filter:`${r.cssFilter} url(#${t}) brightness(${u}%) contrast(${c}%) saturate(${o}%) hue-rotate(${d}deg)`,width:"100%",height:"100%"}}))};g.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};export{g as I};
