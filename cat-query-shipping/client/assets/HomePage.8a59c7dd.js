import{U as S,a as f,k as w,c,b as e,o as s,d as y,e as d,f as o,w as v,g as r,T,C as b}from"./vendor.3adca855.js";import{_ as k,P as x,l as C,A as t}from"./index.ac354aee.js";const D={name:"Home",setup(){S();const i=f(!1);return w(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-iso.png')",window.addEventListener("keydown",n=>{n.ctrlKey&&n.key=="s"&&(n.preventDefault(),x.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:c(()=>t.searchType),showTabs:i,lostShipmentLoading:c(()=>t.loading.lostShipment),account:c(()=>t.account),switchScreen(){C.log("switching"),t.searchType=t.searchType=="http"?"code":"http"}}}},B={class:"shipment-search-area no-overflow-x justify-content-center"},L={class:"computer p-0 m-0"},P={class:"printer"};function j(i,n,H,a,N,V){const p=e("LostShipment"),_=e("Search"),m=e("CodeSearch"),h=e("ShipmentsThread"),l=e("Dialogue"),u=e("Docs"),g=e("Tour");return s(),y("div",B,[d("div",L,[o(p),o(T,{name:"flip"},{default:v(()=>[a.compScreen=="http"?(s(),r(_,{key:0,onSwitch:a.switchScreen},null,8,["onSwitch"])):(s(),r(m,{key:1,onSwitch:a.switchScreen},null,8,["onSwitch"]))]),_:1})]),d("div",P,[o(h)]),o(l),o(u),a.account.needsTour?(s(),r(g,{key:0})):b("",!0)])}var I=k(D,[["render",j],["__scopeId","data-v-22db37aa"]]);export{I as default};