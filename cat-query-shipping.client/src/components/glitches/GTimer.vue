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
import { arrRandom, randI } from '../../utils/logic'
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
              logger.log('out of time', timer.value, glitchData.value.timeLimit)
              Pop.toast(glitchData.value.lossFace + ' - ' + arrRandom(glitchData.value.lossPhrases), 'error', 'center')
              shipmentService.getLostShipment()
              AppState.searchResults = []
            }
          }
        }, 10)
      }
      if (!intervalFace.value) {
        intervalFace.value = setInterval(() => {
          faceI.value = randI(faces.value)
          phraseI.value = randI(phrases.value)
        }, 10000)
      }
      const title = "Timer Glitch?"
      AppState.chatTree[title] = {
        text: "The timer glitch, internally known as 'Toby' is an elusive one. Caught up in some sort of time dilation, it's looking to get lost quick. If you don't find it before the clock runs down then that's it, lost again.  Well why are you just standing there? By now this 'Toby' is already half way to the outer belts!",
        branches: ['[Go Back]']
      }
      AppState.chatTree['[glitch]'] = {
        text: "Looks like this shipment is glitched. Glitches attach to damaged shipments and all have their own unique personalities. These glitches can range from annoying to dangerous and should be handled with EXTRA care. Glitches also mess up your response manifest, always returning more shipments than you actually pinged. Don't worry though this doesn't effect your record, plus finding a glitched shipments is worth more credits!",
        branches: [title]
      }
      AppState.bozNotification = ['[glitch]']
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
