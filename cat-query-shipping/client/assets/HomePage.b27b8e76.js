import{M as f,A as _,j as v,c as a,a as o,o as s,b as g,d as T,e as t,w as y,f as r,T as k,U as x}from"./vendor.81e22a6b.js";import{_ as b,P as C,l as D,A as i}from"./index.66c5e19d.js";const j={name:"Home",setup(){f();const d=_(!1),n=_("http");return v(()=>{window.addEventListener("keydown",e=>{e.ctrlKey&&e.key=="s"&&(e.preventDefault(),C.toast("Saving Union documents is stricly prohibited","warning","bottom"))}),setTimeout(()=>loadTour.value=!0,1e3)}),{compScreen:n,showTabs:d,loadTour:a(()=>{var e;return(e=i.account)==null?void 0:e.needsTour}),lostShipmentLoading:a(()=>i.loading.lostShipment),account:a(()=>i.account),switchScreen(){D.log("switching"),n.value=n.value=="http"?"code":"http"}}}},B={class:"row no-overflow-x justify-content-center"},L={class:"col-lg-10 p-0 m-0"};function P(d,n,e,c,A,H){const l=o("LostShipment"),p=o("Search"),m=o("CodeSearch"),u=o("ShipmentsThread"),h=o("Dialogue"),S=o("Docs"),w=o("Tour");return s(),g("div",B,[T("div",L,[t(l),t(k,{name:"flip"},{default:y(()=>[c.compScreen=="http"?(s(),r(p,{key:0,onSwitch:c.switchScreen},null,8,["onSwitch"])):(s(),r(m,{key:1,onSwitch:c.switchScreen},null,8,["onSwitch"]))]),_:1}),t(u)]),t(h),t(S),c.loadTour?(s(),r(w,{key:0})):x("",!0)])}var E=b(j,[["render",P],["__scopeId","data-v-d4ec3750"]]);export{E as default};
