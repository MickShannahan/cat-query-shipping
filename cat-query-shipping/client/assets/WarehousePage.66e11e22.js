import{_ as g,B as f,K as x,e as S,A as w}from"./index.e905566a.js";import{a as C,s as I,c as B,b as n,v as D,o as i,d as K,e as o,f as l,x as a,w as V,g as d,q as _,p as P,m as M}from"./vendor.80559bff.js";const N={setup(){const s=C("inventory");return I(()=>{document.body.style.backgroundImage="radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-Warehouse.png')"}),{screen:s,Bozko:f,Kimko:x,KimkoShop:S,inventoryItems:B(()=>w.account.inventory)}}},c=s=>(P("data-v-65a58d02"),s=s(),M(),s),W={class:"warehouse-grid"},j={class:"item-details container-fluid console-console2 outset plastic px-4 py-3 rounded"},A=c(()=>o("div",{class:"item-buttons"},null,-1)),q={class:"inventory-bar console-console outset plastic p-3 pb-4"},z=c(()=>o("i",{class:"mdi mdi-cart"},null,-1)),E=[z],H=c(()=>o("i",{class:"mdi mdi-wrench"},null,-1)),F=[H],G=c(()=>o("i",{class:"mdi mdi-bag-personal"},null,-1)),J=[G],L=c(()=>o("i",{class:"mdi mdi-memory"},null,-1)),O=[L],Q={class:"btn comp-button comp-red px-2 py-1"},R=c(()=>o("i",{class:"mdi mdi-exit-run"},null,-1)),T=[R],U={class:"inventory-main console-console outset plastic container-fluid px-4 py-3"},X={class:"row rounded screen-theme inset text-theme-primary p-2 h-100"},Y={class:"col-12 p-0"};function Z(s,t,$,e,oo,eo){const u=n("ItemDetails"),h=n("router-link"),b=n("ShopScreen"),v=n("CraftScreen"),y=n("InventoryScreen"),k=n("ModsScreen"),p=n("DialogueV2"),r=D("tooltip");return i(),K("section",W,[o("div",j,[l(u,{screen:e.screen},null,8,["screen"])]),A,o("div",q,[a(o("button",{class:"btn comp-button comp-green px-2 py-1",onClick:t[0]||(t[0]=m=>e.screen="shop")},E,512),[[r,"kiwi's shop","bottom"]]),a(o("button",{class:"btn comp-button comp-green px-2 py-1",onClick:t[1]||(t[1]=m=>e.screen="craft")},F,512),[[r,"workbench","bottom"]]),a(o("button",{class:"btn comp-button comp-yellow px-2 py-1",onClick:t[2]||(t[2]=m=>e.screen="inventory")},J,512),[[r,"your inventory","bottom"]]),a(o("button",{class:"btn comp-button comp-blue px-2 py-1",onClick:t[3]||(t[3]=m=>e.screen="mods")},O,512),[[r,"your mods","bottom"]]),l(h,{to:{name:"Home"}},{default:V(()=>[a(o("button",Q,T,512),[[r,"go back to work room","right"]])]),_:1})]),o("div",U,[o("section",X,[o("div",Y,[e.screen=="shop"?(i(),d(b,{key:0})):_("",!0),e.screen=="craft"?(i(),d(v,{key:1})):_("",!0),e.screen=="inventory"?(i(),d(y,{key:2})):_("",!0),e.screen=="mods"?(i(),d(k,{key:3})):_("",!0)])])]),o("section",null,[l(p,{character:e.Kimko,btnPosition:1},null,8,["character"]),l(p,{character:e.KimkoShop,btnPosition:0},null,8,["character"])])])}var so=g(N,[["render",Z],["__scopeId","data-v-65a58d02"]]);export{so as default};
