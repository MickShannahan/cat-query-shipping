import{L as v,A as d,j as w,c as p,a as o,o as a,g as i,w as r,d as l,b,e as t,T as y,R as k,a1 as x,v as C,x as D}from"./vendor.7b69def8.js";import{_ as L,P as T,l as j,A as _}from"./index.9e54a207.js";const B={name:"Home",setup(){v();const e=d(!1),n=d("http");return w(()=>{window.addEventListener("keydown",s=>{s.ctrlKey&&s.key=="s"&&(s.preventDefault(),T.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:n,showTabs:e,lostShipmentLoading:p(()=>_.loading.lostShipment),account:p(()=>_.account),switchScreen(){j.log("switching"),n.value=n.value=="http"?"code":"http"}}}},I=e=>(C("data-v-bb14b11e"),e=e(),D(),e),P={class:"row no-overflow-x justify-content-center"},A={key:0,class:"col-lg-10 p-0 m-0"},H=I(()=>l("div",{class:"bg-light p-2"},"loading",-1));function N(e,n,s,c,V,E){const h=o("LostShipment"),m=o("Search"),u=o("CodeSearch"),S=o("ShipmentsThread"),f=o("Dialogue"),g=o("Docs");return a(),i(x,null,{default:r(()=>[l("div",P,[c.account.id?(a(),b("div",A,[t(h),t(y,{name:"flip"},{default:r(()=>[c.compScreen=="http"?(a(),i(m,{key:0,onSwitch:c.switchScreen},null,8,["onSwitch"])):(a(),i(u,{key:1,onSwitch:c.switchScreen},null,8,["onSwitch"]))]),_:1}),t(S)])):k("",!0),t(f),t(g)])]),fallback:r(()=>[H]),_:1})}var M=L(B,[["render",N],["__scopeId","data-v-bb14b11e"]]);export{M as default};