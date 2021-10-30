<template>
  <div class="row px-3 results-thread justify-content-center">
    <div
      class="col-1 text-center bg-dark p-1 rounded"
      :class="{
        'text-primary': hits == 1,
        'text-info': hits < 5,
        'text-warning': hits > 10 && hits < 24,
        'text-danger': hits > 25 || hits == 0,
      }"
    >
      Hits {{ hits }} <span v-if="hits == 50">MAX</span>
    </div>
    <div class="col-12">
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
      shipments: computed(() => AppState.searchResults.results),
      hits: computed(() => AppState.searchResults.hits)
    }
  }
};
</script>


<style lang='scss' scoped>
// .item {
//   transition: all 0.6s ease;
//   width: 100%;
// }

// .shipments-enter-active,
// .shipments-leave-active {
//   transition: all 0.5s ease;
//   position: absolute;
// }
// .shipments-enter-from,
// .shipments-leave-to {
//   opacity: 0;
//   transform: rotate3d(1, 0, 0, 80deg) translateY(-10em);
// }
.shipments-item {
  transition: all 0.1s ease;
  display: inline-block;
  margin-right: 10px;
}

.shipments-enter-from,
.shipments-leave-to {
  opacity: 0;
  transform: scaleY(20%) translateY(-10em);
}

.shipments-leave-active {
  position: absolute;
}
</style>
