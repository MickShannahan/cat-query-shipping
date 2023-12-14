import{_ as o}from"./index.65ec28ff.js";import{c as l,o as r,d as s,e as a,F as h,j as d,ac as c,t}from"./vendor.a96acae7.js";const p={setup(){return{chars:l(()=>[{char:"?",replace:"%3F",type:"reserved",usage:"signifies start of query component"},{char:"&",replace:"%26",type:"reserved",usage:"used to chain multiple query parameters"},{char:"=",replace:"%3D",type:"reserved",usage:"seperates key value pary of query parameter"},{char:"SPACE",replace:"%20 or +",type:"unsafe",usage:""},{char:"!",replace:"%21",type:"reserved",usage:""},{char:"$",replace:"%24",type:"reserved",usage:""},{char:"'",replace:"%27",type:"reserved",usage:""},{char:"(",replace:"%28",type:"reserved",usage:""},{char:")",replace:"%29",type:"reserved",usage:""},{char:"*",replace:"%2A",type:"reserved",usage:""},{char:"+",replace:"%2B",type:"reserved",usage:""},{char:",",replace:"%2C",type:"reserved",usage:""},{char:"/",replace:"%2F",type:"reserved",usage:""},{char:":",replace:"%3A",type:"reserved",usage:""},{char:";",replace:"%3B",type:"reserved",usage:""},{char:"@",replace:"%40",type:"reserved",usage:""},{char:"[",replace:"%5B",type:"reserved",usage:""},{char:"]",replace:"%5D",type:"reserved",usage:""},{char:'"',replace:"%22",type:"unsafe",usage:""},{char:"<",replace:"%3C",type:"unsafe",usage:""},{char:">",replace:"%3E",type:"unsafe",usage:""},{char:"#",replace:"%23",type:"unsafe",usage:""},{char:"%",replace:"%25",type:"unsafe",usage:""},{char:"|",replace:"%7C",type:"unsafe",usage:""},{char:"^",replace:"%5E",type:"unsafe",usage:""},{char:"\\",replace:"%5C",type:"unsafe",usage:""}])}}},u={class:"row letter-head flex-column align-items-center p-4"},y=c('<h3 class="col-11 text-primary text-center" data-v-5e58c6aa> Query the Shipment Database using the HTTP Terminal </h3><div class="line-break w-75" data-v-5e58c6aa></div><h5 class="col-11 text-primary text-start" data-v-5e58c6aa>What is it?</h5><p class="col-10" data-v-5e58c6aa> The trade tool of choice for each shipment sleuth here at C.U.P.S is the HTTP Terminal. Each C.U.P.S employee is is assigned a top of the line &#39;hindsight transport tracking puter 2&#39;, powered by a K.i.t-10 processor. These machines are capable of pinging all registered satellites and stations within a 10 quadrants. Those pings bounce to other satellites in their range and so on and so forth until eventually all bounce back to the terminal. These are compiled then the results are printed out. </p><h5 class="col-11 text-primary text-start" data-v-5e58c6aa>How to use it</h5><div class="col-10" data-v-5e58c6aa> The HTTP terminal allows users to query the shipment database by typing in thier own query components into the URL. The query component (seen bellow in black) contains non-hierarchical data that, along with data in the path component (seen bellow in blue), serves to identify a resource within the scope of the URI&#39;s scheme and naming authority (if any). The query component is indicated by the first question mark (&quot;?&quot;) character and terminated by a number sign (&quot;#&quot;) character or by the end of the URI. Query components are often used to carry identifying information in the form of &quot;key=value&quot; pairs. Pictured bellow, the database will be searched for all Shipments where the &#39;recipient&#39; is &#39;Snibblysmith&#39;. <div class="input-group border border-primary rounded" data-v-5e58c6aa><span class="input-group-text bg-primary-lighten text-secondary" id="basic-addon3" data-v-5e58c6aa>https://yourdomainhere.com/api/collection</span><input disabled type="text" class="form-control bg-light-blue text-info" placeholder="?recipient=Snibblysmith" data-v-5e58c6aa></div></div><h5 class="col-11 text-primary text-start mt-3" data-v-5e58c6aa>Advanced Use</h5><div class="col-10" data-v-5e58c6aa> Well rounded shipment searchers will often want to search using more than just one query &#39;parameter&#39; or key=value pair. When this is the case the reserved character &#39;&amp;&#39; is used. This signifies another field to search by. Pictured bellow the query component is made up of two parameters; the recipient Snibblysmith and the planet Magrathea. the search will return all shipments where the recipient field is &#39;Snibblysmith&#39; AND the planet field is &#39;Magrathea&#39;. This is useful as there are many shipments sent to Magrathea and there are many Snibblysmiths in the galaxy. Simply searching one at a time might not offer a useful result. <div class="input-group border border-primary rounded" data-v-5e58c6aa><span class="input-group-text bg-primary-lighten text-secondary" id="basic-addon3" data-v-5e58c6aa>https://yourdomainhere.com/api/collection</span><input disabled type="text" class="form-control bg-light-blue text-info" placeholder="?recipient=Snibblysmith&amp;planet=Magrathea" data-v-5e58c6aa></div></div><h5 class="col-11 text-primary text-start mt-3" data-v-5e58c6aa>Special Characters</h5>',9),v={class:"col-10"},g=c(' Not all characters on your Terminal&#39;s paw typer interface are able to be used in queries let alone URLs. Certain characters have special uses within the URL and must be changed out to keep our URL safe. Your state-of-the-art HTTP terminal has a build in character colorizer. The secondary screen below the input screen, will highlight when both &#39;reserved&#39; characters and &#39;unsafe&#39; characters are detected. Unsafe characters will be highlighted in <span class="text-danger darken-10" data-v-5e58c6aa>red</span> and reserved characters are highlighted in <span class="text-warning darken-40" data-v-5e58c6aa>yellow</span>. An added feature is that searchable fields will be highlighted in <span class="text-info darken-30" data-v-5e58c6aa> light green</span>. Unsafe characters cannot be sent in the URL and if one is spotted, the search function will lock up. While reserved characters are allowed to be sent, in the wrong place can cause errors. Take a look at the table bellow for both reserved and unsafe characters, and their encoded versions for when they need to be used within our queries. <div class="row bg-primary-lighten border border-primary text-primary mt-3" data-v-5e58c6aa><div class="col-2" data-v-5e58c6aa>character</div><div class="col-2" data-v-5e58c6aa>replacement</div><div class="col-3" data-v-5e58c6aa>type</div><div class="col-5" data-v-5e58c6aa>usage</div></div>',8),m={class:"col-2"},b={class:"col-2"},f={class:"col-2"},w={class:"col-6"};function _(i,x,T,n,q,k){return r(),s("div",u,[y,a("div",v,[g,(r(!0),s(h,null,d(n.chars,e=>(r(),s("div",{key:e.char,class:"row border border-primary"},[a("div",m,t(e.char),1),a("div",b,t(e.replace),1),a("div",f,t(e.type),1),a("div",w,t(e.usage),1)]))),128))])])}var C=o(p,[["render",_],["__scopeId","data-v-5e58c6aa"]]);export{C as default};
