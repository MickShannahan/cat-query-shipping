import{A as v,y as P,c as k,k as E,o as c,b as i,d as e,l as m,Q as S,D as C,z as s,h as l,F,B as V,v as j,x as B,a2 as D,C as I}from"./vendor.fb507f2e.js";import{a as N,l as A,A as _,_ as T,b as G,P as M}from"./index.e1298ffa.js";class q{async getProfiles(){let a=await N.get("api/profiles");A.log(a.data),_.profiles=a.data}}const z=new q;const R={name:"Account",setup(){const d=v(!1),a=v({}),n=v("edit employee record");return P(()=>{z.getProfiles(),a.value=_.account}),{editMode:d,editable:a,editTip:n,account:k(()=>_.account),leaderboard:k(()=>_.profiles.sort((t,u)=>u.credits-t.credits)),async editAccount(){try{d.value?(await G.editAccount(a.value),M.toast("Employee record updated","success"),d.value=!1,n.value="edit employee record"):(d.value=!0,n.value="save record")}catch(t){M.toast(t==null?void 0:t.error),A.error(t)}}}}},r=d=>(j("data-v-5a0ac204"),d=d(),B(),d),U={class:"container text-center"},L={class:"row mt-5 about justify-content-center"},Q={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},H={class:"row bg-warning rounded lighten-10 shadow p-3"},J={class:"col-4"},K=["src"],O={class:"col-8 text-start position-relative"},W={key:0,class:"text-primary"},X=r(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),Y=r(()=>e("b",null,"Recovered Shipments:",-1)),Z={class:"text-primary"},$={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3"},ee={class:"row justif-content-center leader-border p-2 mx-3"},te=r(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),l("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),ae={class:"col-6"},oe={class:"text-dark"},se=r(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),de=r(()=>e("b",null,"Recovered Shipments:",-1)),ce={class:"text-primary"},ie={class:"col-6"},le=["src"],re=D('<div class="row text-primary mt-3" data-v-5a0ac204><div class="col-4" data-v-5a0ac204>name</div><div class="col-3" data-v-5a0ac204><i class="mdi mdi-google-podcast mx-1" data-v-5a0ac204></i></div><div class="col-2" data-v-5a0ac204><i class="mdi mdi-package mx-1" data-v-5a0ac204></i></div><div class="col-3" data-v-5a0ac204><i class="mdi mdi-smart-card mx-1" data-v-5a0ac204></i></div></div>',1),ne={class:"row leaderboard p-0"},me={class:"col-12 p-0"},_e={class:"col-4 list-border"},ve={class:"col-3 list-border"},ue={class:"col-2 list-border"},pe={class:"col-3 list-border"};function he(d,a,n,t,u,ge){var h,g,b,x,f,y,w;const p=E("tooltip");return c(),i("div",U,[e("div",L,[e("div",Q,[e("div",H,[e("div",J,[t.editMode?m((c(),i("input",{key:1,class:"form-control w-100",type:"text",placeholder:"Enter image url..","onUpdate:modelValue":a[0]||(a[0]=o=>t.editable.picture=o),required:""},null,512)),[[S,t.editable.picture]]):(c(),i("img",{key:0,class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,K))]),e("div",O,[m(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:a[1]||(a[1]=o=>t.editMode=!t.editMode)},null,512),[[C,t.editMode],[p,"cancel","auto"]]),m(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:a[2]||(a[2]=(...o)=>t.editAccount&&t.editAccount(...o))},null,512),[[p,t.editTip,"auto"]]),t.editMode?m((c(),i("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":a[3]||(a[3]=o=>t.editable.name=o),minlength:"5",maxlength:"15",required:""},null,512)),[[S,t.editable.name]]):(c(),i("h5",W,s(t.account.name),1)),e("div",null,[X,l(s(t.account.credits),1)]),e("div",null,[Y,l(" "+s((h=t.account.shipmentsFound)==null?void 0:h.length),1)]),e("h4",null,[e("b",Z,s((g=t.account)==null?void 0:g.employeeGrade),1)])])])]),e("div",$,[e("div",ee,[te,e("div",ae,[e("h5",oe,s((b=t.leaderboard[0])==null?void 0:b.name),1),e("div",null,[se,l(s((x=t.leaderboard[0])==null?void 0:x.credits),1)]),e("div",null,[de,l(" "+s((f=t.leaderboard[0])==null?void 0:f.shipmentsFound.length),1)]),e("h4",null,[e("b",ce,s((y=t.leaderboard[0])==null?void 0:y.employeeGrade),1)])]),e("div",ie,[e("img",{class:"img-fluid border border-primary rounded-1",src:(w=t.leaderboard[0])==null?void 0:w.picture,alt:""},null,8,le)])]),re,e("div",ne,[e("div",me,[(c(!0),i(F,null,V(t.leaderboard.slice(1),o=>(c(),i("div",{key:o.id,class:I(["row mt-2 px-2",{"text-warning":o.id==t.account.id,"text-dark":o.id!=t.account.id}])},[e("div",_e,s(o.name),1),e("div",ve,s(o.credits),1),e("div",ue,s(o.shipmentsFound.length),1),e("div",pe,s(o.employeeGrade),1)],2))),128))])])])])])}var fe=T(R,[["render",he],["__scopeId","data-v-5a0ac204"]]);export{fe as default};