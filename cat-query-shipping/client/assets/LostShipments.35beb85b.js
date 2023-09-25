import{_ as d}from"./index.e938760b.js";import{r as c,o as a,d as o,e,F as p,j as l,p as h,m,t as u,n as _,i as f}from"./vendor.80559bff.js";const g={setup(){return c({}),{shipmentModel:{recipient:"Name of shipment's receiver",trackingNumber:"Alphanumeric code used to track and identify shipments, formatted as such ###-###-#",description:`String description of package contents
              <span class="text-danger key">[omitted]</span>`,shippingTier:"[INTERPLANETARY/DOMESTIC, 2LTYR, 1LTYR, METEOR-FREIGHT, GALAXY-EXPRESS, WARP, WARP+, WARP-FREIGHT]",shippingCost:"Cost based off 'shippingTier' as follows: [25, 50, 70, 50, 40, 75, 95, 100]",currency:"Must be on of the Union accepted Currency; Union, KITCOIN, M0nSER4T, Scratch, Ca+N!p",insured:"Whether the shipment is insured under the flat rate shipping insurance (50)",pirateCoverage:"Whether the shipment has coverage for the case of any delays or damages cause by pirates (25)",totalCost:"Calculated cost based the shippingCost, insured and pirateCoverage values, adjusted for Currency values",dateFormat:"Date format local to recipient [Sol, Tera, Minkow, Dominion]",shippingDate:"Date of shipment sent formatted to match date format",postalStation:"Postal station shipment was registered at",sector:"Coordinates of senders' and receiver's radii",inQuadrant:"If delivery personal need pass-phrase to enter secure quadrant",quadrantCode:"If applicable, code to acquire pass-phrase to enter quadrant",id:"[REDACTED]",galaxy:"Galaxy of shipping coverage",planet:"Planet for shipment to be delivered to",planetNumber:"Number data for planet as discovered",planetCode:"System code for shipment system to identify planet",containsHazard:"Whether the shipment contents and effects are hazardous to feline health",hazard:"If applicable, details shipments hazardous contents and effects"}}}},s=t=>(h("data-v-7dd66620"),t=t(),m(),t),v={class:"lost-shipments bg-danger lighten-30 row p-3 pb-1"},y={class:"col-12"},b={class:"row justify-content-center"},C=s(()=>e("div",{class:"col-12"},[e("h2",{class:"mt-1 text-danger darken-10"},"Lost Shipments"),e("div",{class:"mt-1 text-grey"},"(What are they? Where are they?)"),e("hr",{class:"w-50 mt-2 border-bottom border-danger"})],-1)),T={class:"col-md-12 p-2 border-example text-dark"},S=s(()=>e("b",null,"Shipment model complete",-1)),x=s(()=>e("hr",{class:"w-50 mt-2 border-bottom border-danger"},null,-1)),E={class:"key text-primary"},R=f(" : "),I=["innerHTML"],k=s(()=>e("p",null,null,-1));function A(t,D,L,i,N,M){return a(),o("div",v,[e("div",y,[e("div",b,[C,e("div",T,[S,x,(a(!0),o(p,null,l(i.shipmentModel,(r,n)=>(a(),o("div",{class:"property",key:n},[e("span",E,u(n),1),R,e("span",{class:_(["text-grey",{redacted:r=="[REDACTED]"}]),innerHTML:r},null,10,I)]))),128))]),k])])])}var P=d(g,[["render",A],["__scopeId","data-v-7dd66620"]]);export{P as default};
