import{a as l,b as c,o as a,d as r,e as n,t as _,F as d,j as u,g as m}from"./vendor.d42da21d.js";import{_ as p}from"./index.57d33049.js";const v={setup(){const e=l([]);return{list:e,addToList(){e.value.unshift(e.value.length+1)}}}},f={class:"bg-light"},g={class:"row flex-column"};function y(e,o,b,t,k,x){const i=c("Animate");return a(),r(d,null,[n("button",{class:"btn btn-primary",onClick:o[0]||(o[0]=(...s)=>t.addToList&&t.addToList(...s))},"add"),n("div",f,_(t.list),1),n("div",g,[(a(!0),r(d,null,u(t.list,s=>(a(),m(i,{key:s,class:"anime bg-dark p-5 rounded shadow",id:s},null,8,["id"]))),128))])],64)}var B=p(v,[["render",y],["__scopeId","data-v-0163c92e"]]);export{B as default};
