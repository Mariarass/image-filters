import{r as y,R as e}from"./index-BYb6XiQz.js";const v={grayscale:{cssFilter:"grayscale(100%)"},sepia:{cssFilter:"sepia(100%)"},invert:{cssFilter:"invert(100%)"},blur:{cssFilter:"blur(6px)"},brightness:{cssFilter:"brightness(150%)"},contrast:{cssFilter:"contrast(200%)"},saturate:{cssFilter:"saturate(200%)"},hue:{cssFilter:"hue-rotate(90deg)"},vintage:{cssFilter:"sepia(50%) contrast(120%) brightness(90%)"},cool:{cssFilter:"hue-rotate(270deg) saturate(150%)"},fancyEffect:{cssFilter:"brightness(120%) contrast(110%)",colorMatrix:`
            1.2 0   0   0 0
            0   1.0 0.5 0 0
            0   0   1.5 0 0
            0   0   0   1 0
        `},customRedBlue:{cssFilter:"none",colorMatrix:`
            1.5 0   0   0 0
            0   1.2 0   0 0
            0   0   2.0 0 0
            0   0   0   1 0
        `}},s=({imageUrl:r,filter:c,redChannel:u=1,greenChannel:d=1,blueChannel:p=1,brightness:m=100,contrast:f=100,saturation:g=100,hueRotate:h=0})=>{const a=y.useId(),i=v[c||""]||{cssFilter:"",colorMatrix:void 0},F=i.colorMatrix||`
        ${u} 0 0 0 0
        0 ${d} 0 0 0
        0 0 ${p} 0 0
        0 0 0 1 0
    `;return e.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},e.createElement("svg",{width:"0",height:"0"},e.createElement("filter",{id:a},e.createElement("feColorMatrix",{type:"matrix",values:F}))),e.createElement("img",{src:r,alt:"Filtered",style:{filter:`${i.cssFilter} url(#${a}) brightness(${m}%) contrast(${f}%) saturate(${g}%) hue-rotate(${h}deg)`,width:"100%",height:"100%"}}))};s.__docgenInfo={description:"",methods:[],displayName:"ImageFilter",props:{imageUrl:{required:!0,tsType:{name:"string"},description:""},filter:{required:!1,tsType:{name:"string"},description:""},redChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},greenChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},blueChannel:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},brightness:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},contrast:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},saturation:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},hueRotate:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}}}};const T={title:"ImageFilters",component:s,argTypes:{children:{control:{type:"text"}}},parameters:{controls:{expanded:!0}}},b=r=>e.createElement(s,{...r}),t=b.bind({});t.args={imageUrl:"https://static.vecteezy.com/system/resources/previews/028/627/212/non_2x/photorealistic-panoramic-view-of-the-beautiful-natural-landscape-on-the-edge-of-the-lake-in-the-forest-created-with-ai-generative-free-photo.jpg"};var l,n,o;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:"args => <ImageFilters {...args} />",...(o=(n=t.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const q=["Default"];export{t as Default,q as __namedExportsOrder,T as default};
