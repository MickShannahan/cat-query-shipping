import{Z as f,a as b,s as w,c as a,b as e,o as c,d as y,e as i,f as o,w as v,g as r,T as C,n as T,q as k}from"./vendor.1c859275.js";import{_ as x,P as D,l as B,A as t}from"./index.42fa526f.js";const L={name:"Home",setup(){f();const l=b(!1);return w(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-iso.png')",window.addEventListener("keydown",s=>{s.ctrlKey&&s.key=="s"&&(s.preventDefault(),D.toast("Saving Union documents is stricly prohibited","warning","bottom"))})}),{compScreen:a(()=>t.searchType),showTabs:l,lostShipmentLoading:a(()=>t.loading.lostShipment),account:a(()=>t.account),hasCollectables:a(()=>t.collectables.length),switchScreen(){B.log("switching"),t.searchType=t.searchType=="http"?"code":"http"}}}},P={class:"shipment-search-area no-overflow-x justify-content-center"},j={class:"computer p-0 m-0"},H={class:"printer"};function N(l,s,V,n,A,E){const p=e("LostShipment"),_=e("Search"),d=e("CodeSearch"),m=e("Collectables"),h=e("ShipmentsThread"),u=e("Dialogue"),g=e("Docs"),S=e("Tour");return c(),y("div",P,[i("div",j,[o(p),o(C,{name:"flip"},{default:v(()=>[n.compScreen=="http"?(c(),r(_,{key:0,onSwitch:n.switchScreen},null,8,["onSwitch"])):(c(),r(d,{key:1,onSwitch:n.switchScreen},null,8,["onSwitch"]))]),_:1})]),o(m,{class:T(["collectable-area",{collectables:n.hasCollectables}])},null,8,["class"]),i("div",H,[o(h)]),o(u),o(g),n.account.needsTour?(c(),r(S,{key:0})):k("",!0)])}var z=x(L,[["render",N],["__scopeId","data-v-0ac1eb4a"]]);export{z as default};
