<template>
  <div
    class="
      row
      justify-content-around
      bg-primary
      rounded
      shadow
      physical-border
      p-3
      pb-1
    "
  >
    <form class="col-12 search mb-3">
      <label for="basic-url" class="form-label bg-info rounded py-1 px-3"
        >make a query to find the lost shipment</label
      >
      <div class="input-group">
        <span class="input-group-text bg-dark text-success" id="basic-addon3">{{
          baseUrl
        }}</span>
        <input
          spellcheck="false"
          autocomplete="off"
          v-model="query"
          type="text"
          class="form-control bg-dark text-info"
          id="basic-url"
          aria-describedby="basic-addon3"
          @input="httpValidizer"
        />
      </div>
    </form>

    <div
      class="col-8 screen bg-black rounded glow p-2 text-success"
      v-html="httpQuery"
    ></div>
    <button class="col-1 comp-button comp-yellow" @click="clearInput">
      clear
    </button>
    <button
      class="col-2 comp-button comp-green"
      :disabled="unsafeUrl"
      @click="searchShipmentDatabase"
    >
      search
    </button>
    <div class="col-12 p-3 font-yellowtail text-chrome">
      hindsight transprot tracking puter 2
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref } from 'vue';
import { shipmentService } from '../services/ShipmentService'
import { Shipment } from '../models/Shipment';
import { logger } from '../utils/Logger'
export default {
  setup() {
    const query = ref('?')
    const httpQuery = ref('?')
    const unsafeUrl = ref(false)
    return {
      query,
      httpQuery,
      unsafeUrl,
      baseUrl: computed(() => AppState.baseUrl),
      searchShipmentDatabase() {
        shipmentService.searchShipmentDatabase(query.value)
      },
      clearInput() {
        query.value = '?'
        httpQuery.value = '?'
      },
      httpValidizer() {
        if (!query.value.startsWith('?')) query.value += '?'
        let regx = /\[|\]|\{|\}|\\|\||\<|\>|\%|\^| |\&|\$|\+|,|\/|\?|\:|\;|\=|\@/g
        let unsafeRgx = /\[|\]|\{|\}|\\|\||\<|\>|\%|\^| /g
        let reservedRgx = /\&|\$|\+|,|\/|\?|\:|\;|\=|\@/g
        let validKey = Shipment.regex()
        let str = query.value
        unsafeUrl.value = unsafeRgx.test(str) ? true : false
        str = str.replace(regx, (m) => {
          if (m == ' ') {
            return `<span style="background-color: #DD5F57;color: #DD5F57; ">_</span>`
          }
          if (unsafeRgx.test(m)) {
            return `<span style="color: #DD5F57;">${m}</span>`
          }
          return `<span style="color: #FBE8A5;">${m}</span>`
        })
        str = str.replace(validKey, (m) => {
          return `<span style="color: #A4D5A5;">${m}</span>`
        })
        httpQuery.value = str
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.glow {
  text-shadow: 0px 0px 2px var(--bs-info);
}

.screen {
  min-height: 1em;
  border-top: 5px solid #315f8a;
  border-left: 5px solid #315f8a;
  border-bottom: 5px solid #55a6a8;
  border-right: 5px solid #55a6a8;
}

.comp-button {
  cursor: pointer;
  text-shadow: 0px 0px 2px rgba(32, 32, 32, 0.589);
  color: var(--bs-dark);
  background: rgb(255, 255, 226);
  border: 1px solid;
  border-radius: 10px;
  transform-style: preserve-3d;
  transform: translate3d(0em, -0.5em, -1em);
  transition: all 150ms cubic-bezier(0, 0, 0.58, 1);
}
.comp-button::before {
  position: absolute;
  content: "";
  width: 102%;
  height: 102%;
  top: -1px;
  left: -1px;
  border-radius: inherit;
  outline: 3px inset #55a6a8;
  transition: all 150ms cubic-bezier(0, 0, 0.58, 1);
  transform: translate3d(0, 0.75em, -1em);
}
.comp-button:disabled {
  background: rgb(189, 189, 189);
  cursor: not-allowed;
}
.comp-button:hover {
  transform: translate3d(0, -0.35em, -1em);
}
.comp-button:hover::before {
  transform: translate3d(0, 0.6em, -1em);
}
.comp-button:active {
  transform: translate3d(0em, 0.25em, -1em);
}
.comp-button:active::before {
  transform: translate3d(0, 0, -0.75em);
}

.comp-green {
  box-shadow: inset 0px 0px 25px 10px #a4d5a5;
  border-color: #bde4b1;
}
.comp-green:hover {
  box-shadow: inset 0px 0px 25px 2px #a4d5a5;
}

.comp-green::before {
  background: #84b699;
}

.comp-yellow {
  box-shadow: inset 0px 0px 25px 10px #fbe8a5;
  border-color: #fff1c1;
}
.comp-yellow:hover {
  box-shadow: inset 0px 0px 25px 2px #fbe8a5;
}

.comp-yellow::before {
  background: #ebc390;
}

.physical-border {
  border-top: 5px solid #55a6a8;
  border-left: 5px solid #55a6a8;
  border-right: 5px solid #315f8a;
  border-bottom: 5px solid #315f8a;
}

.text-chrome {
  color: var(--bs-primary);
  text-shadow: 0px -1px 0px #315f8a, 0px 1px 0px #55a6a8;
}
</style>
