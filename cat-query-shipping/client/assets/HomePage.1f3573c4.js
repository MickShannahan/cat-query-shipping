import{v as i,s as b,c as r,a as o,o as c,b as l,e as n,w as m,B as k,C as y,T as d,d as L,g as p,P as x}from"./vendor.14227bfd.js";import{_ as C,P as D,s as N,l as B,A as h}from"./index.33c9c957.js";const P={name:"Home",setup(){const a=i(!1),t=i("http");return b(()=>{window.addEventListener("keydown",s=>{s.ctrlKey&&s.key=="s"&&(s.preventDefault(),D.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{getNewLostShipment(){N.getLostShipment()},compScreen:t,showTabs:a,lostShipmentLoading:r(()=>h.loading.lostShipment),account:r(()=>h.account),switchScreen(){B.log("switching"),t.value=t.value=="http"?"code":"http"}}}},T={class:"row no-overflow-x justify-content-center"},j={key:0,class:"col-lg-10 p-0 m-0"};function H(a,t,s,e,V,A){const _=o("LostShipment"),S=o("Search"),w=o("CodeSearch"),g=o("ShipmentsThread"),u=o("Dialogue"),v=o("Docs");return c(),l("div",T,[e.account.id?(c(),l("div",j,[n(d,{name:"lost"},{default:m(()=>[k(n(_,null,null,512),[[y,!e.lostShipmentLoading]])]),_:1}),L("button",{class:"w-50 mb-2 btn btn-light btn-block",onClick:t[0]||(t[0]=(...f)=>e.getNewLostShipment&&e.getNewLostShipment(...f))}," get new lost shipment "),n(d,{name:"flip"},{default:m(()=>[e.compScreen=="http"?(c(),p(S,{key:0,onSwitch:e.switchScreen},null,8,["onSwitch"])):(c(),p(w,{key:1,onSwitch:e.switchScreen},null,8,["onSwitch"]))]),_:1}),n(g)])):x("",!0),n(u),n(v)])}var K=C(P,[["render",H],["__scopeId","data-v-65ddc694"]]);export{K as default};
