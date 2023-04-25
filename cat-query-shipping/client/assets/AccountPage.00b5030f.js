var W=Object.defineProperty;var z=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var R=(l,o,c)=>o in l?W(l,o,{enumerable:!0,configurable:!0,writable:!0,value:c}):l[o]=c,O=(l,o)=>{for(var c in o||(o={}))X.call(o,c)&&R(l,c,o[c]);if(z)for(var c of z(o))Y.call(o,c)&&R(l,c,o[c]);return l};import{a as w,c as S,s as $,z as ee,ab as te,A as oe,b as Z,v as ae,o as m,d as u,e,q as M,g as se,x,Z as le,t as r,a0 as ce,i as _,f as de,F as H,j as J,p as ie,m as re,ac as ne,n as me}from"./vendor.80559bff.js";import{a as K,l as y,A as v,_ as ue,b as Q,P as T}from"./index.e905566a.js";class ve{async getProfiles(){let o=await K.get("api/profiles");y.log(o.data),v.profiles=o.data,this.getLeaderAwards(v.profiles[0].id)}async getLeaderAwards(o){v.leaderAwards=[];const c=await K.get(`api/profiles/${o}/awards`);v.leaderAwards=c.data}}const be=new ve;const _e={name:"Account",setup(){const l=w(!1),o=w({}),c=w("edit employee record"),t=w([]),g=w({}),C=S(()=>v.profiles.filter(a=>a.credits>0).sort((a,d)=>d.totalCredits-a.totalCredits));$(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')",k()}),ee(C,()=>{y.log("leaderboard change"),[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(d=>new te(d))}),oe(()=>{be.getProfiles(),o.value=O({},v.account),A()});function A(){var b;const a=(b=v.account.inventory)==null?void 0:b.filter(i=>i.type=="collectable");if(!a)return[];const d={};a.forEach(i=>d[i.id]=i),t.value=Object.keys(d).map(i=>d[i]).sort(i=>{var n,h,f;return((n=v.account)==null?void 0:n.favoriteCollectable)&&i.name==((f=(h=v.account)==null?void 0:h.favoriteCollectable)==null?void 0:f.name)?-1:0}),g.value=t.value[0]}async function k(){try{Q.getAwards()}catch(a){y.error(a),T.error(a)}}return{editMode:l,editable:o,editTip:c,collectables:t,selectedCollectable:g,leaderboard:C,account:S(()=>v.account),leaderAwards:S(()=>v.leaderAwards.filter(a=>a.count>0)),async editAccount(){try{l.value?(o.value.favoriteCollectable=g.value.id,await Q.editAccount(o.value),T.toast("Employee record updated","success"),l.value=!1,c.value="edit employee record"):(l.value=!0,c.value="save record")}catch(a){T.toast(a),y.error(a)}},swapCollectable(a){let d=a.target.value;g.value=t.value[d]},popTitle(a){return`
        <div class="text-primary darken-20">${a.name}  <span >${a.employeeGrade}</span></div>
        `},popContent(a){var b,i;let d=a.awards.filter(n=>n.count>0);return`
        <div class=" position-relative">
          <div class="d-flex">
            <img class="pop-img rounded border border-primary" src="${a.picture}"/>
            <img class="pop-trinket ${a.favoriteCollectable?"":"d-none"}" title="${(b=a.favoriteCollectable)==null?void 0:b.name}" src="${(i=a.favoriteCollectable)==null?void 0:i.img}"/>
            ${d.map(n=>`
              <img class="pop-badge" title="${n.name} ${n.count>1?n.count:""}" src="${n.img}"/>
              `).join("")}
          </div>
          <div class="text-primary fw-bold">${new Date(a.createdAt).toLocaleDateString("en-us",{month:"short",year:"2-digit"})}</div>
        </div>
        `}}}},p=l=>(ie("data-v-1542d4eb"),l=l(),re(),l),pe={class:"container text-center"},ge={class:"row mt-5 about justify-content-center"},he={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},fe={class:"row bg-warning rounded lighten-10 shadow p-3"},we={class:"col-4"},xe={key:0,class:"position-relative"},ye=["src"],Ce=["src"],Ae={class:"col-8 text-start position-relative"},ke={key:0,class:"text-primary"},Se=p(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),Me=p(()=>e("b",null,"Recovered Shipments:",-1)),Te={class:"text-primary"},Pe={key:2},je=["src"],Be=["max"],Ee={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5"},Ge={class:"row justif-content-center leader-border p-2 mx-3"},Ie=p(()=>e("h4",{class:"col-12 text-center"},[e("i",{class:"mdi mdi-cat mx-1"}),_("Employee of the Cycle"),e("i",{class:"mdi mdi-cat mx-1"})],-1)),Le={class:"col-6"},Ne={class:"text-dark"},Ve=p(()=>e("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),De=p(()=>e("b",null,"Recovered Shipments:",-1)),Fe={class:"text-primary"},qe={class:"d-flex flex-wrap"},Ue={class:"award-icon m-1"},ze=["src"],Re={class:"col-6 mb-5"},Oe={class:"position-relative"},Ze=["src"],He=["src"],Je=ne('<section class="row text-primary mt-3" data-v-1542d4eb><div class="col-4 offset-1" data-v-1542d4eb>name</div><div class="col-3" data-v-1542d4eb><i class="mdi mdi-google-podcast mx-1" data-v-1542d4eb></i></div><div class="col-2" data-v-1542d4eb><i class="mdi mdi-package mx-1" data-v-1542d4eb></i></div><div class="col-2" data-v-1542d4eb><i class="mdi mdi-smart-card mx-1" data-v-1542d4eb></i></div></section>',1),Ke={class:"row p-0"},Qe={class:"leaderboard h-25"},We={class:"col-12 p-0"},Xe={class:"col-1 list-border"},Ye=["data-bs-title","data-bs-content"],$e=p(()=>e("i",{class:"mdi mdi-card-bulleted"},null,-1)),et=[$e],tt={class:"col-4 list-border"},ot={class:"col-3 list-border"},at={class:"col-2 list-border"},st={class:"col-2 list-border"};function lt(l,o,c,t,g,C){var d,b,i,n,h,f,P,j,B,E,G,I,L,N,V,D,F,q;const A=Z("UploadButton"),k=Z("AwardsThread"),a=ae("tooltip");return m(),u("div",pe,[e("div",ge,[e("div",he,[e("div",fe,[e("div",we,[t.editMode?(m(),se(A,{key:1,onUploadComplete:o[0]||(o[0]=s=>t.editable.picture=s.url),options:{class:"w-100 btn btn-white form-control px-3 py-5",spinner:"\u{1F431}"}})):(m(),u("div",xe,[e("img",{class:"img-fluid border-2 border-warningS rounded-1",src:t.account.picture,alt:""},null,8,ye),((b=(d=t.account)==null?void 0:d.favoriteCollectable)==null?void 0:b.img)?(m(),u("img",{key:0,class:"account-collectable",src:(n=(i=t.account)==null?void 0:i.favoriteCollectable)==null?void 0:n.img,alt:""},null,8,Ce)):M("",!0)]))]),e("div",Ae,[x(e("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:o[1]||(o[1]=s=>t.editMode=!t.editMode)},null,512),[[le,t.editMode],[a,"cancel","auto"]]),x(e("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:o[2]||(o[2]=(...s)=>t.editAccount&&t.editAccount(...s))},null,512),[[a,"edit account","auto"]]),t.editMode?x((m(),u("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":o[3]||(o[3]=s=>t.editable.name=s),minlength:"5",maxlength:"15",required:""},null,512)),[[ce,t.editable.name]]):(m(),u("h5",ke,r(t.account.name),1)),e("div",null,[Se,_(r(t.account.credits),1)]),e("div",null,[Me,_(" "+r((h=t.account.shipmentsFound)==null?void 0:h.length),1)]),e("h4",null,[e("b",Te,r((f=t.account)==null?void 0:f.employeeGrade),1)]),t.editMode&&t.collectables.length?(m(),u("div",Pe,[e("small",null,[_("favorite collectable: "+r((P=t.selectedCollectable)==null?void 0:P.name),1),e("img",{class:"item-thumbnail",src:(j=t.selectedCollectable)==null?void 0:j.img,alt:""},null,8,je)]),e("input",{value:"0",onInput:o[4]||(o[4]=(...s)=>t.swapCollectable&&t.swapCollectable(...s)),type:"range",class:"w-100",min:0,max:t.collectables.length-1},null,40,Be)])):M("",!0)])]),de(k)]),e("div",Ee,[e("section",Ge,[Ie,e("div",Le,[e("h5",Ne,r((B=t.leaderboard[0])==null?void 0:B.name),1),e("div",null,[Ve,_(r((E=t.leaderboard[0])==null?void 0:E.credits),1)]),e("div",null,[De,_(" "+r((I=(G=t.leaderboard[0])==null?void 0:G.shipmentsFound)==null?void 0:I.length),1)]),e("h4",null,[e("b",Fe,r(((L=t.leaderboard[0])==null?void 0:L.topGrade)||((N=t.leaderboard[0])==null?void 0:N.employeeGrade)),1)]),e("div",qe,[(m(!0),u(H,null,J(t.leaderAwards,s=>x((m(),u("div",Ue,[e("img",{src:s.img,alt:""},null,8,ze)],512)),[[a,`${s.name} ${s.count>1?s.count:""}`,"bottom"]])),256))])]),e("div",Re,[e("div",Oe,[e("img",{class:"img-fluid border border-primary rounded-1",src:(V=t.leaderboard[0])==null?void 0:V.picture,alt:""},null,8,Ze),((D=t.leaderboard[0])==null?void 0:D.favoriteCollectable)?(m(),u("img",{key:0,class:"leader-collectable",src:(q=(F=t.leaderboard[0])==null?void 0:F.favoriteCollectable)==null?void 0:q.img,alt:""},null,8,He)):M("",!0)])])]),Je,e("section",Ke,[e("div",Qe,[e("div",We,[(m(!0),u(H,null,J(t.leaderboard.slice(1),s=>{var U;return m(),u("div",{key:s.id,class:me(["row mt-2 px-2",{"text-warning":s.id==t.account.id,"text-dark":s.id!=t.account.id}])},[e("div",Xe,[e("button",{type:"button",class:"btn text-primary py-1","data-bs-html":"true","data-bs-custom-class":"custom-pop","data-bs-toggle":"popover","data-bs-trigger":"hover focus","data-bs-title":t.popTitle(s),"data-bs-content":t.popContent(s)},et,8,Ye)]),e("div",tt,r(s.name),1),e("div",ot,r(s.totalCredits),1),e("div",at,r((U=s.shipmentsFound)==null?void 0:U.length),1),e("div",st,r(s.topGrade||s.employeeGrade),1)],2)}),128))])])])])])])}var rt=ue(_e,[["render",lt],["__scopeId","data-v-1542d4eb"]]);export{rt as default};