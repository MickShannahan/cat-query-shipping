import{a as _,j as C,c as A,b as E,G as j,o as c,d as i,e,g as F,H as v,Q as V,t as a,V as D,i as l,F as G,l as I,D as N,E as U,a4 as T,n as R}from"./vendor.af9417ea.js";import{a as q,l as M,A as m,_ as z,b as H,P}from"./index.91eae8ca.js";class L{async getProfiles(){let o=await q.get("api/profiles");M.log(o.data),m.profiles=o.data}}const Q=new L;const J={name:"Account",setup(){const d=_(!1),o=_({}),r=_("edit employee record");return C(()=>{Q.getProfiles(),o.value=m.account}),{editMode:d,editable:o,editTip:r,account:A(()=>m.account),leaderboard:A(()=>m.profiles.filter(t=>t.credits>0).sort((t,u)=>u.credits-t.credits)),async editAccount(){try{d.value?(await H.editAccount(o.value),P.toast("Employee record updated","success"),d.value=!1,r.value="edit employee record"):(d.value=!0,r.value="save record")}catch(t){P.toast(t==null?void 0:t.error),M.error(t)}}}}},n=d=>(N("data-v-29e7677c"),d=d(),U(),d),K={class:"container text-center"},O={class:"row mt-5 about justify-content-center"},W={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},X={class:"row bg-warning rounded lighten-10 shadow p-3"},Y={class:"col-4"},Z=["src"],$={class:"col-8 text-start position-relative"},ee={key:0,class:"text-primary"},te=n(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),oe=n(()=>e("b",null,"Recovered Shipments:",-1)),se={class:"text-primary"},ae={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5"},de={class:"row justif-content-center leader-border p-2 mx-3"},ce=n(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),l("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),ie={class:"col-6"},le={class:"text-dark"},ne=n(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),re=n(()=>e("b",null,"Recovered Shipments:",-1)),me={class:"text-primary"},_e={class:"col-6 mb-5"},ve=["src"],ue=T('<div class="row text-primary mt-3" data-v-29e7677c><div class="col-4" data-v-29e7677c>name</div><div class="col-3" data-v-29e7677c><i class="mdi mdi-google-podcast mx-1" data-v-29e7677c></i></div><div class="col-2" data-v-29e7677c><i class="mdi mdi-package mx-1" data-v-29e7677c></i></div><div class="col-3" data-v-29e7677c><i class="mdi mdi-smart-card mx-1" data-v-29e7677c></i></div></div>',1),pe={class:"row p-0"},he={class:"leaderboard h-25"},ge={class:"col-12 p-0"},be={class:"col-4 list-border"},xe={class:"col-3 list-border"},fe={class:"col-2 list-border"},we={class:"col-3 list-border"};function ye(d,o,r,t,u,ke){var h,g,b,x,f,w,y,k;const B=E("UploadButton"),p=j("tooltip");return c(),i("div",K,[e("div",O,[e("div",W,[e("div",X,[e("div",Y,[t.editMode?(c(),F(B,{key:1,onUploadComplete:o[0]||(o[0]=s=>t.editable.picture=s.url),options:{class:"w-100 btn btn-white form-control px-3 py-5",spinner:"\u{1F431}"}})):(c(),i("img",{key:0,class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,Z))]),e("div",$,[v(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:o[1]||(o[1]=s=>t.editMode=!t.editMode)},null,512),[[V,t.editMode],[p,"cancel","auto"]]),v(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:o[2]||(o[2]=(...s)=>t.editAccount&&t.editAccount(...s))},null,512),[[p,"edit account","auto"]]),t.editMode?v((c(),i("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":o[3]||(o[3]=s=>t.editable.name=s),minlength:"5",maxlength:"15",required:""},null,512)),[[D,t.editable.name]]):(c(),i("h5",ee,a(t.account.name),1)),e("div",null,[te,l(a(t.account.credits),1)]),e("div",null,[oe,l(" "+a((h=t.account.shipmentsFound)==null?void 0:h.length),1)]),e("h4",null,[e("b",se,a((g=t.account)==null?void 0:g.employeeGrade),1)])])])]),e("div",ae,[e("div",de,[ce,e("div",ie,[e("h5",le,a((b=t.leaderboard[0])==null?void 0:b.name),1),e("div",null,[ne,l(a((x=t.leaderboard[0])==null?void 0:x.credits),1)]),e("div",null,[re,l(" "+a((w=(f=t.leaderboard[0])==null?void 0:f.shipmentsFound)==null?void 0:w.length),1)]),e("h4",null,[e("b",me,a((y=t.leaderboard[0])==null?void 0:y.employeeGrade),1)])]),e("div",_e,[e("img",{class:"img-fluid border border-primary rounded-1",src:(k=t.leaderboard[0])==null?void 0:k.picture,alt:""},null,8,ve)])]),ue,e("div",pe,[e("div",he,[e("div",ge,[(c(!0),i(G,null,I(t.leaderboard.slice(1),s=>{var S;return c(),i("div",{key:s.id,class:R(["row mt-2 px-2",{"text-warning":s.id==t.account.id,"text-dark":s.id!=t.account.id}])},[e("div",be,a(s.name),1),e("div",xe,a(s.credits),1),e("div",fe,a((S=s.shipmentsFound)==null?void 0:S.length),1),e("div",we,a(s.employeeGrade),1)],2)}),128))])])])])])])}var Me=z(J,[["render",ye],["__scopeId","data-v-29e7677c"]]);export{Me as default};
