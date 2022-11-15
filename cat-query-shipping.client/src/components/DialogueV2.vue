<template>
  <div class="row justify-content-end">
    <button id="tour-dialogue" class="
        btn btn-success
        help-button
        border border-info
        text-secondary
        col-3
        pl-3
        rounded
        shadow-sm
      " type="button" data-bs-toggle="offcanvas" :data-bs-target="`#${character.name}-OffCanvas`"
      aria-controls="offcanvasBottom" @click="chat(notifyChat)">
      <div v-if="notifyChat" class="pop-bubble">!</div>
      <!-- <div class="pop-bubble">!</div> -->
      Ask {{ character.nickName }}
    </button>

    <div :class="`offcanvas offcanvas-bottom  bg-${character.styles.primary} lighten-10 p-0 col-12`" tabindex="-1"
      :id="character.name + '-OffCanvas'" aria-labelledby="offcanvasBottomLabel"
      :data-bs-scroll="character.styles.small" :data-bs-backdrop="!character.styles.small">
      <div v-if="character.styles.header"
        :class="`offcanvas-header bg-${character.styles.primary} row justify-content-start`">
        <button type="button" class="col-2 btn-close text-reset" data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
        <h5 class="col offcanvas-title ml-5" id="offcanvasBottomLabel">
          Help from {{ character.name }}
        </h5>
      </div>
      <div class="offcanvas-body row">
        <div class="
            col-8 col-md-3
            d-flex
            order-md-first order-last
            justify-content-between
            flex-column
          ">
          <button v-for="ct in chatBranch.branches" :disabled="busy" :key="ct"
            class="btn btn-success border border-info text-light" @click="chat(ct)">
            {{ ct }}
          </button>
        </div>
        <div class="col-6 p-0 text-box-shadow">
          <div class="
              h-100
              w-100
              character-text
              bg-secondary
              text-warning
              rounded
              pl-3
              p-2
            " v-html="spoken || text"></div>
        </div>
        <div class="col-1"></div>
        <div class="col-2 character-container">
          <!-- Character Base -->
          <img v-if="!casualFriday" :src="character.images.base" class="character"
            :class="{ 'hide-character': hide }" />
          <img v-else :src="character.images.casual" :class="{ 'hide-character': hide }" />
          <img :src="character.images.blink" class="character blink" v-show="status == 'blink' && !busy"
            :class="{ 'hide-character': hide }" />
          <div class="load-images"></div>
          <img :src="talking" class="character blink" v-show="talking" :class="{ 'hide-character': hide }" />
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
import { Character } from '../models/Character.js'
import { Offcanvas } from "bootstrap";

export default {
  props: { character: { type: Character }, btnPosition: Number },
  setup(props) {
    const status = ref('standing')
    const talking = ref('')
    const busy = ref(false)
    const hide = ref(true)
    const spoken = ref('')
    const intervals = ref([])
    // mounted
    onMounted(() => {
      const dialogue = document.getElementById(props.character.name + '-OffCanvas')
      dialogue.addEventListener('hide.bs.offcanvas', function () {
        hide.value = true
      })
      dialogue.addEventListener('show.bs.offcanvas', function () {
        hide.value = false
        setChat()
      })
      // Start chacracter blink
      blink()
      if (!AppState.user.isAuthenticated) {
        Offcanvas.getOrCreateInstance(dialogue).show()
        chat('[Get Started]')
      }

    })

    function blink() {
      status.value = 'blink'
      setTimeout(() => status.value = 'standing', 180)
      setTimeout(blink, (Math.random() * 4000) + 2000)
    }

    function chat(option) {
      option = option ? option : '[Open Window]'
      chatService.chat(option)
    }

    function setChat() {
      AppState.chatTree = props.character.chatTree
      AppState.chatBranch = props.character.startingBranch
    }

    // TODO This is all for the text to type out and should be abstracted
    watchEffect(() => {
      busy.value = true
      intervals.value.forEach(i => clearInterval(i));
      spoken.value = ' '
      let timeBetweenChar = 20
      let interval = null
      let text = AppState.chatBranch.text?.split('')
      if (text?.length > 0) {
        setTimeout(() => busy.value = false, 500)
        intervals.value.push(setInterval(() => {
          let c = text.shift()
          if (c) {
            phonic(c)
            spoken.value += c
          } else {
            clearInterval(interval)
            talking.value = ''
          }
        }, timeBetweenChar))
      }
    })
    function phonic(sound) {
      let s = props.character.images
      const sounds = /r|e|o|u|t|v|q/ig
      if (sounds.test(sound)) {
        const pics = [s.phonicAEI, s.phonicELTH, s.phonicR, s.phonicOUQ, s.phonicOUQ]
        let randomPhonic = pics[Math.floor(Math.random() * pics.length)]
        talking.value = randomPhonic
      }
    }
    return {
      chatBranch: computed(() => AppState.chatBranch),
      notifyChat: computed(() => AppState.notification),
      text: computed(() => AppState.chatBranch?.text),
      casualFriday: computed(() => new Date().getDay() == 5),
      status,
      spoken,
      talking,
      busy,
      hide,
      intervals,
      // functions
      phonic,
      blink,
      chat,
      // styles
      stylePrimary: computed(() => props.character.styles.primary),
      buttonPosition: computed(() => props.btnPosition * 2.75 + 'em')
    }
  }
};
</script>


<style lang='scss' scoped>
// .bg-char-primary {
//   background-color: v-bind(stylePrimary);
// }

.holes {
  background-image: url(/src/assets/img/Textures/carbon-fibre.png);
}

.help-button {
  text-align: left;
  position: fixed;
  bottom: v-bind(buttonPosition);
  right: 2em;
  transform: translateX(75%);
  transition: all ease 0.2s;
}

.help-button:hover {
  transform: translateX(60%);
}

.character {
  image-rendering: pixelated;
  bottom: -15px;
  right: -90px;
  position: absolute;
  height: 50vh;
  aspect-ratio: 1;
  transition: all cubic-bezier(0.54, -0.35, 0.45, 1.41) 0.5s;
}

.character-text {
  padding-right: 3.5em !important;
  clip-path: polygon(100% 0, 99% 10%, 99% 100%, 0 100%, 0 0);
}

.text-box-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.486));
}

.hide-character {
  transform: translateY(200px);
}

@media screen and(max-width: 1055px) {
  .character:hover {
    opacity: 0.5;
    transform: translateX(5vw);
  }
}

.pop-bubble {
  padding-top: 6px;
  font-size: 18px;
  text-align: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  color: var(--bs-primary);
  background: var(--bs-warning);
  border: 1px solid var(--bs-primary);
  position: absolute;
  left: -31px;
  top: -2px;
  animation: pop 0.5s forwards 1;
}

@keyframes pop {
  0% {
    transform: scale(0) rotateZ(10deg);
  }

  50% {
    transform: scale(2.5) rotateZ(-10deg);
  }

  100% {
    transform: scale(1) rotateZ(0deg);
  }
}
</style>
