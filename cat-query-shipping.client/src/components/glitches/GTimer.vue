<template>
  <div class="timer">
    timer glitch {{ (glitchData.timeLimit - timer).toFixed(2) }}
  </div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import Pop from '../../utils/Pop';
import { shipmentService } from '../../services/ShipmentService';
import { AppState } from '../../AppState';
export default {
  setup() {
    const interval = ref(null)
    const timer = ref(0)
    onMounted(() => {
      if (!interval.value) {
        interval.value = setInterval(() => {
          timer.value += .01
          if (timer.value >= glitchData.timeLimit) {
            interval.value = clearInterval(interval.value)
            Pop.toast('Too Slow Joe, maybe next time!', 'error', 'center')
            timer.value = glitchData.timeLimit
            // shipmentService.getLostShipment()
          }
        }, 10)
      }
    })
    let glitchData = computed(() => AppState.lostShipment?.glitchData || {})
    return {
      glitchData,
      interval,
      timer
    }
  }
};
</script>


<style lang="scss" scoped>
</style>
