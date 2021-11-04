import{_ as e}from"./index.5a1eef16.js";import{r as t,b as a,d as r,F as s,x as o,s as n,t as i,o as d,y as p,z as l,f as c}from"./editor.worker.001edd06.js";const h={setup:()=>(t({}),{shipmentModel:{recipient:"Name of shipment's reciever",trackingNumber:"###-###-###-###-#",description:'String description of package\n              <span class="text-danger key">[ommited]</span>',shippingTier:"[1LTYR, 2LTYR, METEOR-FREIGHT, GALAXY-EXPRESS, TELEPORT+, INTERPLANETARY/DOMESTIC, STANDARD, STANDARD+, WARP-FREIGHT]",postageCost:"Number based off 'shippingTier'",postageCrypto:"Must be Union applicable crypto (see section on cryptos)",shippingDate:"Two digit number representing day of current cycle",dateFormat:"date format local to recipient [Sol, Tera, Minkow, Dominion]",delivered:"whether shipment was reported to be delivered by shipper",postalStation:"postal station shipment was registered at",insured:"whether the shipment was insured [true, false]",pirateCoverage:"whether shipment was coverered for instance of pirate raid [true, false]",insuredCost:"calculated cost based on postageCost, insured(pc x 2)and pirateCoverage(pc x 2.5)",insuredCrypto:"Must be same crypto used for postageCost",sector:"coordinates of senders' and reciever's radii",quadrant:"galaxy quadrant on quadrant grid",hasQuadrantCode:"if delivery personel need pass-phrase to enter quadrant",quadrantCode:"if applicable, pass-phrase to enter quadrant.",id:"[REDACTED]",galaxy:"galaxy of origin",galaxyCode:"locational number data of reciver's galaxy location'",planet:"planet for shipment to be delivered to",planetNumber:"number data for planet as discovered",planetCode:"system code for shipment system to identify planet",containsHazard:"whether the shipment contents and effects are hazardous to feline health",hazard:"if applicable, details shipments hazardous contents and effects",creditsWorth:"bount for lost shipment found in UC"}})},m=e=>(n("data-v-1a75f708"),e=e(),i(),e),u={class:"lost-shipments bg-danger lighten-30 row p-3 pb-1"},f={class:"col-12"},g={class:"row justify-content-center"},b=m((()=>r("div",{class:"col-12"},[r("h2",{class:"mt-1 text-danger darken-10"},"Lost Shipments"),r("div",{class:"mt-1 text-grey"},"(what are they? Where are they?)"),r("hr",{class:"w-50 mt-2 border-bottom border-danger"})],-1))),y={class:"col-md-12 p-2 border-example text-dark"},v=m((()=>r("b",null,"Shipment model complete",-1))),T=m((()=>r("hr",{class:"w-50 mt-2 border-bottom border-danger"},null,-1))),x={class:"key text-primary"},w=c(" : "),C=["innerHTML"],E=m((()=>r("p",null,null,-1)));var R=e(h,[["render",function(e,t,n,i,c,h){return d(),a("div",u,[r("div",f,[r("div",g,[b,r("div",y,[v,T,(d(!0),a(s,null,o(i.shipmentModel,((e,t)=>(d(),a("div",{class:"property",key:t},[r("span",x,p(t),1),w,r("span",{class:l(["text-grey",{redacted:"[REDACTED]"==e}]),innerHTML:e},null,10,C)])))),128))]),E])])])}],["__scopeId","data-v-1a75f708"]]);export default R;
