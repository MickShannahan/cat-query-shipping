<template>
  <div class="burner">
    <div class="row">
      <div class="col-6 glitch-text" :data-text="faces[0]">
        <span>{{ faces[personality[0]] }} {{ phrases[personality[1]] }}</span>
      </div>
      <div class="col-6">
        <span
          v-for="(n, b) in glitchData.burned"
          :key="b"
          :class="{ 'text-danger': n == 3, 'text-warning': n == 2 }"
          >{{ b }}
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../../AppState';
import { onMounted, watchEffect } from '@vue/runtime-core';
import { logger } from '../../utils/Logger';
import Pop from "../../utils/Pop";
export default {
  setup() {
    const personality = ref([0,0])
    const glitchData = computed(() => AppState.lostShipment.glitchData)
    const oldBurned = ref('')
    const faces = computed(() => glitchData.value.faces)
    const phrases = computed(() => glitchData.value.phrases)
    const inputField = ref('')
    watchEffect(() => {
      if(AppState.searchType != 'http'){
        Pop.toast('/ᐠ ̷  ̷- ̷‸ ̷- ̷ ᐟ\\ﾉ \n ...not allowed...', 'error', 'center')
        AppState.searchType = 'http'
      }
      let inputBox = document.getElementById('basic-url') || document.getElementById('code-window')
      if(inputBox){
        inputBox.addEventListener('keyup', keyPress)
        inputField.value = inputBox.value
      }
    })
    function changePersonality(face, text){
       personality.value[0]= face || Math.floor(Math.random()*glitchData.value.faces.length)
       personality.value[1] = text ||  Math.floor(Math.random()*glitchData.value.phrases.length)
    }
    function keyPress() {
      let input = document.getElementById('basic-url').value.split('')
      let data = { ...oldBurned.value }
      input.forEach(k => {
        if (k == '?') return
        data[k] = data[k] ? data[k] + 1 : 1
        if (data[k] > 3) {
          data[k] = 3
          blockKey()
          return
        }
      })
      AppState.lostShipment.glitchData.burned = data
      // TODO burns them but doesn't unburn them fast enough and the coloring is slightly off
      // burnLetters()
    }
    function blockKey() {
      changePersonality()
      let inputElm = document.getElementById('basic-url')
      inputElm.value = inputElm.value.slice(0, inputElm.value.length -1)
      inputElm.classList.add('burning')
      setTimeout(()=> {inputElm.classList.remove('burning')}, 200)
    }
    function burnLetters() {
      let screen = document.getElementById('shipment-details')
      let keys = screen.querySelectorAll('.key')
      let vals = screen.querySelectorAll('.value')
      logger.log(keys, vals)
      vals.forEach(v => {
        let text = v.textContent
        let indexs = []
        for (let i = 0; i < text.length; i++) {
          if (glitchData.value.burned[text[i]] == 3) { indexs.push(i) }
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
    onMounted(() => {
      AppState.searchType ='http'
      oldBurned.value = { ...AppState.lostShipment.glitchData.burned }
           const title = "Burner Glitch?"
      AppState.chatTree[title] = {
        text: "The Burner glitch can be tricky to deal with. Repeating the same charcters in your query will 'burn them out'. You can only use each character a few times before it's un-usable.  Thankfully you can always get the characters back by backing your query up. Besides that you just have to just have to endure their edgy commentary. If you lost a character you can always check the user manual for and encoded version, might be able to get a few more in that way.",
        branches: ['[Go Back]']
      }
      AppState.chatTree['[glitch]'] = {
        text: "Looks like this shipment is glitched. Glitches attach to damaged shipments and all have their own unique personalities. These glitches can range from annoying to dangerous and should be handled with EXTRA care. Glitches also mess up your response manifest, always returning more shipments than you actually pinged. Don't worry though this doesn't effect your record, plus finding a glitched shipments is worth more credits!",
        branches: [title]
      }
      AppState.bozNotification = ['[glitch]']
      })
    return {
      personality,
      glitchData,
      oldBurned,
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
// .value {
//   color: $info;
//   background-color: $info;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }

#tour-search input.burning{
  animation: burning .2s linear 2;
  color: $warning!important
}

@keyframes burning {
  0%{text-shadow: -4px 0px 0px $danger!important;}
  25%{text-shadow: 4px 0px 0px $danger!important;}
  50%{text-shadow: 0px -4px 0px $danger;}
  75%{text-shadow: 0px 4px 0px $danger;}
  100%{text-shadow: 3px 0px 0px $danger;}
}

// .shake{
//   animation: shake .1s ease 2;
// }

// @keyframes shake {
//   0%{transform: translate(0px, 0px);}
//   20%{transform: translate(2px, 0px);}
//   40%{transform: translate(0px, 5px);}
//   60%{transform: translate(-2px, 0px);}
//   80%{transform: translate(0px, -5px);}
//   100%{transform: translate(0px, 0px);}
// }
</style>
