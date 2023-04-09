import{a as p,s as V,A as U,c as h,b as j,v as D,o as i,d as r,e,g as L,x as u,Z as R,t as d,a0 as q,i as m,f as z,F as E,j as F,p as Z,m as H,ab as J,n as K}from"./vendor.3df41904.js";import{a as G,l as g,A as l,_ as O,b as I,P as b}from"./index.09a2bcea.js";class Q{async getProfiles(){let a=await G.get("api/profiles");g.log(a.data),l.profiles=a.data,this.getLeaderAwards(l.profiles[0].id)}async getLeaderAwards(a){l.leaderAwards=[];const n=await G.get(`api/profiles/${a}/awards`);l.leaderAwards=n.data}}const W=new Q;const X={name:"Account",setup(){const c=p(!1),a=p({}),n=p("edit employee record");V(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')",t()}),U(()=>{W.getProfiles(),a.value=l.account});async function t(){try{I.getAwards()}catch(s){g.error(s),b.error(s)}}return{editMode:c,editable:a,editTip:n,account:h(()=>l.account),leaderboard:h(()=>l.profiles.filter(s=>s.credits>0).sort((s,w)=>w.totalCredits-s.totalCredits)),leaderAwards:h(()=>l.leaderAwards.filter(s=>s.count>0)),async editAccount(){try{c.value?(await I.editAccount(a.value),b.toast("Employee record updated","success"),c.value=!1,n.value="edit employee record"):(c.value=!0,n.value="save record")}catch(s){b.toast(s==null?void 0:s.error),g.error(s)}}}}},_=c=>(Z("data-v-009ea098"),c=c(),H(),c),Y={class:"container text-center"},$={class:"row mt-5 about justify-content-center"},ee={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},te={class:"row bg-warning rounded lighten-10 shadow p-3"},oe={class:"col-4"},ae=["src"],se={class:"col-8 text-start position-relative"},de={key:0,class:"text-primary"},ce=_(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),ie=_(()=>e("b",null,"Recovered Shipments:",-1)),re={class:"text-primary"},le={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5"},ne={class:"row justif-content-center leader-border p-2 mx-3"},me=_(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),m("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),_e={class:"col-6"},ue={class:"text-dark"},ve=_(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),pe=_(()=>e("b",null,"Recovered Shipments:",-1)),he={class:"text-primary"},ge={class:"d-flex flex-wrap"},be={class:"award-icon m-1"},we=["src"],fe={class:"col-6 mb-5"},xe=["src"],ye=J('<section class="row text-primary mt-3" data-v-009ea098><div class="col-4" data-v-009ea098>name</div><div class="col-3" data-v-009ea098><i class="mdi mdi-google-podcast mx-1" data-v-009ea098></i></div><div class="col-2" data-v-009ea098><i class="mdi mdi-package mx-1" data-v-009ea098></i></div><div class="col-3" data-v-009ea098><i class="mdi mdi-smart-card mx-1" data-v-009ea098></i></div></section>',1),Ae={class:"row p-0"},ke={class:"leaderboard h-25"},Se={class:"col-12 p-0"},Ce={class:"col-4 list-border"},Me={class:"col-3 list-border"},Pe={class:"col-2 list-border"},Be={class:"col-3 list-border"};function je(c,a,n,t,s,w){var f,x,y,A,k,S,C,M,P;const N=j("UploadButton"),T=j("AwardsThread"),v=D("tooltip");return i(),r("div",Y,[e("div",$,[e("div",ee,[e("div",te,[e("div",oe,[t.editMode?(i(),L(N,{key:1,onUploadComplete:a[0]||(a[0]=o=>t.editable.picture=o.url),options:{class:"w-100 btn btn-white form-control px-3 py-5",spinner:"\u{1F431}"}})):(i(),r("img",{key:0,class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,ae))]),e("div",se,[u(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:a[1]||(a[1]=o=>t.editMode=!t.editMode)},null,512),[[R,t.editMode],[v,"cancel","auto"]]),u(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:a[2]||(a[2]=(...o)=>t.editAccount&&t.editAccount(...o))},null,512),[[v,"edit account","auto"]]),t.editMode?u((i(),r("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":a[3]||(a[3]=o=>t.editable.name=o),minlength:"5",maxlength:"15",required:""},null,512)),[[q,t.editable.name]]):(i(),r("h5",de,d(t.account.name),1)),e("div",null,[ce,m(d(t.account.credits),1)]),e("div",null,[ie,m(" "+d((f=t.account.shipmentsFound)==null?void 0:f.length),1)]),e("h4",null,[e("b",re,d((x=t.account)==null?void 0:x.employeeGrade),1)])])]),z(T)]),e("div",le,[e("section",ne,[me,e("div",_e,[e("h5",ue,d((y=t.leaderboard[0])==null?void 0:y.name),1),e("div",null,[ve,m(d((A=t.leaderboard[0])==null?void 0:A.credits),1)]),e("div",null,[pe,m(" "+d((S=(k=t.leaderboard[0])==null?void 0:k.shipmentsFound)==null?void 0:S.length),1)]),e("h4",null,[e("b",he,d(((C=t.leaderboard[0])==null?void 0:C.topGrade)||((M=t.leaderboard[0])==null?void 0:M.employeeGrade)),1)]),e("div",ge,[(i(!0),r(E,null,F(t.leaderAwards,o=>u((i(),r("div",be,[e("img",{src:o.img,alt:""},null,8,we)],512)),[[v,`${o.name} ${o.count>1?o.count:""}`,"bottom"]])),256))])]),e("div",fe,[e("img",{class:"img-fluid border border-primary rounded-1",src:(P=t.leaderboard[0])==null?void 0:P.picture,alt:""},null,8,xe)])]),ye,e("section",Ae,[e("div",ke,[e("div",Se,[(i(!0),r(E,null,F(t.leaderboard.slice(1),o=>{var B;return i(),r("div",{key:o.id,class:K(["row mt-2 px-2",{"text-warning":o.id==t.account.id,"text-dark":o.id!=t.account.id}])},[e("div",Ce,d(o.name),1),e("div",Me,d(o.totalCredits),1),e("div",Pe,d((B=o.shipmentsFound)==null?void 0:B.length),1),e("div",Be,d(o.topGrade||o.employeeGrade),1)],2)}),128))])])])])])])}var Ge=O(X,[["render",je],["__scopeId","data-v-009ea098"]]);export{Ge as default};
