import{U as S,a as f,k as w,c as a,b as e,o as c,d as y,e as p,f as o,w as v,g as r,T,C as k}from"./vendor.29ac7a08.js";import{_ as b,P as x,l as C,A as t}from"./index.34476ef5.js";const D={name:"Home",setup(){S();const i=f(!1);return w(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-iso.png')",window.addEventListener("keydown",n=>{n.ctrlKey&&n.key=="s"&&(n.preventDefault(),x.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:a(()=>t.searchType),showTabs:i,lostShipmentLoading:a(()=>t.loading.lostShipment),account:a(()=>t.account),switchScreen(){C.log("switching"),t.searchType=t.searchType=="http"?"code":"http"}}}},B={class:"shipment-search-area no-overflow-x justify-content-center"},L={class:"computer p-0 m-0"},P={class:"printer"};function j(i,n,H,s,N,V){const d=e("LostShipment"),_=e("Search"),m=e("CodeSearch"),h=e("ShipmentsThread"),l=e("Dialogue"),u=e("Docs"),g=e("Tour");return c(),y("div",B,[p("div",L,[o(d),o(T,{name:"flip"},{default:v(()=>[s.compScreen=="http"?(c(),r(_,{key:0,onSwitch:s.switchScreen},null,8,["onSwitch"])):(c(),r(m,{key:1,onSwitch:s.switchScreen},null,8,["onSwitch"]))]),_:1})]),p("div",P,[o(h)]),o(l),o(u),s.account.needsTour?(c(),r(g,{key:0})):k("",!0)])}var I=b(D,[["render",j],["__scopeId","data-v-0e599448"]]);export{I as default};
