<template>
  <div class="burner">
    <div class="row">
      <div class="col-6 glitch-text" :data-text="faces[0]">
        <span>{{ faces[0] }} {{ phrases[0] }}</span>
      </div>
      <div class="col-6 text-danger">
        <span v-for="b in glitchData.burned" :key="b">{{ b }} </span>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../../AppState';
import { onMounted, watchEffect } from '@vue/runtime-core';
import { logger } from '../../utils/Logger';
export default {
  setup() {
    const glitchData = computed(() => AppState.lostShipment.glitchData)
    const faces = computed(() => glitchData.value.faces)
    const phrases = computed(() => glitchData.value.phrases)
    const inputField = ref('')
    watchEffect(() => {
      let inputBox = document.getElementById('basic-url') || document.getElementById('code-window')
      inputBox.addEventListener('keydown', keyPress)
      inputField.value = inputBox.value
    })
    function keyPress(event) {
      logger.log(event.key)
      if (glitchData.value.burned.includes(event.key)) {
        logger.log('burned key', event.key)
        event.target.value = inputField.value
      } else if (event.key.length < 2) {
        inputField.value += event.key
        glitchData.value.burned.push(event.key)
      } else if (event.key == 'Backspace') {
        inputField.value = inputField.value.slice(0, inputField.value.length - 2)
      }
    }
    function burnLetters() {
      let screen = document.getElementById('shipment-details')
      let keys = screen.querySelectorAll('.key')
      let vals = screen.querySelectorAll('.value')
      vals.forEach(v => {
        logger.log(v.textContent)
        let text = v.textContent
        let indexs = []
        for (let i = 0; i < text.length; i++) {
          if (glitchData.value.burned.includes(text[i])) { indexs.push(i) }
        }
        if (indexs.length) {
          let style = ''
          let lastI = '0%'
          let rem = .527
          for (let i = 0; i < indexs.length; i++) {
            let pos = indexs[i]
            style += `
            #a4d5a5 ${lastI} ${(rem * pos).toFixed(2)}rem,
            #dd5f57 ${(rem * pos).toFixed(2)}rem ${rem * (pos + 1)}rem,
            #a4d5a5 ${rem * (pos + 1)}rem ${(i + 1) == indexs.length ? '100%' : (indexs[i + 1] * rem).toFixed(2) + 'rem,'}`
            lastI = (pos * rem).toFixed(2) + 'rem'
          }
          v.style.backgroundImage = `linear-gradient(to right, ${style})`
        }
      })
    }
    return {
      glitchData,
      faces,
      phrases,
      inputField,
      reset() {

      },
    }
  }
};
</script>


<style lang="scss" >
@import "../../assets/scss/main.scss";
.value {
  color: $info;
  background-color: $info;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
