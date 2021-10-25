<template>
  <div
    class="
      row
      component
      justify-content-end
      m-2
      bg-warning
      lightne-20
      rounded
      p-2
    "
  >
    <div class="col-6" v-for="(value, key) in lostShipment" :key="key">
      <b class="hover" @click="copy">{{ key }}</b>
      <span> : </span>
      <span class="hover text-dark lighten-20" @click="copy">{{ value }}</span>
    </div>
    <button class="col-3 btn btn-outline-primary" @click="getNewLostShipment">
      get new shipment
    </button>
  </div>
</template>


  <script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { shipmentService } from '../services/ShipmentService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
  setup() {

    return {
      lostShipment: computed(() => {
        delete AppState.lostShipment?.id
        delete AppState.lostShipment?.__v
        return AppState.lostShipment
      }),
      getNewLostShipment() {
        shipmentService.getLostShipment()
      },
      copy() {
        let elem = event.target
        logger.log(elem)
        navigator.clipboard.writeText(elem.innerText)
        Pop.toast('copied ' + elem.innerText)
      }
    }
  }
};
</script>


<style scoped>
.hover {
  padding: 3px;
  border-radius: 5px;
  transition: all 0.15s ease;
}

.hover:hover {
  background: #2a2f32;
  color: #a4d5a5 !important;
  transform: translate(0, -2);
}
</style>
