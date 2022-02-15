<template>
  <div class="row letter-head flex-column align-items-center p-4">
    <h3 class="col-12 text-warning darken-40 text-center">
      Search the Shipment Database using a 'Mongo' filter object
    </h3>
    <div class="line-break w-75"></div>
    <h5 class="col-12 text-warning darken-40 text-start">
      What is a filter object?
    </h5>
    <p class="col-11">
      The C.U.P.S Central Processing Matrix Server Appliance (CUPSCPMSA) allows
      for a user to submit a formatted object to search the lost shipment
      database instead of a query url. this object will can be formatted in such
      a way to have matching 'key' and 'value' pairs with shipments in the
      database. Here is an example <em>(fig.a)</em>
    </p>
    <div class="col-11">
      <em class="text-warning darken-40">figure a.</em>
      <!-- STUB fig a -->
      <div class="row border border-secondary rounded p-2">
        <p class="col-12">
          For this example, let's imagine we are searching for a shimpent sent
          to one 'Mayor Snibblysmith'. We format our object with the property
          (key): 'recipient' and the value: 'Mayor Snibblysmith'.
        </p>
        <em class="col-11 text-danger lighten-10">filter object</em>
        <div class="col-12 bg-dark lighten-20 border-fig rounded text-primary">
          const query = { recipient: "Mayor Snibblysmith" }
        </div>
        <em class="col-11 text-danger lighten-10 mt-2">shipment in database</em>
        <div class="col-12 bg-dark lighten-20 border-fig rounded text-primary">
          {<br />
          <span class="bg-warning text-danger p-1 rounded">
            recipient: "Mayor Snibblysmith",</span
          >
          <em class="ms-1 text-warning"
            >this matches the property in our filter object!</em
          ><br />
          trackingNumber : "WVR-XK4-r",<br />
          fragile : true,<br />
          shippingTier : "INTERPLANETARY/DOMESTIC",<br />
          shippingCost : 25,<br />
          currency : "Union",<br />
          insured : true,<br />
          sector: "X85",<br />
          ... <em>properties continue</em><br />
          }
        </div>
      </div>
    </div>
    <div class="col-11 mt-2">
      <p>
        Because that object in the database had a match it would be returned. In
        the case that we were looking for one package, the database would return
        the <em>first</em> one. In the case where we are looking for many, it
        would return <em>all</em> data objects that contain this match.
      </p>
      <p>
        This filter object can have many properties on it and each key value
        pair will <em>have</em> to match on the data objects in the database.
        <em>(see fig. b)</em>
      </p>
      <!-- STUB fig b -->
      <div class="row border border-secondary rounded p-2">
        <p class="col-12">
          Note that this filter object has 2 properties it's filtering by,
          recipient and sector. In this example only the <b>second</b> object
          will be included when returned. <em>BOTH</em> key value pairs in the
          filter object have to match.
        </p>
        <em class="col-11 text-danger lighten-10">filter object</em>
        <div class="col-12 bg-dark lighten-20 border-fig rounded text-primary">
          const query = { recipient: "Mayor Snibblysmith", sector: "X85" }
        </div>
        <em class="col-11 text-danger lighten-10 mt-2"
          >shipments in database</em
        >
        <div class="col-12 bg-dark lighten-20 border-fig rounded text-primary">
          [{<br />
          recipient: "Madam Blackwell",<br />
          trackingNumber : "WVR-XK4-r",<br />
          fragile : true,<br />
          shippingTier : "INTERPLANETARY/DOMESTIC",<br />
          shippingCost : 25,<br />
          currency : "Union",<br />
          insured : true,<br />
          <span class="bg-warning text-danger p-1 rounded">
            sector: "X85",</span
          >
          <em class="ms-1 text-warning"
            >this property matches, but is the only one on this data object.</em
          ><br />
          ... <em>properties continue</em><br />
          }, <br />
          {<br />
          <span class="bg-warning text-danger p-1 rounded">
            recipient: "Mayor Snibblysmith",</span
          >
          <em class="ms-1 text-warning"
            >this matches <abbr title=""></abbr> property in our filter
            object!</em
          ><br />
          trackingNumber : "XBA-YT6-l",<br />
          fragile : false,<br />
          shippingTier : "WARP+",<br />
          shippingCost : 75,<br />
          currency : "Union",<br />
          insured : true,<br />
          <span class="bg-warning text-danger p-1 rounded">
            sector: "X85",</span
          >
          <em class="ms-1 text-warning"
            >this also matches a property in our filter object!</em
          ><br />
          ... <em>properties continue</em><br />
          }]
        </div>
      </div>
    </div>
    <div class="col-11 mt-2">
      <p>
        Because only the second data object had matches for both properties in
        the passed filter object, it will be the only one returned. In the case
        of trying to find one data object, the more properties included in the
        data object the more accurate we can be when trying to find. In the case
        of trying to find many, we can refine our search down to only include
        results that have both.
      </p>
      <p>
        Sometimes this is the opposite of what we want. Sometimes we want to
        pass multiple values for one key to open our search results to be more
        inclusive. This too can be done but starts to get more complicated.
      </p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    const state = reactive({

    })
    return { state }
  }
};
</script>


<style scoped>
.letter-head {
  min-height: 100%;
  background: linear-gradient(0deg, #fdf4d6cb 0%, #fdf4d6cb 00%),
    url("../assets/img/CUPS-Logo.png");
  background-position: center center;
  background-size: 100%, 50%;
  background-repeat: no-repeat no-repeat;
}

.line-break {
  margin-top: 1em;
  margin-bottom: 1em;
  height: 0px;
  outline: 2px dashed var(--bs-warning);
}

.border-fig {
  border: 2px dashed var(--bs-warning);
}
</style>

