<template>
  <div class="row letter-head flex-column align-items-center p-4">
    <h3 class="col-11 text-primary text-center">
      Query the Shipment Database using the HTTP Terminal
    </h3>
    <div class="line-break w-75"></div>
    <h5 class="col-11 text-primary text-start">What is it?</h5>
    <p class="col-10">
      The trade tool of choice for each shipment sleuth here at C.U.P.S is the
      HTTP Terminal. Each C.U.P.S employee is is assigned a top of the line
      'hindsight transport tracking puter 2', powered by a K.i.t-10 processor.
      These machines are capable of pinging all registered satellites and
      stations within a 10 quadrants. Those pings bounce to other satellites in
      their range and so on and so forth until eventually all bounce back to the
      terminal. These are compiled then the results are printed out.
    </p>
    <h5 class="col-11 text-primary text-start">How to use it</h5>
    <div class="col-10">
      The HTTP terminal allows users to query the shipment database by typing in
      thier own query components into the URL. The query component (seen bellow
      in black) contains non-hierarchical data that, along with data in the path
      component (seen bellow in blue), serves to identify a resource within the
      scope of the URI's scheme and naming authority (if any). The query
      component is indicated by the first question mark ("?") character and
      terminated by a number sign ("#") character or by the end of the URI.
      Query components are often used to carry identifying information in the
      form of "key=value" pairs. Pictured bellow, the database will be searched
      for all Shipments where the 'recipient' is 'Snibblysmith'.
      <div class="input-group border border-primary rounded">
        <span
          class="input-group-text bg-primary-lighten text-secondary"
          id="basic-addon3"
          >https://yourdomainhere.com/api/collection</span
        >
        <input
          disabled
          type="text"
          class="form-control bg-light-blue text-info"
          placeholder="?recipient=Snibblysmith"
        />
      </div>
    </div>
    <h5 class="col-11 text-primary text-start mt-3">Advanced Use</h5>
    <div class="col-10">
      Well rounded shipment searchers will often want to search using more than
      just one query 'parameter' or key=value pair. When this is the case the
      reserved character '&' is used. This signifies another field to search by.
      Pictured bellow the query component is made up of two parameters; the
      recipient Snibblysmith and the planet Magrathea. the search will return
      all shipments where the recipient field is 'Snibblysmith' AND the planet
      field is 'Magrathea'. This is useful as there are many shipments sent to
      Magrathea and there are many Snibblysmiths in the galaxy. Simply searching
      one at a time might not offer a useful result.
      <div class="input-group border border-primary rounded">
        <span
          class="input-group-text bg-primary-lighten text-secondary"
          id="basic-addon3"
          >https://yourdomainhere.com/api/collection</span
        >
        <input
          disabled
          type="text"
          class="form-control bg-light-blue text-info"
          placeholder="?recipient=Snibblysmith&planet=Magrathea"
        />
      </div>
    </div>
    <h5 class="col-11 text-primary text-start mt-3">Special Characters</h5>
    <div class="col-10">
      Not all characters on your Terminal's paw typer interface are able to be
      used in queries let alone URLs. Certain characters have special uses
      within the URL and must be changed out to keep our URL safe. Your
      state-of-the-art HTTP terminal has a build in character colorizer. The
      secondary screen below the input screen, will highlight when both
      'reserved' characters and 'unsafe' characters are detected. Unsafe
      characters will be highlighted in
      <span class="text-danger darken-10">red</span> and reserved characters are
      highlighted in <span class="text-warning darken-40">yellow</span>. An
      added feature is that searchable fields will be highlighted in
      <span class="text-info darken-30"> light green</span>. Unsafe characters
      cannot be sent in the URL and if one is spotted, the search function will
      lock up. While reserved characters are allowed to be sent, in the wrong
      place can cause errors. Take a look at the table bellow for both reserved
      and unsafe characters, and their encoded versions for when they need to be
      used within our queries.
      <div
        class="row bg-primary-lighten border border-primary text-primary mt-3"
      >
        <div class="col-2">character</div>
        <div class="col-2">replacement</div>
        <div class="col-3">type</div>
        <div class="col-5">usage</div>
      </div>
      <div v-for="c in chars" :key="c.char" class="row border border-primary">
        <div class="col-2">{{ c.char }}</div>
        <div class="col-2">{{ c.replace }}</div>
        <div class="col-2">{{ c.type }}</div>
        <div class="col-6">{{ c.usage }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    const chars = computed(() => [
      { char: '?', replace: '%3F', type: 'reserved', usage: 'signifies start of query component' },
      { char: '&', replace: '%26', type: 'reserved', usage: 'used to chain multiple query parameters' },
      { char: '=', replace: '%3D', type: 'reserved', usage: 'seperates key value pary of query parameter' },
      { char: 'SPACE', replace: '%20 or +', type: 'unsafe', usage: '' },
      { char: '!', replace: '%21', type: 'reserved', usage: '' },
      { char: '$', replace: '%24', type: 'reserved', usage: '' },
      { char: '\'', replace: '%27', type: 'reserved', usage: '' },
      { char: '(', replace: '%28', type: 'reserved', usage: '' },
      { char: ')', replace: '%29', type: 'reserved', usage: '' },
      { char: '*', replace: '%2A', type: 'reserved', usage: '' },
      { char: '+', replace: '%2B', type: 'reserved', usage: '' },
      { char: ',', replace: '%2C', type: 'reserved', usage: '' },
      { char: '/', replace: '%2F', type: 'reserved', usage: '' },
      { char: ':', replace: '%3A', type: 'reserved', usage: '' },
      { char: ';', replace: '%3B', type: 'reserved', usage: '' },
      { char: '@', replace: '%40', type: 'reserved', usage: '' },
      { char: '[', replace: '%5B', type: 'reserved', usage: '' },
      { char: ']', replace: '%5D', type: 'reserved', usage: '' },
      { char: '"', replace: '%22', type: 'unsafe', usage: '' },
      { char: '<', replace: '%3C', type: 'unsafe', usage: '' },
      { char: '>', replace: '%3E', type: 'unsafe', usage: '' },
      { char: '#', replace: '%23', type: 'unsafe', usage: '' },
      { char: '%', replace: '%25', type: 'unsafe', usage: '' },
      { char: '|', replace: '%7C', type: 'unsafe', usage: '' },
      { char: '^', replace: '%5E', type: 'unsafe', usage: '' },
      { char: '\\', replace: '%5C', type: 'unsafe', usage: '' },
    ])
    return { chars }
  }
};
</script>


<style lang="scss" scoped>
.line-break {
  margin-top: 1em;
  margin-bottom: 1em;
  height: 0px;
  outline: 2px dashed var(--bs-primary);
}

.bg-light-blue {
  background: #d5e4f0e5;
}

.bg-primary-lighten {
  background: #afcbd6;
}

.letter-head {
  min-height: 100%;
  background: linear-gradient(0deg, #d5e4f0e5 0%, #d5e4f0e5 100%),
    url("../assets/img/CUPS-Logo.png"),
    url("../assets/img/Textures/light-paper-fibers.png");
  background-position: center center;
  background-size: 100%, 50%, 200%;
  background-repeat: no-repeat no-repeat;
}
</style>
