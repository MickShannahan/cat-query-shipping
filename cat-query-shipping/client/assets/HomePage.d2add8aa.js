import{u as e,q as t,c as n,a as s,b as o,d as a,e as i,w as c,T as l,o as r,A as d,B as h,g as m,O as u}from"./editor.worker.001edd06.js";import{_ as p,P as w,s as S,l as f,A as g}from"./index.8e36d9e3.js";const v={class:"no-overflow-x flex-grow-1 d-flex flex-column align-items-center justify-content-center"},b={class:"container-fluid"},y={class:"row justify-content-center"},k={class:"col-lg-10"};var L=p({name:"Home",setup(){const s=e("http"),o=e(!1);return t((()=>{window.addEventListener("keydown",(e=>{e.ctrlKey&&"s"==e.key&&(e.preventDefault(),w.toast("Saving Union documents is stricly prohibited","warning","bottom"))})),o.value=!0})),{getNewLostShipment(){S.getLostShipment()},compScreen:s,showThread:o,lostShipmentLoading:n((()=>g.loading.lostShipment)),account:n((()=>g.account)),switchScreen(){f.log("switching"),s.value="http"==s.value?"code":"http"}}}},[["render",function(e,t,n,p,w,S){const f=s("LostShipment"),g=s("Search"),L=s("CodeSearch"),x=s("ShipmentsThread"),_=s("Docs");return r(),o("div",v,[a("div",b,[a("div",y,[a("div",k,[i(l,{name:"lost"},{default:c((()=>[d(i(f,null,null,512),[[h,!p.lostShipmentLoading]])])),_:1}),a("button",{class:"w-50 mb-2 btn btn-light btn-block",onClick:t[0]||(t[0]=(...e)=>p.getNewLostShipment&&p.getNewLostShipment(...e))}," get new lost shipment "),i(l,{name:"flip"},{default:c((()=>["http"==p.compScreen?(r(),m(g,{key:0,onSwitch:p.switchScreen},null,8,["onSwitch"])):(r(),m(L,{key:1,onSwitch:p.switchScreen},null,8,["onSwitch"]))])),_:1}),i(l,{name:"thread"},{default:c((()=>[p.showThread?(r(),m(x,{key:0})):u("",!0)])),_:1}),i(_)])])])])}],["__scopeId","data-v-33eff840"]]);export default L;
