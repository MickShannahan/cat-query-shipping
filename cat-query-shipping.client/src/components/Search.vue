<template>
  <div
    class="
      computer
      row
      justify-content-around
      bg-primary
      shadow
      physical-border
      p-3
      pb-1
    "
  >
    <div class="col-12 search mb-3">
      <div class="d-flex">
        <label for="basic-url" class="form-label bg-info rounded py-1 px-3"
          >make a query to find the lost shipment</label
        >
        <button
          :disabled="unlockMongo"
          :class="{ 'cursor-locked': unlockMongo }"
          class="switch-button comp-button ms-auto mb-2 p-1 px-2"
          type="button"
          @click="switchScreen"
        >
          mongo
        </button>
      </div>
      <div id="tour-search" class="input-group text-info">
        <span class="input-group-text bg-dark text-success" id="basic-addon3">{{
          baseUrl
        }}</span>
        <!-- STUB search input -->
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
    </div>

    <div
      class="
        col-8
        screen
        bg-black
        rounded
        glow
        p-2
        text-success
        no-click
        clip-text
      "
      v-html="httpQuery"
    ></div>
    <button class="col-1 comp-button comp-yellow" @click="clearInput">
      clear
    </button>
    <button
      class="col-2 comp-button comp-green"
      :class="{ 'cursor-invalid-url': unsafeUrl }"
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
import { Emitter } from 'monaco-editor';
import Pop from '../utils/Pop';
export default {
  setup(props, { emit }) {
    const query = ref('?')
    const httpQuery = ref('?')
    const unsafeUrl = ref(false)
    return {
      query,
      httpQuery,
      unsafeUrl,
      unlockMongo: computed(() => !AppState.account.unlocks?.includes('mongo-terminal')),
      baseUrl: computed(() => AppState.baseUrl),
      async searchShipmentDatabase() {
        try {
          await shipmentService.searchShipmentDatabase(query.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error)
        }
      },
      clearInput() {
        query.value = '?'
        httpQuery.value = '?'
      },
      switchScreen() {
        logger.log('search switch')
        emit('switch')
      },
      httpValidizer() {
        if (!query.value.startsWith('?')) query.value += '?'
        let regx = /\[|\]|\{|\}|\\|\||\<|\>|\%|\^| |\&|\$|\+|,|\/|\?|\:|\;|\=|\@/g
        let unsafeRgx = /\[|\]|\{|\}|\\|\||\<|\>|\^| /g
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
// .bg-primary {
//   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%235da3ac' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
// }

input {
  &:valid {
    border: 1px solid var(--bs-info);
  }
}

.computer {
  min-height: 25vh;
}

.text-chrome {
  color: var(--bs-primary);
  text-shadow: 0px -1px 0px #315f8a, 0px 1px 0px #55a6a8;
}
</style>
