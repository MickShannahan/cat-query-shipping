<template>
  <div class="scrambler">
    <div class="row">
      <div class="col-4 glitch-text clip-text" :data-text="`${faces[personality[0]]} - ${phrases[personality[1]]}`">
        <span>{{ faces[personality[0]] }} {{ phrases[personality[1]] }}</span>
      </div>
      <div class="col-8 ">
        <marquee class="text-warning">
          {{ scrambleText }}
        </marquee>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
export default {
  setup() {
    const personality = ref([0, 0])
    const glitchData = computed(() => AppState.lostShipment.glitchData)
    const faces = computed(() => glitchData.value.faces)
    const phrases = computed(() => glitchData.value.phrases)
    const shipment = computed(() => AppState.lostShipment)
    const scrambleData = computed(() => AppState.lostShipment.glitchData.scrambleData)
    const scramblePrint = computed(() => AppState.lostShipment.glitchData.scramblePrint)
    const scrambleText = computed(() => Object.keys(scrambleData.value).map(x => `${x}=>${scrambleData.value[x]}`).join('|'))
    function changePersonality(face, text) {
      personality.value[0] = face || Math.floor(Math.random() * glitchData.value.faces.length)
      personality.value[1] = text || Math.floor(Math.random() * glitchData.value.phrases.length)
      setTimeout(changePersonality, (Math.random() * 5000) + 2000)
    }
    onMounted(() => {
      changePersonality()
      setTimeout(() => {
        for (let key in scrambleData.value) {
          let firstElm = document.getElementById(key + '-value')
          let textOne = firstElm?.innerText
          let secondElm = document.getElementById(scrambleData.value[key] + '-value')
          let textTwo = secondElm?.innerText
          if (firstElm && secondElm) {
            // logger.log('swaping', key, 'and', scrambleData.value[key])
            firstElm.innerText = textTwo
            secondElm.innerText = textOne
            firstElm.classList.add('scrambled')
            secondElm.classList.add('scrambled')
          }
        }
      }, 500)
      const title = "Scrambler Glitch?"
      AppState.chatTree[title] = {
        text: "Where do I begin?  It's all a game to this glitch. It's like going to Callisto Cal's Casino Station and getting hustled by the three mouse monte dealers. Loosing all the credits you won on slot's that cycle's end... you know hypothetically speaking... The information has been swapped and then swapped again. Then the little fellow has the gall to tell you his exact moves, just to see if you can follow along, like that will help. It moves by so fast who can keep track anyways? And sometimes he doesn't even move the mouse but makes it look like a move and is that even legal?! It still hurts thinking about those credits I- *cough* that could get away if you don't find this package. Good luck kid.",
        branches: ['[Go Back]']
      }
      AppState.chatTree['[glitch]'] = {
        text: "Looks like this shipment is glitched. Glitches attach to damaged shipments and all have their own unique personalities. These glitches can range from annoying to dangerous and should be handled with EXTRA care. Glitches also mess up your response manifest, always returning more shipments than you actually pinged. Don't worry though this doesn't effect your record, plus finding a glitched shipments is worth more credits!",
        branches: [title]
      }
      AppState.bozNotification = ['[glitch]']
    })
    return { faces, phrases, personality, scrambleText }
  }
};
</script>


<style lang="scss">
@import "../../assets/scss/main.scss";

.scrambled {
  animation: 6s ease-in 5s infinite forwards both scramble;
}

@keyframes scramble {

  94% {
    text-shadow: 0px 0px 0px $warning;
  }

  95% {
    text-shadow: 0px -4px 0px $warning;
  }

  96% {
    text-shadow: 0px 4px 0px $warning;
  }

  97% {
    text-shadow: 3px 0px 0px $warning;
  }

  98% {
    text-shadow: 0px 0px 0px $warning;
  }

  100% {
    text-shadow: 3px 0px 0px $warning;
  }
}
</style>
