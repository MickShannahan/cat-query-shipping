import{a as _,s as j,A as E,c as C,b as F,v as G,o as c,d as i,e,g as I,x as v,X as N,t as s,$ as U,i as l,F as V,j as D,p as T,m as R,a9 as q,n as z}from"./vendor.d42da21d.js";import{a as L,l as M,A as m,_ as X,b as H,P}from"./index.7ebf2df5.js";class J{async getProfiles(){let o=await L.get("api/profiles");M.log(o.data),m.profiles=o.data}}const K=new J;const O={name:"Account",setup(){const a=_(!1),o=_({}),r=_("edit employee record");return j(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')"}),E(()=>{K.getProfiles(),o.value=m.account}),{editMode:a,editable:o,editTip:r,account:C(()=>m.account),leaderboard:C(()=>m.profiles.filter(t=>t.credits>0).sort((t,u)=>u.totalCredits-t.totalCredits)),async editAccount(){try{a.value?(await H.editAccount(o.value),P.toast("Employee record updated","success"),a.value=!1,r.value="edit employee record"):(a.value=!0,r.value="save record")}catch(t){P.toast(t==null?void 0:t.error),M.error(t)}}}}},n=a=>(T("data-v-1ccd8d12"),a=a(),R(),a),Q={class:"container text-center"},W={class:"row mt-5 about justify-content-center"},Y={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},Z={class:"row bg-warning rounded lighten-10 shadow p-3"},$={class:"col-4"},ee=["src"],te={class:"col-8 text-start position-relative"},oe={key:0,class:"text-primary"},de=n(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),se=n(()=>e("b",null,"Recovered Shipments:",-1)),ae={class:"text-primary"},ce={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5"},ie={class:"row justif-content-center leader-border p-2 mx-3"},le=n(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),l("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),ne={class:"col-6"},re={class:"text-dark"},me=n(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),_e=n(()=>e("b",null,"Recovered Shipments:",-1)),ve={class:"text-primary"},ue={class:"col-6 mb-5"},pe=["src"],he=q('<div class="row text-primary mt-3" data-v-1ccd8d12><div class="col-4" data-v-1ccd8d12>name</div><div class="col-3" data-v-1ccd8d12><i class="mdi mdi-google-podcast mx-1" data-v-1ccd8d12></i></div><div class="col-2" data-v-1ccd8d12><i class="mdi mdi-package mx-1" data-v-1ccd8d12></i></div><div class="col-3" data-v-1ccd8d12><i class="mdi mdi-smart-card mx-1" data-v-1ccd8d12></i></div></div>',1),ge={class:"row p-0"},be={class:"leaderboard h-25"},xe={class:"col-12 p-0"},fe={class:"col-4 list-border"},ye={class:"col-3 list-border"},we={class:"col-2 list-border"},ke={class:"col-3 list-border"};function Se(a,o,r,t,u,Ae){var h,g,b,x,f,y,w,k,S;const B=F("UploadButton"),p=G("tooltip");return c(),i("div",Q,[e("div",W,[e("div",Y,[e("div",Z,[e("div",$,[t.editMode?(c(),I(B,{key:1,onUploadComplete:o[0]||(o[0]=d=>t.editable.picture=d.url),options:{class:"w-100 btn btn-white form-control px-3 py-5",spinner:"\u{1F431}"}})):(c(),i("img",{key:0,class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,ee))]),e("div",te,[v(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:o[1]||(o[1]=d=>t.editMode=!t.editMode)},null,512),[[N,t.editMode],[p,"cancel","auto"]]),v(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:o[2]||(o[2]=(...d)=>t.editAccount&&t.editAccount(...d))},null,512),[[p,"edit account","auto"]]),t.editMode?v((c(),i("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":o[3]||(o[3]=d=>t.editable.name=d),minlength:"5",maxlength:"15",required:""},null,512)),[[U,t.editable.name]]):(c(),i("h5",oe,s(t.account.name),1)),e("div",null,[de,l(s(t.account.credits),1)]),e("div",null,[se,l(" "+s((h=t.account.shipmentsFound)==null?void 0:h.length),1)]),e("h4",null,[e("b",ae,s((g=t.account)==null?void 0:g.employeeGrade),1)])])])]),e("div",ce,[e("div",ie,[le,e("div",ne,[e("h5",re,s((b=t.leaderboard[0])==null?void 0:b.name),1),e("div",null,[me,l(s((x=t.leaderboard[0])==null?void 0:x.credits),1)]),e("div",null,[_e,l(" "+s((y=(f=t.leaderboard[0])==null?void 0:f.shipmentsFound)==null?void 0:y.length),1)]),e("h4",null,[e("b",ve,s(((w=t.leaderboard[0])==null?void 0:w.topGrade)||((k=t.leaderboard[0])==null?void 0:k.employeeGrade)),1)])]),e("div",ue,[e("img",{class:"img-fluid border border-primary rounded-1",src:(S=t.leaderboard[0])==null?void 0:S.picture,alt:""},null,8,pe)])]),he,e("div",ge,[e("div",be,[e("div",xe,[(c(!0),i(V,null,D(t.leaderboard.slice(1),d=>{var A;return c(),i("div",{key:d.id,class:z(["row mt-2 px-2",{"text-warning":d.id==t.account.id,"text-dark":d.id!=t.account.id}])},[e("div",fe,s(d.name),1),e("div",ye,s(d.totalCredits),1),e("div",we,s((A=d.shipmentsFound)==null?void 0:A.length),1),e("div",ke,s(d.topGrade||d.employeeGrade),1)],2)}),128))])])])])])])}var Pe=X(O,[["render",Se],["__scopeId","data-v-1ccd8d12"]]);export{Pe as default};
