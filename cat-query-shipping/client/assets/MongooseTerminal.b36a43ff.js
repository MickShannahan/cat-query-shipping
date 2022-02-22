import{_ as t}from"./index.0b4f414a.js";import{r as e,o as r,b as d,a3 as o}from"./vendor.81e22a6b.js";const i={setup(){return{state:e({})}}},n={class:"row letter-head flex-column align-items-center p-4"},s=o('<h3 class="col-12 text-warning darken-40 text-center" data-v-1a483d87> Search the Shipment Database using a &#39;Mongo&#39; filter object </h3><div class="line-break w-75" data-v-1a483d87></div><h5 class="col-12 text-warning darken-40 text-start" data-v-1a483d87> What is a filter object? </h5><p class="col-11" data-v-1a483d87> The C.U.P.S Central Processing Matrix Server Appliance (CUPSCPMSA) allows for a user to submit a formatted object to search the lost shipment database instead of a query url. this object will can be formatted in such a way to have matching &#39;key&#39; and &#39;value&#39; pairs with shipments in the database. Here is an example <em data-v-1a483d87>(fig.a)</em></p><div class="col-11" data-v-1a483d87><em class="text-warning darken-40" data-v-1a483d87>figure a.</em><div class="row border border-secondary rounded p-2" data-v-1a483d87><p class="col-12" data-v-1a483d87> For this example, let&#39;s imagine we are searching for a shimpent sent to one &#39;Mayor Snibblysmith&#39;. We format our object with the property (key): &#39;recipient&#39; and the value: &#39;Mayor Snibblysmith&#39;. </p><em class="col-11 text-danger lighten-10" data-v-1a483d87>filter object</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> const query = { recipient: &quot;Mayor Snibblysmith&quot; } </div><em class="col-11 text-danger lighten-10 mt-2" data-v-1a483d87>shipment in database</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> {<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> recipient: &quot;Mayor Snibblysmith&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this matches the property in our filter object!</em><br data-v-1a483d87> trackingNumber : &quot;WVR-XK4-r&quot;,<br data-v-1a483d87> fragile : true,<br data-v-1a483d87> shippingTier : &quot;INTERPLANETARY/DOMESTIC&quot;,<br data-v-1a483d87> shippingCost : 25,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87> sector: &quot;X85&quot;,<br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> } </div></div></div><div class="col-11 mt-2" data-v-1a483d87><p data-v-1a483d87> Because that object in the database had a match it would be returned. In the case that we were looking for one package, the database would return the <em data-v-1a483d87>first</em> one. In the case where we are looking for many, it would return <em data-v-1a483d87>all</em> data objects that contain this match. </p><h5 class="col-12 text-warning darken-40 text-start" data-v-1a483d87> Filtering by multiple properties </h5><p data-v-1a483d87> This filter object can have many properties on it and each key value pair will <em data-v-1a483d87>have</em> to match on the data objects in the database. <em data-v-1a483d87>(see fig. b)</em></p><em class="text-warning darken-40" data-v-1a483d87>figure b.</em><div class="row border border-secondary rounded p-2" data-v-1a483d87><p class="col-12" data-v-1a483d87> Note that this filter object has 2 properties it&#39;s filtering by, recipient and sector. In this example only the <b data-v-1a483d87>second</b> object will be included when returned. <em data-v-1a483d87>BOTH</em> key value pairs in the filter object have to match. </p><em class="col-11 text-danger lighten-10" data-v-1a483d87>filter object</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> const query = { recipient: &quot;Mayor Snibblysmith&quot;, sector: &quot;X85&quot; } </div><em class="col-11 text-danger lighten-10 mt-2" data-v-1a483d87>shipments in database</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> [{<br data-v-1a483d87> recipient: &quot;Madam Blackwell&quot;,<br data-v-1a483d87> trackingNumber : &quot;WVR-XK4-r&quot;,<br data-v-1a483d87> fragile : true,<br data-v-1a483d87> shippingTier : &quot;INTERPLANETARY/DOMESTIC&quot;,<br data-v-1a483d87> shippingCost : 25,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> sector: &quot;X85&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this property matches, but is the only one on this data object.</em><br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }, <br data-v-1a483d87> {<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> recipient: &quot;Mayor Snibblysmith&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this matches <abbr title="" data-v-1a483d87></abbr> property in our filter object!</em><br data-v-1a483d87> trackingNumber : &quot;XBA-YT6-l&quot;,<br data-v-1a483d87> fragile : false,<br data-v-1a483d87> shippingTier : &quot;WARP+&quot;,<br data-v-1a483d87> shippingCost : 75,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> sector: &quot;X85&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this also matches a property in our filter object!</em><br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }] </div></div></div><div class="col-11 mt-2" data-v-1a483d87><p data-v-1a483d87> Because only the second data object had matches for both properties in the passed filter object, it will be the only one returned. In the case of trying to find one data object, the more properties included in the data object the more accurate we can be when trying to find. In the case of trying to find many, we can refine our search down to only include results that have both. </p><h5 class="col-12 text-warning darken-40 text-start" data-v-1a483d87> Filtering by multiple values </h5><p data-v-1a483d87> Sometimes this is the opposite of what we want. Sometimes we want to pass multiple values for one key to open our search results to be more inclusive. This too can be done but starts to get more complicated. </p><p data-v-1a483d87> There are a couple ways to achieve a filter object that is more inclusive with it&#39;s results. Take a look at this next example. <em data-v-1a483d87>(fig. c)</em></p><em class="text-warning darken-40" data-v-1a483d87>figure c.</em><div class="row border border-secondary rounded p-2" data-v-1a483d87><p class="col-12" data-v-1a483d87> The filter object this time contains an array of <em data-v-1a483d87>possible</em> values for the key recipient. In this case it will return <em data-v-1a483d87>any</em> packages with either &quot;Mayor Snibblysmith&quot; or &quot;Madam Blackwell&quot; as the recipient. </p><em class="col-11 text-danger lighten-10" data-v-1a483d87>filter object</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> const query = { recipient: [&quot;Mayor Snibblysmith&quot;, &quot;Madam Blackwell&quot;] } </div><em class="col-11 text-danger lighten-10 mt-2" data-v-1a483d87>shipments in database</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> [{<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> recipient: &quot;Madam Blackwell&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this matches one of the values in our filter object array!</em><br data-v-1a483d87> trackingNumber : &quot;WVR-XK4-r&quot;,<br data-v-1a483d87> fragile : true,<br data-v-1a483d87> shippingTier : &quot;INTERPLANETARY/DOMESTIC&quot;,<br data-v-1a483d87> shippingCost : 25,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87> sector: &quot;X85&quot;,<br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }, <br data-v-1a483d87> {<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> recipient: &quot;Mayor Snibblysmith&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this matches one of the values in our filter object array!</em><br data-v-1a483d87> trackingNumber : &quot;XBA-YT6-l&quot;,<br data-v-1a483d87> fragile : false,<br data-v-1a483d87> shippingTier : &quot;WARP+&quot;,<br data-v-1a483d87> shippingCost : 75,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87> sector: &quot;X85&quot;,<br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }] </div></div><p data-v-1a483d87> In the case above, both data objects would be returned. Since they both match at least <em data-v-1a483d87>one</em> of the values passed in the recipient array. </p><h5 class="col-12 text-warning darken-40 text-start" data-v-1a483d87> Filtering using $or </h5><p data-v-1a483d87> Now this works fine if we are looking for shipments by expanding our scope for recipients, but what if we wanted to find include multiple data objects based off of different properties? </p><p data-v-1a483d87> This time we will start to use <em data-v-1a483d87>Mongo Operators</em>. These are identifiable by the <b data-v-1a483d87>$</b> before the operator. While these can complicate our filter objects further still. They allow us to use more logical conditions within our filter object. </p><em class="text-warning darken-40" data-v-1a483d87>figure d.</em><div class="row border border-secondary rounded p-2" data-v-1a483d87><p class="col-12" data-v-1a483d87> Note the <b data-v-1a483d87>$or</b> operator used this time. The formatting of this object is very specific. </p><em class="col-11 text-danger lighten-10" data-v-1a483d87>filter object</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> const query = {$or: [{ recipient:&quot;Mayor Snibblysmith&quot; }, {sector: &quot;X85&quot;}]} </div><em class="col-11 text-danger lighten-10 mt-2" data-v-1a483d87>shipments in database</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> [{<br data-v-1a483d87> recipient: &quot;Madam Blackwell&quot;,<br data-v-1a483d87> trackingNumber : &quot;WVR-XK4-r&quot;,<br data-v-1a483d87> fragile : true,<br data-v-1a483d87> shippingTier : &quot;INTERPLANETARY/DOMESTIC&quot;,<br data-v-1a483d87> shippingCost : 25,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> sector: &quot;X85&quot;, </span><em class="ms-1 text-warning" data-v-1a483d87>this matches the sector filter of the $or!</em><br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }, <br data-v-1a483d87> {<br data-v-1a483d87><span class="bg-warning text-danger p-1 rounded" data-v-1a483d87> recipient: &quot;Mayor Snibblysmith&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>this matches the recipient filter of the $or!</em><br data-v-1a483d87> trackingNumber : &quot;XBA-YT6-l&quot;,<br data-v-1a483d87> fragile : false,<br data-v-1a483d87> shippingTier : &quot;WARP+&quot;,<br data-v-1a483d87> shippingCost : 75,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87> sector: &quot;Z67&quot;,<br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> }] </div></div><p data-v-1a483d87> Once again, in the case above both of these objects would be returned since they both have at least one match with one of the <b data-v-1a483d87>$or</b> conditions. </p><h5 class="col-12 text-warning darken-40 text-start" data-v-1a483d87> Fuzzy String Searching using $regex </h5><p data-v-1a483d87> While there are a lot of <em data-v-1a483d87>Mongo Operators</em> that can be used, we will go over just one more, the <b data-v-1a483d87>$regex</b> operator. The most notable function of the <b data-v-1a483d87>$regex</b> operator allows us to search partial strings, and return matches based upon that partial string. see <em data-v-1a483d87>(fig. e)</em></p><em class="text-warning darken-40" data-v-1a483d87>figure e.</em><div class="row border border-secondary rounded p-2" data-v-1a483d87><p class="col-12" data-v-1a483d87> We might not have the full name of the shipment recipient( or any other string value for that matter). Normally this is a problem cause it will look for an exact match. With this filter object it that is no longer the case. </p><em class="col-11 text-danger lighten-10" data-v-1a483d87>filter object</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> const query = {recipient: { $regex: /Snibblysmith/g }} </div><em class="col-11 text-danger lighten-10 mt-2" data-v-1a483d87>shipment in database</em><div class="col-12 bg-dark lighten-20 border-fig rounded text-primary" data-v-1a483d87> {<br data-v-1a483d87> recipient: &quot;Mayor <span class="bg-warning text-danger p-1 rounded" data-v-1a483d87>Snibblysmith&quot;,</span><em class="ms-1 text-warning" data-v-1a483d87>the Snibblysmith part of the string matches!</em><br data-v-1a483d87> trackingNumber : &quot;WVR-XK4-r&quot;,<br data-v-1a483d87> fragile : true,<br data-v-1a483d87> shippingTier : &quot;INTERPLANETARY/DOMESTIC&quot;,<br data-v-1a483d87> shippingCost : 25,<br data-v-1a483d87> currency : &quot;Union&quot;,<br data-v-1a483d87> insured : true,<br data-v-1a483d87> sector: &quot;X85&quot;,<br data-v-1a483d87> ... <em data-v-1a483d87>properties continue</em><br data-v-1a483d87> } </div></div><p data-v-1a483d87> In the above case, even though there wasn&#39;t a full string match, just matching the &quot;Snibblysmith&quot; part was enough, and will include this shipment in the return. Note that if there were more recipients that included the string &quot;Snibblysmith&quot; they too would be returned. </p><p data-v-1a483d87> Check out the links for more in depth examples of Mongo Projection Operators and more regex. </p><a target="_blank" href="https://docs.mongodb.com/manual/reference/operator/query/" data-v-1a483d87>Mongo Query and Projection Operators</a><a target="_blank" href="https://codeworksacademy.com/fs-student-guide/resources/wk2/04-Regex/" data-v-1a483d87>Codeworks acedemy Regex</a></div>',7),c=[s];function l(a,u,b,h,v,p){return r(),d("div",n,c)}var f=t(i,[["render",l],["__scopeId","data-v-1a483d87"]]);export{f as default};
