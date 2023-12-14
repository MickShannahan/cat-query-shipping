var W=Object.defineProperty;var U=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var z=(c,s,d)=>s in c?W(c,s,{enumerable:!0,configurable:!0,writable:!0,value:d}):c[s]=d,R=(c,s)=>{for(var d in s||(s={}))X.call(s,d)&&z(c,d,s[d]);if(U)for(var d of U(s))Y.call(s,d)&&z(c,d,s[d]);return c};import{a as g,c as T,s as $,z as ee,ab as te,A as oe,b as Z,v as se,o as i,d as r,e as t,q as O,g as ae,x as C,Z as le,t as m,a0 as ce,i as h,f as ie,F as H,j as J,p as de,m as re,ac as ne,n as me}from"./vendor.a96acae7.js";import{a as K,l as S,A as v,_ as _e,b as Q,P as M,d as ve}from"./index.65ec28ff.js";class ue{async getProfiles(){let s=await K.get("api/profiles");S.log(s.data),v.profiles=s.data,this.getLeaderAwards(v.profiles[0].id)}async getLeaderAwards(s){v.leaderAwards=[];const d=await K.get(`api/profiles/${s}/awards`);v.leaderAwards=d.data}}const pe=new ue;const he={name:"Account",setup(){const c=g(!1),s=g({}),d=g("edit employee record"),e=g([]),y=g({}),L=g(!1),f=T(()=>L.value?v.profiles.filter(o=>o.credits>0).sort((o,l)=>l.totalCredits-o.totalCredits):v.profiles.filter(o=>o.credits>0&&new Date(o.updatedAt).getTime()>Date.now()-60*ve).sort((o,l)=>l.totalCredits-o.totalCredits)),k=T(()=>f.value[0]!=null?f.value[0]:v.profiles.sort((o,l)=>l.totalCredits-o.totalCredits)[0]);$(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')",A()}),ee(f,()=>{S.log("leaderboard change"),setTimeout(()=>{[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(l=>new te(l))},500)}),oe(()=>{pe.getProfiles(),s.value=R({},v.account),b()});function b(){var p;const o=(p=v.account.inventory)==null?void 0:p.filter(n=>n.type=="collectable");if(!o)return[];const l={};o.forEach(n=>l[n.id]=n),e.value=Object.keys(l).map(n=>l[n]).sort(n=>{var _,w,x;return((_=v.account)==null?void 0:_.favoriteCollectable)&&n.name==((x=(w=v.account)==null?void 0:w.favoriteCollectable)==null?void 0:x.name)?-1:0}),y.value=e.value[0]}async function A(){try{Q.getAwards()}catch(o){S.error(o),M.error(o)}}return{editMode:c,editable:s,editTip:d,collectables:e,selectedCollectable:y,leaderboard:f,employeeOfCycle:k,showAllTimeLeader:L,account:T(()=>v.account),leaderAwards:T(()=>{var o;return(o=k.value)==null?void 0:o.awards.filter(l=>l.count>0)}),async editAccount(){var o;try{c.value?(s.value.favoriteCollectable=(o=y.value)==null?void 0:o.id,await Q.editAccount(s.value),M.toast("Employee record updated","success"),c.value=!1,d.value="edit employee record"):(c.value=!0,d.value="save record")}catch(l){M.toast(l),S.error(l)}},swapCollectable(o){let l=o.target.value;y.value=e.value[l]},popTitle(o){return`
        <div class="text-primary darken-20">${o.name}  <span >${o.employeeGrade}</span></div>
        `},popContent(o){var p,n;let l=o.awards.filter(_=>_.count>0);return`
        <div class=" position-relative">
          <div class="d-flex">
            <img class="pop-img rounded border border-primary" src="${o.picture}"/>
            <img class="pop-trinket ${o.favoriteCollectable?"":"d-none"}" title="${(p=o.favoriteCollectable)==null?void 0:p.name}" src="${(n=o.favoriteCollectable)==null?void 0:n.img}"/>
            ${l.map(_=>`
              <img class="pop-badge" title="${_.name} ${_.count>1?_.count:""}" src="${_.img}"/>
              `).join("")}
          </div>
          <div class="text-primary fw-bold">${new Date(o.createdAt).toLocaleDateString("en-us",{month:"short",year:"2-digit"})}</div>
        </div>
        `}}}},u=c=>(de("data-v-9e2f1530"),c=c(),re(),c),fe={class:"container text-center"},be={class:"row mt-5 about justify-content-center"},ge={class:"col-12 col-lg-5 me-lg-5 mb-3 p-lg-0"},ye={class:"row bg-warning rounded lighten-10 shadow p-3"},we={class:"col-4"},xe={key:0,class:"position-relative"},Ce=["src"],ke=["src"],Ae={class:"col-8 text-start position-relative"},Te={key:0,class:"text-primary"},Se=u(()=>t("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),Le=u(()=>t("b",null,"Recovered Shipments:",-1)),Oe={class:"text-primary"},Me={key:2},Pe=["src"],je=["max"],De={class:"col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5 position-relative"},Ee={class:"row justify-content-center leader-border p-2 mx-3"},Ne={key:0,class:"text-primary darken-30 fs-3 mdi mdi-calendar-star"},Be={key:1,class:"text-primary darken-30 fs-3 mdi mdi-calendar"},Ge={key:0,class:"col-12 text-center mb-1 fs-4"},Ie=u(()=>t("i",{class:"mdi mdi-cat mx-1"},null,-1)),Ve=h("All Time Top Employee"),Fe=u(()=>t("i",{class:"mdi mdi-cat mx-1"},null,-1)),qe=[Ie,Ve,Fe],Ue={key:1,class:"col-12 text-center mb-1"},ze=u(()=>t("div",{class:"fs-4"},[t("i",{class:"mdi mdi-cat mx-1"}),h("Employee of the Cycle"),t("i",{class:"mdi mdi-cat mx-1"})],-1)),Re=u(()=>t("div",{class:"text-primary darken-10"},[t("small",null,"(60 days)")],-1)),Ze=[ze,Re],He={key:2,class:"col-6"},Je={class:"text-dark"},Ke=u(()=>t("i",{class:"mdi mdi-google-podcast mx-1"},null,-1)),Qe=u(()=>t("b",null,"Recovered Shipments:",-1)),We={class:"text-primary"},Xe={class:"d-flex flex-wrap"},Ye={class:"award-icon m-1"},$e=["src"],et={key:3,class:"col-6"},tt={class:"col-6 mb-5"},ot={class:"position-relative"},st=["src"],at=["src"],lt=ne('<section class="row text-primary mt-3" data-v-9e2f1530><div class="col-4 offset-1" data-v-9e2f1530>name</div><div class="col-3" data-v-9e2f1530><i class="mdi mdi-google-podcast mx-1" data-v-9e2f1530></i></div><div class="col-2" data-v-9e2f1530><i class="mdi mdi-package mx-1" data-v-9e2f1530></i></div><div class="col-2" data-v-9e2f1530><i class="mdi mdi-smart-card mx-1" data-v-9e2f1530></i></div></section>',1),ct={class:"row p-0"},it={class:"leaderboard h-25"},dt={class:"col-12 p-0"},rt={class:"col-1 list-border"},nt=["data-bs-title","data-bs-content"],mt=u(()=>t("i",{class:"mdi mdi-card-bulleted"},null,-1)),_t=[mt],vt={class:"col-4 list-border"},ut={class:"col-3 list-border"},pt={class:"col-2 list-border"},ht={class:"col-2 list-border"};function ft(c,s,d,e,y,L){var A,o,l,p,n,_,w,x,P,j,D,E,N,B,G,I,V,F;const f=Z("UploadButton"),k=Z("AwardsThread"),b=se("tooltip");return i(),r("div",fe,[t("div",be,[t("div",ge,[t("div",ye,[t("div",we,[e.editMode?(i(),ae(f,{key:1,onUploadComplete:s[0]||(s[0]=a=>e.editable.picture=a.url),options:{class:"w-100 btn btn-white form-control px-3 py-5",spinner:"\u{1F431}"}})):(i(),r("div",xe,[t("img",{class:"img-fluid border-2 border-warningS rounded-1",src:e.account.picture,alt:""},null,8,Ce),((o=(A=e.account)==null?void 0:A.favoriteCollectable)==null?void 0:o.img)?(i(),r("img",{key:0,class:"account-collectable",src:(p=(l=e.account)==null?void 0:l.favoriteCollectable)==null?void 0:p.img,alt:""},null,8,ke)):O("",!0)]))]),t("div",Ae,[C(t("i",{class:"mdi mdi-cancel me-5 icon selectable text-danger darken-10 p-1 px-2 rounded",onClick:s[1]||(s[1]=a=>e.editMode=!e.editMode)},null,512),[[le,e.editMode],[b,"cancel","auto"]]),C(t("i",{class:"mdi mdi-pencil icon selectable text-warning darken-40 p-1 px-2 rounded",onClick:s[2]||(s[2]=(...a)=>e.editAccount&&e.editAccount(...a))},null,512),[[b,"edit account","auto"]]),e.editMode?C((i(),r("input",{key:1,class:"form-control w-75",type:"text",placeholder:"Enter Name..","onUpdate:modelValue":s[3]||(s[3]=a=>e.editable.name=a),minlength:"5",maxlength:"15",required:""},null,512)),[[ce,e.editable.name]]):(i(),r("h5",Te,m(e.account.name),1)),t("div",null,[Se,h(m(e.account.credits),1)]),t("div",null,[Le,h(" "+m((n=e.account.shipmentsFound)==null?void 0:n.length),1)]),t("h4",null,[t("b",Oe,m((_=e.account)==null?void 0:_.employeeGrade),1)]),e.editMode&&e.collectables.length?(i(),r("div",Me,[t("small",null,[h("favorite collectable: "+m((w=e.selectedCollectable)==null?void 0:w.name),1),t("img",{class:"item-thumbnail",src:(x=e.selectedCollectable)==null?void 0:x.img,alt:""},null,8,Pe)]),t("input",{value:"0",onInput:s[4]||(s[4]=(...a)=>e.swapCollectable&&e.swapCollectable(...a)),type:"range",class:"w-100",min:0,max:e.collectables.length-1},null,40,je)])):O("",!0)])]),ie(k)]),t("div",De,[t("section",Ee,[C(t("button",{onClick:s[5]||(s[5]=a=>e.showAllTimeLeader=!e.showAllTimeLeader),class:"leaderboard-button"},[e.showAllTimeLeader?(i(),r("i",Be)):(i(),r("i",Ne))],512),[[b,`${e.showAllTimeLeader?"show cycle":"show all time"}`,"left"]]),e.showAllTimeLeader?(i(),r("div",Ge,qe)):(i(),r("div",Ue,Ze)),e.employeeOfCycle?(i(),r("div",He,[t("h5",Je,m((P=e.employeeOfCycle)==null?void 0:P.name),1),t("div",null,[Ke,h(m((j=e.employeeOfCycle)==null?void 0:j.credits),1)]),t("div",null,[Qe,h(" "+m((E=(D=e.employeeOfCycle)==null?void 0:D.shipmentsFound)==null?void 0:E.length),1)]),t("h4",null,[t("b",We,m(((N=e.employeeOfCycle)==null?void 0:N.topGrade)||((B=e.employeeOfCycle)==null?void 0:B.employeeGrade)),1)]),t("div",Xe,[(i(!0),r(H,null,J(e.leaderAwards,a=>C((i(),r("div",Ye,[t("img",{src:a.img,alt:""},null,8,$e)],512)),[[b,`${a.name} ${a.count>1?a.count:""}`,"bottom"]])),256))])])):(i(),r("div",et,"No employee")),t("div",tt,[t("div",ot,[t("img",{class:"img-fluid border border-primary rounded-1",src:(G=e.employeeOfCycle)==null?void 0:G.picture,alt:""},null,8,st),((I=e.employeeOfCycle)==null?void 0:I.favoriteCollectable)?(i(),r("img",{key:0,class:"leader-collectable",src:(F=(V=e.employeeOfCycle)==null?void 0:V.favoriteCollectable)==null?void 0:F.img,alt:""},null,8,at)):O("",!0)])])]),lt,t("section",ct,[t("div",it,[t("div",dt,[(i(!0),r(H,null,J(e.leaderboard.slice(1),a=>{var q;return i(),r("div",{key:a.id,class:me(["row mt-2 px-2",{"text-warning":a.id==e.account.id,"text-dark":a.id!=e.account.id}])},[t("div",rt,[t("button",{type:"button",class:"btn text-primary py-1","data-bs-html":"true","data-bs-custom-class":"custom-pop","data-bs-toggle":"popover","data-bs-trigger":"hover focus","data-bs-title":e.popTitle(a),"data-bs-content":e.popContent(a)},_t,8,nt)]),t("div",vt,m(a.name),1),t("div",ut,m(a.totalCredits),1),t("div",pt,m((q=a.shipmentsFound)==null?void 0:q.length),1),t("div",ht,m(a.topGrade||a.employeeGrade),1)],2)}),128))])])])])])])}var wt=_e(he,[["render",ft],["__scopeId","data-v-9e2f1530"]]);export{wt as default};
