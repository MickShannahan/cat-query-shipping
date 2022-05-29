<template>
  <div class="timer">
    <div class="row">
      <div
        class="col-6 glitch-text clip-text"
        :data-text="`${face} - ${phrase}`"
      >
        {{ face }} - {{ phrase }}
      </div>
      <div class="col-6 timer-progress">
        <div
          class="timer-count text-warning"
          :class="{ 'text-info': glitchData.timeLimit - timer > 20 }"
        >
          {{ (glitchData.timeLimit - timer).toFixed(2) }}
        </div>
        <div
          class="timer-bar text-end bg-warning"
          :class="{ 'bg-info': glitchData.timeLimit - timer > 20 }"
        ></div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from '@vue/runtime-core';
import Pop from '../../utils/Pop';
import { shipmentService } from '../../services/ShipmentService';
import { AppState } from '../../AppState';
import { logger } from '../../utils/Logger';
export default {
  setup() {
    const interval = ref(null)
    const intervalFace = ref(null)
    const timer = ref(0)
    const faceI = ref(0)
    const phraseI = ref(0)
    const glitchData = computed(() => AppState.lostShipment?.glitchData || {})
    const faces = computed(() => AppState.lostShipment.glitchData?.faces)
    const face = computed(() => AppState.lostShipment.glitchData?.faces[faceI.value])
    const phrases = computed(() => AppState.lostShipment.glitchData?.phrases)
    const phrase = computed(() => AppState.lostShipment.glitchData?.phrases[phraseI.value])
    onMounted(() => {
      if (!interval.value) {
        interval.value = setInterval(() => {
          timer.value += .01
          if (timer.value > glitchData.value.timeLimit) {
            interval.value = clearInterval(interval.value)
            intervalFace.value = clearInterval(intervalFace.value)
            timer.value = glitchData.value.timeLimit
            if (timer.value == glitchData.value.timeLimit) {
              Pop.toast('Too Slow Joe, maybe next time!', 'error', 'center')
              shipmentService.getLostShipment()
              AppState.searchResults = []
            }
          }
        }, 10)
      }
      if (!intervalFace.value) {
        intervalFace.value = setInterval(() => {
          faceI.value = Math.floor(Math.random() * faces.value.length)
          phraseI.value = Math.floor(Math.random() * phrases.value.length)
        }, 10000)
      }
    })
    return {
      glitchData,
      faces, face, faceI,
      phrases, phrase, phraseI,
      interval, intervalFace,
      timer,
      barWidth: computed(() => 100 - Math.round((timer.value / glitchData.value.timeLimit) * 100) + '%')
    }
  }
};
</script>


<style lang="scss" scoped>
.timer-count {
  text-align: end;
  transition: width 0.95s linear;
  width: v-bind(barWidth);
}
.timer-bar {
  transition: width 0.95s linear;
  width: v-bind(barWidth);
  height: 3px;
}
</style>
