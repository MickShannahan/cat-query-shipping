import{R as v,i,m as g,c as _,a as e,o as s,b as y,d,e as o,w as k,f as a,T,C as x}from"./vendor.3943c63e.js";import{_ as C,P as D,l as b,A as l}from"./index.09aeff5c.js";const B={name:"Home",setup(){v();const r=i(!1),t=i("http");return g(()=>{window.addEventListener("keydown",n=>{n.ctrlKey&&n.key=="s"&&(n.preventDefault(),D.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:t,showTabs:r,lostShipmentLoading:_(()=>l.loading.lostShipment),account:_(()=>l.account),switchScreen(){b.log("switching"),t.value=t.value=="http"?"code":"http"}}}},L={class:"row no-overflow-x justify-content-center"},P={class:"col-md-10 col-lg-8 p-0 m-0"},j={class:"col-md-11 col-lg-9"};function H(r,t,n,c,N,V){const p=e("LostShipment"),m=e("Search"),h=e("CodeSearch"),u=e("ShipmentsThread"),S=e("Dialogue"),f=e("Docs"),w=e("Tour");return s(),y("div",L,[d("div",P,[o(p),o(T,{name:"flip"},{default:k(()=>[c.compScreen=="http"?(s(),a(m,{key:0,onSwitch:c.switchScreen},null,8,["onSwitch"])):(s(),a(h,{key:1,onSwitch:c.switchScreen},null,8,["onSwitch"]))]),_:1})]),d("div",j,[o(u)]),o(S),o(f),c.account.needsTour?(s(),a(w,{key:0})):x("",!0)])}var R=C(B,[["render",H],["__scopeId","data-v-0c9312c8"]]);export{R as default};