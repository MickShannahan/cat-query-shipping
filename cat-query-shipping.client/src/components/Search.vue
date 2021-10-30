<template>
  <form class="search" @submit.prevent="searchShipmentDatabase">
    <label for="basic-url" class="form-label bg-info rounded py-1 px-3"
      >make a query to find the lost shipment</label
    >
    <div class="input-group mb-3">
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
      <button class="btn btn-info" :disabled="unsafeUrl">search</button>
    </div>
  </form>
  <div class="bg-black rounded glow p-2 text-success" v-html="httpQuery"></div>
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
    const httpQuery = ref('')
    const unsafeUrl = ref(false)
    return {
      query,
      httpQuery,
      unsafeUrl,
      baseUrl: computed(() => AppState.baseUrl),
      searchShipmentDatabase() {
        shipmentService.searchShipmentDatabase(query.value)
      },
      httpValidizer() {
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
</style>
