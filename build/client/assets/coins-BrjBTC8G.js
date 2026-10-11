import{r as c}from"./index-8NflKPZb.js";/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=t=>t==null?void 0:t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function E(t,e,n=[]){if(e==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:p(t),size:24,node:e,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=t=>{let e="",n=!1;for(const o of t){if(o==="-"||o==="_"||o<=" "){n=e.length>0;continue}e.length===0?e+=o.toLowerCase():e+=n?o.toUpperCase():o,n=!1}return e};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=t=>{const e=I(t);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(...t)=>t.filter((e,n,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function m(t){return t!=null}function j(t,e={}){var b,k;const n=e.attributeNames??{},o=i=>n[i]??i,l=t.size??t.width??r.width,h=t.size??t.height??r.height,a=((b=t.aliases)==null?void 0:b.filter(i=>typeof i=="string"&&i.trim()!=="").map(i=>`lucide-${i}`))??[],f=[...t.name?[`lucide-${t.name}`]:[],...a],s=((k=e.className)==null?void 0:k.split(" ").filter(Boolean))??[],w=e.includeDefaultClasses===!1?y(...s):y("lucide",...f,...s),x=e.absoluteStrokeWidth?Number(e.strokeWidth??r["stroke-width"])*Number(t.size??t.width??r.width)/Number(e.size??e.width??r.width):e.strokeWidth??r["stroke-width"];return["svg",{...Object.entries(r).reduce((i,[u,d])=>(i[o(u)]=d,i),{}),..."color"in e&&e.color&&{[o("stroke")]:e.color},..."size"in e&&m(e.size)&&{[o("width")]:e.size,[o("height")]:e.size},..."width"in e&&m(e.width)&&{[o("width")]:e.width},..."height"in e&&m(e.height)&&{[o("height")]:e.height},[o("stroke-width")]:x,...w&&{[o("class")]:w},[o("viewBox")]:`0 0 ${l} ${h}`,...e.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in e&&e.attributes},t.node.map(i=>{const[u,d,C]=i,g=e.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...d}:d;return C?[u,g,C]:[u,g]})]}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function P(t,e={}){return j(t,{...e,attributeNames:{...e.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},R=c.createContext({}),_=()=>c.useContext(R),q=c.forwardRef(({color:t,size:e,width:n,height:o,strokeWidth:l,absoluteStrokeWidth:h,nonScalingStroke:a,className:f="",children:s,iconNode:w=[],icon:x={node:w,aliases:[],size:24},...N},b)=>{const{size:k=24,strokeWidth:i=2,absoluteStrokeWidth:u=!1,nonScalingStroke:d=!1,color:C="currentColor",className:g=""}=_()??{},z=!!s||D(N),[A,W,v=[]]=P(x,{color:t??C,width:n??e??k,height:o??e??k,strokeWidth:l??i,absoluteStrokeWidth:h??u,nonScalingStroke:a??d,className:y(g,f),hasA11yProp:z,attributes:N});return c.createElement(A,{ref:b,...W},[...v.map(([L,B])=>c.createElement(L,B)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function F(t,e=[],n=[]){const o=typeof t=="string"?E(t,e,n):t,l=c.forwardRef(({className:h,...a},f)=>c.createElement(q,{ref:f,icon:o,className:h,...a}));return o.name&&(l.displayName=$(o.name)),l}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S={name:"coins",size:24,node:[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48",key:"bq4yh3"}],["path",{d:"M15 6h1v4",key:"11y1tn"}],["path",{d:"m6.134 14.768.866-.5 2 3.464",key:"17snzx"}],["circle",{cx:"16",cy:"8",r:"6",key:"14bfc9"}]]};S.node;const U=F(S);export{U as C,F as c};
