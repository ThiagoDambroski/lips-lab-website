import{r as ee,a as f,j as e,N as U,R as H}from"./index-BHe8wA5P.js";import{N as ne}from"./Navbar-C-gwKYlt.js";import{o as te}from"./booking-mxGQDG7L.js";import{l as ae}from"./libs-display-BtnFzK6p.js";import{l as re}from"./libs back-BnHRowPj.js";function se(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var A={},$;function ie(){if($)return A;$=1;function n(u){if(typeof window>"u")return;const m=document.createElement("style");return m.setAttribute("type","text/css"),m.innerHTML=u,document.head.appendChild(m),u}Object.defineProperty(A,"__esModule",{value:!0});var t=ee();function r(u){return u&&typeof u=="object"&&"default"in u?u:{default:u}}var l=r(t);n(`.rfm-marquee-container {
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  width: var(--width);
  transform: var(--transform);
}
.rfm-marquee-container:hover div {
  animation-play-state: var(--pause-on-hover);
}
.rfm-marquee-container:active div {
  animation-play-state: var(--pause-on-click);
}

.rfm-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.rfm-overlay::before, .rfm-overlay::after {
  background: linear-gradient(to right, var(--gradient-color), rgba(255, 255, 255, 0));
  content: "";
  height: 100%;
  position: absolute;
  width: var(--gradient-width);
  z-index: 2;
  pointer-events: none;
  touch-action: none;
}
.rfm-overlay::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
.rfm-overlay::before {
  left: 0;
  top: 0;
}

.rfm-marquee {
  flex: 0 0 auto;
  min-width: var(--min-width);
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  animation: scroll var(--duration) linear var(--delay) var(--iteration-count);
  animation-play-state: var(--play);
  animation-delay: var(--delay);
  animation-direction: var(--direction);
}
@keyframes scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.rfm-initial-child-container {
  flex: 0 0 auto;
  display: flex;
  min-width: auto;
  flex-direction: row;
  align-items: center;
}

.rfm-child {
  transform: var(--transform);
}`);const N=t.forwardRef(function({style:m={},className:g="",autoFill:i=!1,play:h=!0,pauseOnHover:x=!1,pauseOnClick:E=!1,direction:s="left",speed:a=50,delay:d=0,loop:o=0,gradient:S=!1,gradientColor:O="white",gradientWidth:R=200,onFinish:G,onCycleComplete:Z,onMount:k,children:y},W){const[_,X]=t.useState(0),[I,J]=t.useState(0),[P,T]=t.useState(1),[L,Q]=t.useState(!1),Y=t.useRef(null),p=W||Y,w=t.useRef(null),j=t.useCallback(()=>{if(w.current&&p.current){const c=p.current.getBoundingClientRect(),M=w.current.getBoundingClientRect();let b=c.width,v=M.width;(s==="up"||s==="down")&&(b=c.height,v=M.height),T(i&&b&&v&&v<b?Math.ceil(b/v):1),X(b),J(v)}},[i,p,s]);t.useEffect(()=>{if(L&&(j(),w.current&&p.current)){const c=new ResizeObserver(()=>j());return c.observe(p.current),c.observe(w.current),()=>{c&&c.disconnect()}}},[j,p,L]),t.useEffect(()=>{j()},[j,y]),t.useEffect(()=>{Q(!0)},[]),t.useEffect(()=>{typeof k=="function"&&k()},[]);const D=t.useMemo(()=>i?I*P/a:I<_?_/a:I/a,[i,_,I,P,a]),F=t.useMemo(()=>Object.assign(Object.assign({},m),{"--pause-on-hover":!h||x?"paused":"running","--pause-on-click":!h||x&&!E||E?"paused":"running","--width":s==="up"||s==="down"?"100vh":"100%","--transform":s==="up"?"rotate(-90deg)":s==="down"?"rotate(90deg)":"none"}),[m,h,x,E,s]),K=t.useMemo(()=>({"--gradient-color":O,"--gradient-width":typeof R=="number"?`${R}px`:R}),[O,R]),B=t.useMemo(()=>({"--play":h?"running":"paused","--direction":s==="left"?"normal":"reverse","--duration":`${D}s`,"--delay":`${d}s`,"--iteration-count":o?`${o}`:"infinite","--min-width":i?"auto":"100%"}),[h,s,D,d,o,i]),C=t.useMemo(()=>({"--transform":s==="up"?"rotate(90deg)":s==="down"?"rotate(-90deg)":"none"}),[s]),V=t.useCallback(c=>[...Array(Number.isFinite(c)&&c>=0?c:0)].map((M,b)=>l.default.createElement(t.Fragment,{key:b},t.Children.map(y,v=>l.default.createElement("div",{style:C,className:"rfm-child"},v)))),[C,y]);return L?l.default.createElement("div",{ref:p,style:F,className:"rfm-marquee-container "+g},S&&l.default.createElement("div",{style:K,className:"rfm-overlay"}),l.default.createElement("div",{className:"rfm-marquee",style:B,onAnimationIteration:Z,onAnimationEnd:G},l.default.createElement("div",{className:"rfm-initial-child-container",ref:w},t.Children.map(y,c=>l.default.createElement("div",{style:C,className:"rfm-child"},c))),V(P-1)),l.default.createElement("div",{className:"rfm-marquee",style:B},V(P))):null});return A.default=N,A}var oe=ie();const ce=se(oe),le=["VERMELHO","VIBRANTE","NUDE","EXPRESSIVO"];function q(n){return new Promise(t=>{const r=document.createElement("img");r.src=n,typeof r.decode=="function"?r.decode().then(()=>t()).catch(()=>t()):(r.onload=()=>t(),r.onerror=()=>t())})}function ue({slides:n,autoplayMs:t}){const[r,l]=f.useState(0),[N,u]=f.useState(!1),m=f.useRef(!1),g=f.useRef(null);f.useEffect(()=>{l(a=>n.length===0?0:Math.min(a,n.length-1))},[n.length]);const i=n[r],h=f.useMemo(()=>{const a=new Map;return n.forEach((d,o)=>a.set(d.activePill,o)),a},[n]);f.useEffect(()=>{if(!n.length)return;const a=n.flatMap(o=>[o.circlesImageSrc,o.collageImageSrc]),d=()=>{Array.from(new Set(a)).forEach(S=>q(S))};"requestIdleCallback"in window?window.requestIdleCallback(d):setTimeout(d,0)},[n]),f.useEffect(()=>{if(n.length<=1)return;const a=n[(r-1+n.length)%n.length],d=n[(r+1)%n.length];[a,d].forEach(o=>{q(o.circlesImageSrc),q(o.collageImageSrc)})},[r,n]);const x=()=>{m.current=!0,u(!0),g.current&&window.clearTimeout(g.current),g.current=window.setTimeout(()=>{m.current=!1,u(!1)},450)},E=a=>{m.current||a!==r&&(x(),l(a))},s=()=>{n.length<=1||m.current||(x(),l(a=>(a+1)%n.length))};return f.useEffect(()=>{if(!t||n.length<=1)return;const a=window.setInterval(()=>{s()},t);return()=>window.clearInterval(a)},[t,n.length]),f.useEffect(()=>()=>{g.current&&window.clearTimeout(g.current)},[]),!n.length||!i?null:e.jsx("section",{className:"tone-carousel",children:e.jsxs("div",{className:"tone-carousel__slide",style:{backgroundColor:i.bgColor},children:[e.jsxs("aside",{className:"tone-carousel__left",children:[e.jsxs("h2",{className:"tone-carousel__title",children:["UMA TONALIDADE ",e.jsx("br",{})," PARA CADA LADO TEU"]}),e.jsx("img",{className:"tone-carousel__circles",src:i.circlesImageSrc,alt:`Paleta de tons ${i.activePill.toLowerCase()} Lips Lab`,decoding:"async",loading:"eager"}),e.jsxs("p",{className:"tone-carousel__subtitle",children:["A cor é expressiva, tal como tu ",e.jsx("br",{}),"Define o tom e inspira-te para criar a tua ",e.jsx("br",{}),"tonalidade personalizada"]}),e.jsx("div",{className:"tone-carousel__pills",children:le.map(a=>{const d=h.get(a),o=i.activePill===a;return e.jsx("button",{type:"button",className:`tone-carousel__pill ${o?"is-active":""}`,onClick:()=>d!==void 0&&E(d),disabled:N,children:a},a)})})]}),e.jsx("div",{className:"tone-carousel__right",children:e.jsx("div",{className:`tone-carousel__collage ${N?"is-animating":""}`,children:e.jsx("img",{src:i.collageImageSrc,alt:`Inspiração visual para tons ${i.activePill.toLowerCase()}`,decoding:"async",loading:"eager",draggable:!1})})})]})})}const de="/lips-lab-website/assets/dani%20e%20friend-KtHaSlce.jpg";function me(){return e.jsx("section",{className:"home-marca-ex","aria-label":"Reserva da experiência Lips Lab",children:e.jsx("div",{style:{backgroundImage:`url(${de})`},children:e.jsx("button",{type:"button",onClick:te,children:"MARCA JÁ A TUA EXPERIÊNCIA"})})})}const fe="/lips-lab-website/assets/colorsVer-DRLq5NHs.svg",ge="/lips-lab-website/assets/colorsVib-Dg4aZy1Q.svg",he="/lips-lab-website/assets/colorsNude-CnMDhPwY.svg",pe="/lips-lab-website/assets/colorsExp-2MBNZFlH.svg",be="/lips-lab-website/assets/colageVer-bCJdWVCO.jpg",ve="/lips-lab-website/assets/collageVib-C9m-TS6i.png",xe="/lips-lab-website/assets/colageNude-CecoQE-W.svg",Ee="/lips-lab-website/assets/colageExp-DldGGYP0.png",z=[{id:1,title:"Escolhe a tua base",description:"Descobre as diferentes opções de acabamento e escolhe a que mais gostas."},{id:2,title:"Cria a tua cor ",description:"Trabalha com uma especialista em cores para encontrares a cor perfeita para ti."},{id:3,title:"Adiciona o aroma e essência",description:"Escolhe o aroma e a essência que dão uma personalidade única à tua criação."},{id:4,title:"Escolhe o aditivo",description:"Dá o toque final. São vários os aditivos que podes acrescentar à tua fórmula perfeita."},{id:5,title:"Personaliza a embalagem",description:"Grava o teu nome na embalagem e adiciona charms para tornar o teu produto único."}],we=[{id:"vermelho",bgColor:"#B93A2B",circlesImageSrc:fe,collageImageSrc:be,activePill:"VERMELHO"},{id:"vibrante",bgColor:"#C5556B",circlesImageSrc:ge,collageImageSrc:ve,activePill:"VIBRANTE"},{id:"nude",bgColor:"#D88A7C",circlesImageSrc:he,collageImageSrc:xe,activePill:"NUDE"},{id:"expressivo",bgColor:"#8B3E4E",circlesImageSrc:pe,collageImageSrc:Ee,activePill:"EXPRESSIVO"}];function je({number:n}){const t=z.find(r=>r.id===n)??{title:"Passo",description:""};return e.jsxs("article",{className:"libs-card",role:"listitem","aria-label":`Passo ${n}`,children:[e.jsxs("div",{className:"libs-badge",children:[e.jsx("img",{src:ae,alt:"","aria-hidden":"true",decoding:"async",loading:"lazy"}),e.jsx("span",{className:"libs-card__badge",children:n})]}),e.jsx("h3",{className:"libs-card__title",children:t.title}),e.jsx("p",{className:"libs-card__text",children:t.description})]})}function Ne(){return e.jsx("section",{className:"experiencie-libs",style:{backgroundImage:`url(${re})`},children:e.jsxs("div",{className:"experiencie-libs-intro",children:[e.jsx("h2",{children:"EXPERIÊNCIA LIPS LAB"}),e.jsx(U,{className:"home-step-link",to:H.experience,children:"passo a passo"}),e.jsx("div",{className:"experiencie-libs-cards-container",children:z.map(n=>e.jsx(je,{number:n.id},n.id))}),e.jsx("h3",{children:"feito por ti, para ti!"})]})})}const Re="/lips-lab-website/assets/home-end-backg-BwmzfegA.png";function ye(){return e.jsx("section",{className:"home-end",style:{backgroundImage:`url(${Re})`},children:e.jsxs("div",{children:[e.jsxs("h1",{children:["Não consegues ",e.jsx("br",{}),"vir à Lips Lab?"]}),e.jsx(U,{className:"home-end-button",to:H.onlineExperience,children:"experiência ONLINE!"})]})})}const Ie="/lips-lab-website/assets/ourProducts-BT3nyihm.svg";function Pe(){return e.jsxs("section",{className:"home-banner","aria-labelledby":"home-products-title",children:[e.jsx("h2",{id:"home-products-title",children:"OS NOSSOS PRODUTOS SÃO"}),e.jsx("p",{children:"feitos com ceras vegetais puras, ingredientes botânicos e minerais"}),e.jsx("img",{src:Ie,className:"home-banner-icons",alt:"Ícones dos principais benefícios dos produtos Lips Lab",loading:"lazy",decoding:"async"})]})}function Me(){return e.jsxs(e.Fragment,{children:[e.jsx(ne,{css:1}),e.jsxs("main",{id:"main-content",children:[e.jsx(ce,{gradient:!1,speed:100,pauseOnHover:!1,className:"rolling-card",children:"PELA PRIMEIRA VEZ EM PORTUGAL   PELA PRIMEIRA VEZ EM PORTUGAL   PELA PRIMEIRA VEZ EM PORTUGAL   PELA PRIMEIRA VEZ EM PORTUGAL   PELA PRIMEIRA VEZ EM PORTUGAL  "}),e.jsx(Ne,{}),e.jsx(Pe,{}),e.jsx(me,{}),e.jsx(ue,{slides:we}),e.jsx(ye,{})]})]})}export{Me as default};
