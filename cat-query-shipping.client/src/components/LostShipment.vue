<template>
  <div class="row m-2 p-2">
    <div class="col-12 p-2 paper-edge py-0">
      <div class="row justify-content-end p-2 mx-5 bg-warning lightne-20">
        <div class="col-6" v-for="(value, key) in lostShipment" :key="key">
          <b class="hover" @click="copy">{{ key }}</b>
          <span> : </span>
          <span class="hover text-dark lighten-20" @click="copy">{{
            value
          }}</span>
        </div>
        <button
          class="col-3 btn btn-outline-primary"
          @click="getNewLostShipment"
        >
          get new shipment
        </button>
      </div>
    </div>
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
.paper-edge {
  height: 100%;
  background-image: url("../assets/img/yellowPageEdge.png");
  background-repeat: space repeat;
  image-rendering: pixelated;
  background-size: 8em;
}

.component {
  position: relative;
}

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
