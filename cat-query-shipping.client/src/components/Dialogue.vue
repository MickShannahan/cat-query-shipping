<template>
  <div class="row justify-content-end">
    <button
      class="
        btn btn-success
        help-button
        border border-info
        text-secondary
        col-3
        pl-3
        rounded
        shadow-sm
      "
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#dialogueOffCanvas"
      aria-controls="offcanvasBottom"
      @click="bozkoChat(`[Open Window]`)"
    >
      Ask Boz
    </button>

    <div
      class="offcanvas offcanvas-bottom bg-warning lighten-10 p-0 col-12"
      tabindex="-1"
      id="dialogueOffCanvas"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header bg-warning row justify-content-start">
        <button
          type="button"
          class="col-2 btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <h5 class="col offcanvas-title ml-5" id="offcanvasBottomLabel">
          Help from Bozko
        </h5>
      </div>
      <div class="offcanvas-body row">
        <div
          class="
            col-8 col-md-3
            d-flex
            order-md-first order-last
            justify-content-between
            flex-column
          "
        >
          <button
            v-for="chat in chatBranch.branches"
            :disabled="bozkoBusy"
            :key="chat"
            class="btn btn-success border border-info text-light"
            @click="bozkoChat(chat)"
          >
            {{ chat }}
          </button>
        </div>
        <div class="col-6 p-0 text-box-shadow">
          <div
            class="
              h-100
              w-100
              bozko-text
              bg-secondary
              text-warning
              rounded
              pl-3
              p-2
            "
            v-html="bozkoSpoken || bozkoText"
          ></div>
        </div>
        <div class="col-1"></div>
        <div class="col-2 bozko-container">
          <!-- Boz Base -->
          <img
            src="../assets/img/Boz/CUPS-Manager-animate.gif"
            class="bozko"
            :class="{ 'hide-bozko': bozkoHide }"
          />
          <img
            src="../assets/img/Boz/CUPS-Manager-blink.png"
            class="bozko blink"
            v-show="bozkoStatus == 'blink' && !bozkoBusy"
            :class="{ 'hide-bozko': bozkoHide }"
          />
          <div class="load-images"></div>
          <img
            :src="bozkoTalking"
            class="bozko blink"
            v-show="bozkoTalking"
            :class="{ 'hide-bozko': bozkoHide }"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { chatService } from '../services/ChatService'
import { logger } from '../utils/Logger';
import {Offcanvas} from "bootstrap";
export default {
  setup() {
    const bozkoStatus = ref('standing')
    const bozkoTalking = ref('')
    const bozkoBusy = ref(false)
    const bozkoHide = ref(true)
    const bozkoSpoken = ref('')
    const intervals = ref([])
    onMounted(() => {
      const dialogue = document.getElementById('dialogueOffCanvas')
      dialogue.addEventListener('hide.bs.offcanvas', function () {
        bozkoHide.value = true
      })
      dialogue.addEventListener('show.bs.offcanvas', function () {
        bozkoHide.value = false
      })
      // Start bozko blink
      bozkoBlink()
      if(!AppState.user.isAuthenticated){
        Offcanvas.getOrCreateInstance(dialogue).show()
        bozkoChat('[Get Started]')
      }
    })
    function bozkoBlink() {
      bozkoStatus.value = 'blink'
      setTimeout(() => bozkoStatus.value = 'standing', 180)
      setTimeout(bozkoBlink, (Math.random() * 4000) + 2000)
    }
    function bozkoChat(option) {
      chatService.chat(option)
    }
    // TODO This is all for the text to type out and should be abstracted
    watchEffect(() => {
      bozkoBusy.value = true
      intervals.value.forEach(i => clearInterval(i));
      bozkoSpoken.value = ' '
      let timeBetweenChar = 30
      let interval = null
      let text = AppState.chatBranch.text?.split('')
      if (text?.length > 0) {
        setTimeout(() => bozkoBusy.value = false, 500)
        intervals.value.push(setInterval(() => {
          let c = text.shift()
          if (c) {
            bozPhonic(c)
            bozkoSpoken.value += c
          } else {
            clearInterval(interval)
            bozkoTalking.value = ''
          }
        }, timeBetweenChar))
      }
    })
    function bozPhonic(sound){
      const sounds = /r|a|e|i|o|u|t|v|q|r/ig
      if(sounds.test(sound)){
      const pics = ['BozPhonicAEI.png', 'BozPhonicELTH.png', 'BozPhonicFVJ.png', 'BozPhonicOUQ.png', 'BozPhonicR.png']
      let randomPhonic = '../assets/img/Boz/'+ pics[Math.floor(Math.random()*pics.length)]
      bozkoTalking.value = randomPhonic
      }
    }
    return {
      chatBranch: computed(() => AppState.chatBranch),
      bozkoText: computed(() => AppState.chatBranch?.text),
      bozkoStatus,
      bozkoSpoken,
      bozkoTalking,
      bozkoBusy,
      bozkoHide,
      intervals,
      // functions
      bozPhonic,
      bozkoBlink,
      bozkoChat
    }
  }
};
</script>


<style lang='scss' scoped>
.load-images{
  height: 0px;
  width: 0px;
  background-image: url('../../src/assets/img/Boz/BozPhonicAEI.png'), url('../../src/assets/img/Boz/BozPhonicELTH.png'), url('../../src/assets/img/Boz/BozPhonicFVJ.png'), url('../../src/assets/img/Boz/BozPhonicOUQ.png'), url('../../src/assets/img/Boz/BozPhonicR.png');
}

.help-button {
  text-align: left;
  position: fixed;
  bottom: 2em;
  right: 2em;
  transform: translateX(75%);
  transition: all ease 0.2s;
}

.help-button:hover {
  transform: translateX(60%);
}

.bozko {
  image-rendering: pixelated;
  bottom: -15px;
  right: -90px;
  position: absolute;
  height: 50vh;
  aspect-ratio: 1;
  transition: all cubic-bezier(0.54, -0.35, 0.45, 1.41) 0.5s;
}

.bozko-text {
  padding-right: 3.5em !important;
  clip-path: polygon(100% 0, 99% 10%, 99% 100%, 0 100%, 0 0);
}

.text-box-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.486));
}

.hide-bozko {
  transform: translateY(200px);
}

@media screen and(max-width: 1055px) {
  .bozko:hover {
    opacity: 0.5;
    transform: translateX(5vw);
  }
}
</style>
