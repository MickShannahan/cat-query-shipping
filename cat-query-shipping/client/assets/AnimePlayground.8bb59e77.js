import{B as l,a as c,o as s,b as r,d as n,A as _,F as d,D as u,f as m}from"./vendor.a49bbcba.js";import{_ as f}from"./index.fc4f14f3.js";const p={setup(){const e=l([]);return{list:e,addToList(){e.value.unshift(e.value.length+1)}}}},v={class:"bg-light"},b={class:"row flex-column"};function g(e,o,y,t,k,x){const i=c("Animate");return s(),r(d,null,[n("button",{class:"btn btn-primary",onClick:o[0]||(o[0]=(...a)=>t.addToList&&t.addToList(...a))},"add"),n("div",v,_(t.list),1),n("div",b,[(s(!0),r(d,null,u(t.list,a=>(s(),m(i,{key:a,class:"anime bg-dark p-5 rounded shadow",id:a},null,8,["id"]))),128))])],64)}var B=f(p,[["render",g],["__scopeId","data-v-0163c92e"]]);export{B as default};
