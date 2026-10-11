import{r as i,j as t}from"./index-8NflKPZb.js";import{u as f,a as y,b as x,c as g,_ as S,e as a,O as w,M as j,L as k,S as M}from"./components-iyMch4aB.js";/**
 * @remix-run/react v2.17.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function O({getKey:e,...c}){let{isSpaMode:p}=f(),r=y(),u=x();g({getKey:e,storageKey:l});let h=i.useMemo(()=>{if(!e)return null;let s=e(r,u);return s!==r.key?s:null},[]);if(p)return null;let m=((s,d)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(o){console.error(o),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},c,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${a(JSON.stringify(l))}, ${a(JSON.stringify(h))})`}}))}const R=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"}];function _({children:e}){return t.jsxs("html",{lang:"ja",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(j,{}),t.jsx(k,{})]}),t.jsxs("body",{children:[e,t.jsx(O,{}),t.jsx(M,{})]})]})}function b(){return t.jsx(w,{})}export{_ as Layout,b as default,R as links};
