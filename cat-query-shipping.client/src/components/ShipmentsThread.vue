<template>
  <div class="row px-3 results-thread justify-content-center">
    <div class="col-lg-10 rounded p-0 printer-sides px-5 mx-3" :class="{'printer-sides-loading': stateLoading}">
      <div class="row p-2 printer">
          <div
      class="offset-2 col-6 col-lg-4 results screen text-center  p-1 rounded"
      :class="{
        'text-primary': hits == 1,
        'text-info': hits < 5,
        'text-warning': hits > 10 && hits < 24,
        'text-danger': hits > 25 || hits == 0,
      }"
    >
      Matching Records : {{ hits }} <span v-if="hits == 50">MAX</span>
    </div>
      </div>
    </div>
    <div class="col-8 printer-port">
      <div class="printer-hole"></div>
      <transition-group name="shipments">
        <Shipment
          v-for="s in shipments"
          :key="s.trackingNumber"
          :shipment="s"
          class="shipments-item"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {

    return {
      stateLoading: computed(()=> AppState.loading),
      shipments: computed(() => AppState.searchResults.results),
      hits: computed(() => AppState.searchResults.hits)
    }
  }
};
</script>


<style lang='scss' scoped>
.results-thread{
  max-width: 90em;
  margin-left: auto;
  margin-right: auto;
}

.printer{

  background: url('../assets/img/PrinterBody.png');
  background-size: contain;
  image-rendering: pixelated;
  min-height: 8em;
}

.printer-sides{
  background: url('../assets/img/PrinterSides.png');
  background-size: contain;
  image-rendering: pixelated;
  background-repeat: round;
}

.printer-sides-loading{
  background: url('../assets/img/PrinterSidesLoading.gif');
  background-size: contain;
  image-rendering: pixelated;
  background-repeat: round;
}

.printer-port{
  transform: translateY(-3em);
}

.printer-hole{
  min-height: 1em;
  border-radius: 45px;
  width: 100%;
  background-color: var(--bs-dark);
   border-top: 6px inset #fd8732;
  border-left: 6px inset #fd8732;
  border-bottom: 6px inset #ffcf48;
  border-right: 6px inset #ffcf48;
}

.screen{
  height: 3em;
  outline: 2px solid #f2962f;
  background-color: rgb(22, 54, 45);
  box-shadow: inset 0px 0px 5px var(--bs-info);
   border-top: 4px inset #fd8732;
  border-left: 4px inset #fd8732;
  border-bottom: 4px inset #ffcf48;
  border-right: 4px inset #ffcf48;
}

.shipments-item {
  transition: all 0.1s ease;
  display: inline-block;
  margin-right: 10px;
  transform: translateY(-5px);
}

.shipments-enter-from,
.shipments-leave-to {
  opacity: 0;
  transform: scaleY(20%) translateY(-20em);
}

.shipments-leave-active {
  position: absolute;
}
</style>
