import{r as l}from"./index-8NflKPZb.js";/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=e=>e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function E(e,t,n=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:p(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=e=>{let t="",n=!1;for(const o of e){if(o==="-"||o==="_"||o<=" "){n=t.length>0;continue}t.length===0?t+=o.toLowerCase():t+=n?o.toUpperCase():o,n=!1}return t};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=e=>{const t=I(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=(...e)=>e.filter((t,n,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function x(e){return e!=null}function j(e,t={}){const n=t.attributeNames??{},o=i=>n[i]??i,u=e.size??e.width??c.width,h=e.size??e.height??c.height,a=e.aliases?.filter(i=>typeof i=="string"&&i.trim()!=="").map(i=>`lucide-${i}`)??[],f=[...e.name?[`lucide-${e.name}`]:[],...a],s=t.className?.split(" ").filter(Boolean)??[],k=t.includeDefaultClasses===!1?N(...s):N("lucide",...f,...s),g=t.absoluteStrokeWidth?Number(t.strokeWidth??c["stroke-width"])*Number(e.size??e.width??c.width)/Number(t.size??t.width??c.width):t.strokeWidth??c["stroke-width"];return["svg",{...Object.entries(c).reduce((i,[r,d])=>(i[o(r)]=d,i),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&x(t.size)&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&x(t.width)&&{[o("width")]:t.width},..."height"in t&&x(t.height)&&{[o("height")]:t.height},[o("stroke-width")]:g,...k&&{[o("class")]:k},[o("viewBox")]:`0 0 ${u} ${h}`,...t.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(i=>{const[r,d,w]=i,b=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...d}:d;return w?[r,b,w]:[r,b]})]}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function P(e,t={}){return j(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},R=l.createContext({}),_=()=>l.useContext(R),q=l.forwardRef(({color:e,size:t,width:n,height:o,strokeWidth:u,absoluteStrokeWidth:h,nonScalingStroke:a,className:f="",children:s,iconNode:k=[],icon:g={node:k,aliases:[],size:24},...C},i)=>{const{size:r=24,strokeWidth:d=2,absoluteStrokeWidth:w=!1,nonScalingStroke:b=!1,color:y="currentColor",className:S=""}=_()??{},z=!!s||D(C),[A,W,v=[]]=P(g,{color:e??y,width:n??t??r,height:o??t??r,strokeWidth:u??d,absoluteStrokeWidth:h??w,nonScalingStroke:a??b,className:N(S,f),hasA11yProp:z,attributes:C});return l.createElement(A,{ref:i,...W},[...v.map(([L,B])=>l.createElement(L,B)),...Array.isArray(s)?s:[s]])});/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function F(e,t=[],n=[]){const o=typeof e=="string"?E(e,t,n):e,u=l.forwardRef(({className:h,...a},f)=>l.createElement(q,{ref:f,icon:o,className:h,...a}));return o.name&&(u.displayName=$(o.name)),u}/**
 * @license lucide-react v1.55.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m={name:"coins",size:24,node:[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48",key:"bq4yh3"}],["path",{d:"M15 6h1v4",key:"11y1tn"}],["path",{d:"m6.134 14.768.866-.5 2 3.464",key:"17snzx"}],["circle",{cx:"16",cy:"8",r:"6",key:"14bfc9"}]]};m.node;const U=F(m);export{U as C,F as c};
