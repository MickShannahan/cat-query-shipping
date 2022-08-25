import{a as v,j as V,c as A,G as j,o as i,d as c,e,H as m,V as E,Q as F,t as d,i as l,F as C,l as D,D as G,E as I,a4 as N,n as B}from"./vendor.40082dfa.js";import{a as T,l as M,A as _,_ as q,b as R,P}from"./index.31cf84fb.js";class U{async getProfiles(){let o=await T.get("api/profiles");M.log(o.data),_.profiles=o.data}}const z=new U;const H={name:"Account",setup(){const a=v(!1),o=v({}),n=v("edit employee record");return V(()=>{z.getProfiles(),o.value=_.account}),{editMode:a,editable:o,editTip:n,account:A(()=>_.account),leaderboard:A(()=>_.profiles.filter(t=>t.credits>0).sort((t,u)=>u.credits-t.credits)),async editAccount(){try{a.value?(await R.editAccount(o.value),P.toast("Employee record updated","success"),a.value=!1,n.value="edit employee record"):(a.value=!0,n.value="save record")}catch(t){P.toast(t==null?void 0:t.error),M.error(t)}}}}},r=a=>(G("data-v-9e2f1530"),a=a(),I(),a),L={class:"container text-center"},Q={class:"row mt-5 about justify-content-center"},J={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},K={class:"row bg-warning rounded lighten-10 shadow p-3"},O={class:"col-4"},W=["src"],X={class:"col-8 text-start position-relative"},Y={key:0,class:"text-primary"},Z=r(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),$=r(()=>e("b",null,"Recovered Shipments:",-1)),ee={class:"text-primary"},te={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5"},oe={class:"row justif-content-center leader-border p-2 mx-3"},se=r(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),l("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),de={class:"col-6"},ae={class:"text-dark"},ie=r(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),ce=r(()=>e("b",null,"Recovered Shipments:",-1)),le={class:"text-primary"},re={class:"col-6 mb-5"},ne=["src"],me=N('<div class="row text-primary mt-3" data-v-9e2f1530><div class="col-4" data-v-9e2f1530>name</div><div class="col-3" data-v-9e2f1530><i class="mdi mdi-google-podcast mx-1" data-v-9e2f1530></i></div><div class="col-2" data-v-9e2f1530><i class="mdi mdi-package mx-1" data-v-9e2f1530></i></div><div class="col-3" data-v-9e2f1530><i class="mdi mdi-smart-card mx-1" data-v-9e2f1530></i></div></div>',1),_e={class:"row p-0"},ve={class:"leaderboard h-25"},ue={class:"col-12 p-0"},he={class:"col-4 list-border"},pe={class:"col-3 list-border"},fe={class:"col-2 list-border"},ge={class:"col-3 list-border"};function be(a,o,n,t,u,xe){var p,f,g,b,x,y,w,k;const h=j("tooltip");return i(),c("div",L,[e("div",Q,[e("div",J,[e("div",K,[e("div",O,[t.editMode?m((i(),c("input",{key:1,class:"form-control w-100",type:"text",placeholder:"Enter image url..","onUpdate:modelValue":o[0]||(o[0]=s=>t.editable.picture=s),required:""},null,512)),[[E,t.editable.picture]]):(i(),c("img",{key:0,class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,W))]),e("div",X,[m(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:o[1]||(o[1]=s=>t.editMode=!t.editMode)},null,512),[[F,t.editMode],[h,"cancel","auto"]]),m(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:o[2]||(o[2]=(...s)=>t.editAccount&&t.editAccount(...s))},null,512),[[h,"edit account","auto"]]),t.editMode?m((i(),c("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":o[3]||(o[3]=s=>t.editable.name=s),minlength:"5",maxlength:"15",required:""},null,512)),[[E,t.editable.name]]):(i(),c("h5",Y,d(t.account.name),1)),e("div",null,[Z,l(d(t.account.credits),1)]),e("div",null,[$,l(" "+d((p=t.account.shipmentsFound)==null?void 0:p.length),1)]),e("h4",null,[e("b",ee,d((f=t.account)==null?void 0:f.employeeGrade),1)])])])]),e("div",te,[e("div",oe,[se,e("div",de,[e("h5",ae,d((g=t.leaderboard[0])==null?void 0:g.name),1),e("div",null,[ie,l(d((b=t.leaderboard[0])==null?void 0:b.credits),1)]),e("div",null,[ce,l(" "+d((y=(x=t.leaderboard[0])==null?void 0:x.shipmentsFound)==null?void 0:y.length),1)]),e("h4",null,[e("b",le,d((w=t.leaderboard[0])==null?void 0:w.employeeGrade),1)])]),e("div",re,[e("img",{class:"img-fluid border border-primary rounded-1",src:(k=t.leaderboard[0])==null?void 0:k.picture,alt:""},null,8,ne)])]),me,e("div",_e,[e("div",ve,[e("div",ue,[(i(!0),c(C,null,D(t.leaderboard.slice(1),s=>{var S;return i(),c("div",{key:s.id,class:B(["row mt-2 px-2",{"text-warning":s.id==t.account.id,"text-dark":s.id!=t.account.id}])},[e("div",he,d(s.name),1),e("div",pe,d(s.credits),1),e("div",fe,d((S=s.shipmentsFound)==null?void 0:S.length),1),e("div",ge,d(s.employeeGrade),1)],2)}),128))])])])])])])}var ke=q(H,[["render",be],["__scopeId","data-v-9e2f1530"]]);export{ke as default};
