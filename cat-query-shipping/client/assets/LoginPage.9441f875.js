import{a3 as n,c,a as d,o as e,b as s,F as i,B as l,d as t,e as p}from"./vendor.fb507f2e.js";import{_,c as u,A as f}from"./index.72fa6ffb.js";const m={setup(){return n(()=>{u.loadUsers()}),{users:c(()=>f.users)}}},g={class:"row bg-pink-800 p-4"},b=t("div",{class:"col-12 text-indigo-600"},"this is the login page",-1),v=t("div",{class:"col-6 btn btn-teal-500"},"button",-1);function B(h,x,k,a,y,E){const r=d("EmployeeBadge");return e(),s("div",g,[b,v,(e(!0),s(i,null,l(a.users,o=>(e(),s("div",{class:"col-3",key:o.id},[p(r,{user:o},null,8,["user"])]))),128))])}var A=_(m,[["render",B]]);export{A as default};