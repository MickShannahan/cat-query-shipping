import{M as w,A as i,j as v,c as _,a as e,o as s,b as g,d as y,e as o,w as k,f as a,T,U as x}from"./vendor.81e22a6b.js";import{_ as b,P as C,l as D,A as p}from"./index.863f05e6.js";const j={name:"Home",setup(){w();const r=i(!1),t=i("http");return v(()=>{window.addEventListener("keydown",n=>{n.ctrlKey&&n.key=="s"&&(n.preventDefault(),C.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:t,showTabs:r,lostShipmentLoading:_(()=>p.loading.lostShipment),account:_(()=>p.account),switchScreen(){D.log("switching"),t.value=t.value=="http"?"code":"http"}}}},B={class:"row no-overflow-x justify-content-center"},L={class:"col-lg-10 p-0 m-0"};function P(r,t,n,c,A,H){const d=e("LostShipment"),l=e("Search"),m=e("CodeSearch"),h=e("ShipmentsThread"),u=e("Dialogue"),S=e("Docs"),f=e("Tour");return s(),g("div",B,[y("div",L,[o(d),o(T,{name:"flip"},{default:k(()=>[c.compScreen=="http"?(s(),a(l,{key:0,onSwitch:c.switchScreen},null,8,["onSwitch"])):(s(),a(m,{key:1,onSwitch:c.switchScreen},null,8,["onSwitch"]))]),_:1}),o(h)]),o(u),o(S),c.account.needsTour?(s(),a(f,{key:0})):x("",!0)])}var E=b(j,[["render",P],["__scopeId","data-v-6ef5d38c"]]);export{E as default};
