import{R as f,a as w,k as g,c as a,b as e,o as s,d as v,e as _,f as o,w as y,g as r,T,C as k}from"./vendor.40082dfa.js";import{_ as x,P as b,l as C,A as t}from"./index.31cf84fb.js";const D={name:"Home",setup(){f();const i=w(!1);return g(()=>{window.addEventListener("keydown",n=>{n.ctrlKey&&n.key=="s"&&(n.preventDefault(),b.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:a(()=>t.searchType),showTabs:i,lostShipmentLoading:a(()=>t.loading.lostShipment),account:a(()=>t.account),switchScreen(){C.log("switching"),t.searchType=t.searchType=="http"?"code":"http"}}}},B={class:"row no-overflow-x justify-content-center"},L={class:"col-md-10 col-lg-8 p-0 m-0"},P={class:"col-md-11 col-lg-9"};function j(i,n,H,c,N,V){const d=e("LostShipment"),p=e("Search"),l=e("CodeSearch"),m=e("ShipmentsThread"),h=e("Dialogue"),u=e("Docs"),S=e("Tour");return s(),v("div",B,[_("div",L,[o(d),o(T,{name:"flip"},{default:y(()=>[c.compScreen=="http"?(s(),r(p,{key:0,onSwitch:c.switchScreen},null,8,["onSwitch"])):(s(),r(l,{key:1,onSwitch:c.switchScreen},null,8,["onSwitch"]))]),_:1})]),_("div",P,[o(m)]),o(h),o(u),c.account.needsTour?(s(),r(S,{key:0})):k("",!0)])}var R=x(D,[["render",j],["__scopeId","data-v-24c5b49c"]]);export{R as default};
