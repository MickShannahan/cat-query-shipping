import{a as g,l as x,A as l,_ as f}from"./index.3fa82519.js";import{j as w,c as p,o as r,b as n,d as s,z as o,f as d,F as y,B as S,v as k,x as j,a1 as A,C as F}from"./vendor.739bce03.js";class P{async getProfiles(){let c=await g.get("api/profiles");x.log(c.data),l.profiles=c.data}}const B=new P;const I={name:"Account",setup(){return w(()=>{B.getProfiles()}),{account:p(()=>l.account),leaderboard:p(()=>l.profiles.sort((t,c)=>c.credits-t.credits))}}},i=t=>(k("data-v-4b8aceb7"),t=t(),j(),t),C={class:"container text-center"},G={class:"row mt-5 about justify-content-center"},N={class:"col-4 me-5 p-0"},V={class:"row bg-warning rounded lighten-10 shadow p-3"},z={class:"col-4"},E=["src"],R={class:"col-8 text-start"},D={class:"text-primary"},L=i(()=>s("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),M=i(()=>s("b",null,"Recovered Shipments:",-1)),T={class:"text-primary"},q={class:"col-6 shadow bg-primary lighten-20 rounded p-3"},H={class:"row justif-content-center leader-border p-2 mx-3"},J=i(()=>s("h4",{class:"col-12 text-center"},[s("i",{class:"mdi mdi-cat mx-1"}),d("Employee of the Cycle"),s("i",{class:"mdi mdi-cat mx-1"})],-1)),K={class:"col-6"},O={class:"text-dark"},Q=i(()=>s("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),U=i(()=>s("b",null,"Recovered Shipments:",-1)),W={class:"text-primary"},X={class:"col-6"},Y=["src"],Z=A('<div class="row text-primary mt-3" data-v-4b8aceb7><div class="col-4" data-v-4b8aceb7>name</div><div class="col-3" data-v-4b8aceb7><i class="mdi mdi-google-podcast mx-1" data-v-4b8aceb7></i></div><div class="col-2" data-v-4b8aceb7><i class="mdi mdi-package mx-1" data-v-4b8aceb7></i></div><div class="col-3" data-v-4b8aceb7><i class="mdi mdi-smart-card mx-1" data-v-4b8aceb7></i></div></div>',1),$={class:"row leaderboard p-0"},ss={class:"col-12 p-0"},es={class:"col-4 list-border"},os={class:"col-3 list-border"},ts={class:"col-2 list-border"},as={class:"col-3 list-border"};function cs(t,c,ds,e,is,ls){var _,m,v,h,b,u;return r(),n("div",C,[s("div",G,[s("div",N,[s("div",V,[s("div",z,[s("img",{class:"img-fluid border-2 border-warningS rounded-1",src:e.account.picture,alt:""},null,8,E)]),s("div",R,[s("h5",D,o(e.account.name),1),s("div",null,[L,d(o(e.account.credits),1)]),s("div",null,[M,d(" "+o(e.account.shipmentsFound.length),1)]),s("h4",null,[s("b",T,o((_=e.account)==null?void 0:_.employeeGrade),1)])])])]),s("div",q,[s("div",H,[J,s("div",K,[s("h5",O,o((m=e.leaderboard[0])==null?void 0:m.name),1),s("div",null,[Q,d(o((v=e.leaderboard[0])==null?void 0:v.credits),1)]),s("div",null,[U,d(" "+o((h=e.leaderboard[0])==null?void 0:h.shipmentsFound.length),1)]),s("h4",null,[s("b",W,o((b=e.leaderboard[0])==null?void 0:b.employeeGrade),1)])]),s("div",X,[s("img",{class:"img-fluid border border-primary rounded-1",src:(u=e.leaderboard[0])==null?void 0:u.picture,alt:""},null,8,Y)])]),Z,s("div",$,[s("div",ss,[(r(!0),n(y,null,S(e.leaderboard.slice(1),a=>(r(),n("div",{key:a.id,class:F(["row mt-2 px-2",{"text-warning":a.id==e.account.id,"text-dark":a.id!=e.account.id}])},[s("div",es,o(a.name),1),s("div",os,o(a.credits),1),s("div",ts,o(a.shipmentsFound.length),1),s("div",as,o(a.employeeGrade),1)],2))),128))])])])])])}var _s=f(I,[["render",cs],["__scopeId","data-v-4b8aceb7"]]);export{_s as default};
