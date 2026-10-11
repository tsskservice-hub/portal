import{r as l,j as e}from"./index-8NflKPZb.js";import{H as Q}from"./header-RA7X_Gtc.js";import"./components-wZNuVW1A.js";import"./coins-BoK94HeF.js";function U(){const[b,f]=l.useState(!1);l.useEffect(()=>{const g=()=>{window.scrollY>300?f(!0):f(!1)};return window.addEventListener("scroll",g),()=>window.removeEventListener("scroll",g)},[]);const x=()=>{window.scrollTo({top:0,behavior:"smooth"})};return b?e.jsx("button",{onClick:x,className:"fixed bottom-6 left-6 z-40 bg-slate-800 hover:bg-slate-700 text-white p-3 rounded-full shadow-lg transition cursor-pointer text-xs font-bold",title:"ページトップへ戻る",children:"▲ Top"}):null}function oe(){const[b,f]=l.useState("400"),[x,g]=l.useState(""),[j,z]=l.useState(""),[N,A]=l.useState(""),[S,O]=l.useState(!1),[R,C]=l.useState(!1),[h,E]=l.useState(!1),[T,I]=l.useState([{role:"assistant",content:"Hello! I'm your Japanese Writing Tutor. Have any questions about your writing, kanji, or studies? Ask me anything!"}]),[k,F]=l.useState(""),[v,H]=l.useState(!1),[$,q]=l.useState("steady");l.useEffect(()=>{O(!0)},[]);const B=t=>["、","。","，","．","！","？","」","』","）","〕","］","｝","』","〉","》"].includes(t),D=t=>/^[0-9]$/.test(t),L=t=>{const s=Array.from(t),a=[];let n=0;for(;n<s.length;){const r=s[n];D(r)&&n+1<s.length&&D(s[n+1])?(a.push({type:"num",value:r+s[n+1]}),n+=2):(a.push({type:"char",value:r}),n+=1)}return a},y=()=>({type:"char",value:""}),M=(t,s=20)=>{const a=[...t];for(;a.length<s;)a.push(y());return a},V=S?(()=>{const s=b==="400"?20:10,a=N.split(`
`),n=[];for(const d of a){const o=L(d);if(o.length>0){const p=o[0];p.type==="char"&&p.value===" "||o.unshift({type:"char",value:" "})}let c=[],w=0;for(;w<o.length;){const p=o[w];if(c.length===20&&(n.push(M(c,20)),c=[]),c.length===0&&p.type==="char"&&B(p.value)&&n.length>0){const u=n[n.length-1];if(u.length>0){const m=u[u.length-1];m.type==="co"?u[u.length-1]={type:"co",main:m.main,sub:m.sub+p.value}:m.type==="char"&&(u[u.length-1]={type:"co",main:m.value,sub:p.value}),w++;continue}}c.push(p),w++}c.length>0&&n.push(M(c,20))}const r=[];let i=[];const W=Array.from({length:20},y);if(x){const d=L(x);for(let o=0;o<d.length&&3+o<20;o++)W[3+o]=d[o]}i.push(W);const J=Array.from({length:20},y);if(j){const d=L(j);let o=19-d.length;o<0&&(o=0);for(let c=0;c<d.length&&o+c<19;c++)J[o+c]=d[c]}i.push(J);let P=0;for(;P<n.length;)i.length>=s&&(r.push(i),i=[]),i.push(n[P]),P++;return i.length>0&&r.push(i),r.map(d=>{const o=[...d];for(;o.length<s;)o.push(Array.from({length:20},y));return o})})():[],G=N.replace(/\n/g,"").length,X=()=>{g(""),z(""),A("")},Y=()=>{typeof window<"u"&&window.print()},K=async t=>{if(t.preventDefault(),!k.trim()||v)return;const s=k.trim();F("");const a=[...T,{role:"user",content:s}];I(a),H(!0);try{const n=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:s,chatHistory:T,learningPace:$})});if(!n.ok)throw new Error("Failed to get response from AI tutor");const i=(await n.json()).reply||"I'm here to help you with your Japanese studies!";I([...a,{role:"assistant",content:i}])}catch(n){console.error(n),I([...a,{role:"assistant",content:"Sorry, I encountered an error. Please try asking again!"}])}finally{H(!1)}};return e.jsxs("div",{className:"genko-editor-root",children:[e.jsx("style",{children:`
        :root {
          --cell-size: 41px;
          --line-gap: 8px;
        }

        .genko-editor-root {
          font-family: sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f6f9;
          color: #333;
          min-height: 100vh;
          position: relative;
        }

        .genko-container {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .genko-editor-pane {
          flex: 1;
          min-width: 300px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .genko-preview-pane {
          flex: 1.5;
          min-width: 350px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          overflow-x: auto;
        }

        .genko-control-group {
          margin-bottom: 15px;
        }

        .genko-control-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 0.9rem;
        }

        .genko-control-group input[type="text"],
        .genko-control-group textarea,
        .genko-control-group select {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1rem;
        }

        .genko-control-group textarea {
          height: 150px;
          resize: vertical;
        }

        .genko-btn-container {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .genko-btn-container button {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        .genko-btn-print {
          background-color: #0066cc;
          color: #fff;
          flex: 1;
        }

        .genko-btn-print:hover {
          background-color: #0052a3;
        }

        .genko-btn-clear {
          background-color: #e0e0e0;
          color: #333;
        }

        .genko-btn-clear:hover {
          background-color: #d0d0d0;
        }

        .genko-stats {
          margin-top: 10px;
          font-size: 0.85rem;
          color: #555;
        }

        .genko-cta-box {
          margin-top: 25px;
          padding: 15px;
          background-color: #eef6ff;
          border: 1px solid #b6d4fe;
          border-radius: 6px;
        }

        .genko-cta-box h3 {
          margin-top: 0;
          font-size: 1rem;
          color: #004085;
        }

        .genko-cta-box p {
          font-size: 0.85rem;
          color: #333;
          margin-bottom: 10px;
        }

        .genko-cta-link {
          display: inline-block;
          font-weight: bold;
          color: #0066cc;
          text-decoration: underline;
        }

        .genko-sheet {
          background: #fff;
          border: 1px solid #ccc;
          padding: 30px;
          box-sizing: border-box;
          display: inline-block;
          min-width: 100%;
          margin-bottom: 20px;
        }

        .genko-grid {
          display: flex;
          flex-direction: column;
          gap: var(--line-gap);
        }

        .genko-row {
          display: flex;
          gap: 0;
        }

        .genko-cell {
          width: var(--cell-size);
          height: var(--cell-size);
          border: 1px solid #999;
          box-sizing: border-box;
          display: flex;
          align-items: flex-end;     
          justify-content: center;   
          padding-bottom: 2mm;        
          font-size: 1.35rem;         
          line-height: 1;
          position: relative;
          background-color: #fff;
        }

        .genko-cell::after {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 1px dotted #ffcccc;
          pointer-events: none;
        }

        .co-cell {
          justify-content: flex-end; 
          padding-right: 2px;
        }

        .co-wrapper {
          display: flex;
          align-items: flex-end;     
          font-size: 1.35rem;         
          line-height: 1;
          transform: translateX(3mm); 
        }

        .co-main {
          display: inline-block;
        }

        .co-sub {
          display: inline-block;
          font-size: 1.35rem;         
        }

        .num-cell {
          justify-content: center;
          align-items: flex-end;
          padding-bottom: 2mm;
        }

        .num-pair {
          display: inline-flex;
          font-size: 1.2rem;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        @page {
          size: B4 portrait;
          margin: 10mm;
        }

        @media print {
          body, .genko-editor-root {
            background: none !important;
            padding: 0 !important;
          }
          header,
          .genko-editor-pane,
          .genko-btn-container,
          .genko-cta-box,
          aside {
            display: none !important;
          }
          .genko-preview-pane {
            box-shadow: none !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .genko-sheet {
            border: none !important;
            margin: 0 !important;
            page-break-after: always;
          }
        }
      `}),e.jsx(Q,{}),e.jsxs("div",{className:"genko-container mt-6",children:[e.jsxs("div",{className:"genko-editor-pane",children:[e.jsxs("div",{className:"genko-control-group",children:[e.jsx("label",{htmlFor:"format",children:"用紙フォーマット"}),e.jsxs("select",{id:"format",value:b,onChange:t=>f(t.target.value),children:[e.jsx("option",{value:"400",children:"400字詰め（20字×20行）"}),e.jsx("option",{value:"200",children:"200字詰め（20字×10行）"})]})]}),e.jsxs("div",{className:"genko-control-group",children:[e.jsx("label",{htmlFor:"titleInput",children:"題名（タイトル）"}),e.jsx("input",{type:"text",id:"titleInput",placeholder:"例：日本のアニメについて",value:x,onChange:t=>g(t.target.value)})]}),e.jsxs("div",{className:"genko-control-group",children:[e.jsx("label",{htmlFor:"nameInput",children:"氏名"}),e.jsx("input",{type:"text",id:"nameInput",placeholder:"例：山田 太郎",value:j,onChange:t=>z(t.target.value)})]}),e.jsxs("div",{className:"genko-control-group",children:[e.jsx("label",{htmlFor:"textInput",children:"本文"}),e.jsx("textarea",{id:"textInput",placeholder:"ここに文を書いてください。",value:N,onChange:t=>A(t.target.value)})]}),e.jsxs("div",{className:"genko-stats",children:["文字数: ",G,"字"]}),e.jsxs("div",{className:"genko-btn-container",children:[e.jsx("button",{className:"genko-btn-print",onClick:Y,children:"印刷する / PDF保存"}),e.jsx("button",{className:"genko-btn-clear",onClick:X,children:"消す"})]}),e.jsxs("div",{className:"genko-cta-box",id:"vce-app",children:[e.jsx("h3",{children:"Ready for your Exam Writing?"}),e.jsx("p",{children:"Don't leave your marks to chance! Power up your writing prep with instant checks, grammar feedback, and scoring tips."}),e.jsx("a",{href:"#",className:"genko-cta-link",children:"Discover AI Writing Tutor →"})]})]}),e.jsx("div",{className:"genko-preview-pane",children:e.jsx("div",{children:S&&V.map((t,s)=>e.jsx("div",{className:"genko-sheet",children:e.jsx("div",{className:"genko-grid",children:t.map((a,n)=>e.jsx("div",{className:"genko-row",children:a.map((r,i)=>r.type==="co"?e.jsx("div",{className:"genko-cell co-cell",children:e.jsxs("div",{className:"co-wrapper",children:[e.jsx("span",{className:"co-main",children:r.main}),e.jsx("span",{className:"co-sub",children:r.sub})]})},i):r.type==="num"?e.jsx("div",{className:"genko-cell num-cell",children:e.jsx("span",{className:"num-pair",children:r.value})},i):r.type==="char"?e.jsx("div",{className:"genko-cell",children:r.value},i):e.jsx("div",{className:"genko-cell"},i))},n))})},s))})})]}),e.jsx(U,{}),e.jsx("aside",{"aria-label":"AI Tutor",className:"fixed bottom-6 right-6 z-50 flex flex-col items-end",children:R?e.jsxs("div",{className:`bg-white border-2 border-blue-300 rounded-2xl p-5 shadow-2xl transition-all duration-200 space-y-4 ${h?"w-[90vw] sm:w-[500px] md:w-[600px]":"w-80 sm:w-96"}`,children:[e.jsxs("div",{className:"flex items-center justify-between border-b pb-2",children:[e.jsxs("h3",{className:"text-sm font-bold text-blue-900 flex items-center gap-2 m-0",children:[e.jsx("span",{children:"🤖"})," Japanese Writing AI Tutor"]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{type:"button",onClick:()=>E(!h),className:"text-slate-500 hover:text-blue-700 text-xs font-bold px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 transition cursor-pointer",title:h?"元のサイズに戻す":"窓を大きく広げる",children:h?"🗗 元に戻す":"🗖 拡大"}),e.jsx("button",{type:"button",onClick:()=>{C(!1),E(!1)},className:"text-slate-400 hover:text-slate-600 text-xs font-bold px-2 py-1 rounded-md transition cursor-pointer",children:"✕ Close"})]})]}),e.jsx("p",{className:"text-xs text-slate-600 leading-relaxed",children:"Ask questions about your writing, kanji, or get study advice!"}),e.jsxs("div",{className:"bg-blue-50 border border-blue-200 rounded-xl p-2.5 flex items-center justify-between",children:[e.jsx("span",{className:"text-xs font-bold text-blue-900",children:"Learning Pace"}),e.jsx("div",{className:"inline-flex rounded-lg bg-white p-0.5 shadow-xs border border-blue-200",children:["steady","normal","accelerated"].map(t=>e.jsx("button",{type:"button",onClick:()=>q(t),className:`px-2.5 py-1 rounded-md text-[10px] font-bold capitalize transition cursor-pointer ${$===t?"bg-blue-600 text-white shadow-xs":"text-slate-600 hover:text-blue-700"}`,children:t},t))})]}),e.jsxs("div",{className:`bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-y-auto space-y-2.5 transition-all duration-200 ${h?"h-96":"h-44"}`,children:[T.map((t,s)=>e.jsx("div",{className:`flex flex-col ${t.role==="user"?"items-end":"items-start"}`,children:e.jsx("div",{className:`max-w-[90%] p-2.5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${t.role==="user"?"bg-blue-600 text-white rounded-br-xs":"bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs"}`,children:t.content})},s)),v&&e.jsx("div",{className:"text-xs text-slate-500 italic",children:"🤖 AI Tutor is thinking..."})]}),e.jsxs("form",{onSubmit:K,className:"flex gap-2",children:[e.jsx("input",{type:"text",value:k,onChange:t=>F(t.target.value),placeholder:"Ask AI tutor anything...",disabled:v,className:"flex-grow p-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"}),e.jsx("button",{type:"submit",disabled:v||!k.trim(),className:"px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 shrink-0",children:"Send"})]})]}):e.jsxs("button",{type:"button",onClick:()=>C(!0),className:"bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm",children:[e.jsx("span",{children:"🤖"}),e.jsx("span",{children:"AI Tutor"})]})})]})}export{oe as default};
