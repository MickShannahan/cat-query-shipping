import{_ as d}from"./index.e1298ffa.js";import{r as p,o as a,b as r,d as e,F as c,B as l,v as h,x as m,z as u,C as _,h as f}from"./vendor.fb507f2e.js";const g={setup(){return p({}),{shipmentModel:{recipient:"Name of shipment's reciever",trackingNumber:"###-###-###-###-#",description:`String description of package
              <span class="text-danger key">[ommited]</span>`,shippingTier:"[1LTYR, 2LTYR, METEOR-FREIGHT, GALAXY-EXPRESS, TELEPORT+, INTERPLANETARY/DOMESTIC, STANDARD, STANDARD+, WARP-FREIGHT]",postageCost:"Number based off 'shippingTier'",postageCrypto:"Must be Union applicable crypto (see section on cryptos)",shippingDate:"Two digit number representing day of current cycle",dateFormat:"date format local to recipient [Sol, Tera, Minkow, Dominion]",delivered:"whether shipment was reported to be delivered by shipper",postalStation:"postal station shipment was registered at",insured:"whether the shipment was insured [true, false]",pirateCoverage:"whether shipment was coverered for instance of pirate raid [true, false]",insuredCost:"calculated cost based on postageCost, insured(pc x 2)and pirateCoverage(pc x 2.5)",insuredCrypto:"Must be same crypto used for postageCost",sector:"coordinates of senders' and reciever's radii",quadrant:"galaxy quadrant on quadrant grid",hasQuadrantCode:"if delivery personel need pass-phrase to enter quadrant",quadrantCode:"if applicable, pass-phrase to enter quadrant.",id:"[REDACTED]",galaxy:"galaxy of origin",galaxyCode:"locational number data of reciver's galaxy location'",planet:"planet for shipment to be delivered to",planetNumber:"number data for planet as discovered",planetCode:"system code for shipment system to identify planet",containsHazard:"whether the shipment contents and effects are hazardous to feline health",hazard:"if applicable, details shipments hazardous contents and effects",creditsWorth:"bount for lost shipment found in UC"}}}},s=t=>(h("data-v-1a75f708"),t=t(),m(),t),b={class:"lost-shipments bg-danger lighten-30 row p-3 pb-1"},y={class:"col-12"},v={class:"row justify-content-center"},x=s(()=>e("div",{class:"col-12"},[e("h2",{class:"mt-1 text-danger darken-10"},"Lost Shipments"),e("div",{class:"mt-1 text-grey"},"(what are they? Where are they?)"),e("hr",{class:"w-50 mt-2 border-bottom border-danger"})],-1)),T={class:"col-md-12 p-2 border-example text-dark"},C=s(()=>e("b",null,"Shipment model complete",-1)),w=s(()=>e("hr",{class:"w-50 mt-2 border-bottom border-danger"},null,-1)),E={class:"key text-primary"},S=f(" : "),R=["innerHTML"],D=s(()=>e("p",null,null,-1));function A(t,L,N,i,k,M){return a(),r("div",b,[e("div",y,[e("div",v,[x,e("div",T,[C,w,(a(!0),r(c,null,l(i.shipmentModel,(o,n)=>(a(),r("div",{class:"property",key:n},[e("span",E,u(n),1),S,e("span",{class:_(["text-grey",{redacted:o=="[REDACTED]"}]),innerHTML:o},null,10,R)]))),128))]),D])])])}var z=d(g,[["render",A],["__scopeId","data-v-1a75f708"]]);export{z as default};
