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
      @click="bozkoTalk(`What's up Kid.`)"
    >
      help
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
            v-for="(v, k) in chatTree"
            :disabled="bozkoBusy"
            :key="k"
            class="btn btn-success border border-info text-light"
            @click="bozkoChat(k)"
          >
            {{ k }}
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
          >
            {{ bozkoText }}
            <span class="message-corner bg-white"></span>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-2 bozko-container">
          <img
            src="../assets/img/CUPS Manager.png"
            class="bozko"
            :class="{ 'hide-bozko': bozkoHide }"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger';
export default {
  setup() {
    const bozkoText = ref('')
    const bozkoBusy = ref(false)
    const bozkoHide = ref(true)
    const chatTree = ref({})
    let chatSpeed = 30
    onMounted(() => {
      chatTree.value = AppState.chatTree
      const dialogue = document.getElementById('dialogueOffCanvas')
      dialogue.addEventListener('hide.bs.offcanvas', function () {
        logger.log('hiding')
        bozkoHide.value = true
      })
      dialogue.addEventListener('shown.bs.offcanvas', function () {
        logger.log('showing')
        bozkoHide.value = false
        chatTree.value = AppState.chatTree
      })
    })
    return {
      chatSpeed,
      chatTree,
      bozkoText,
      bozkoBusy,
      bozkoHide,
      bozkoTalk(string) {
        let interval = 0
        bozkoBusy.value = true
        bozkoText.value = ''
        setTimeout(() => bozkoBusy.value = false, string.length * chatSpeed + 1000)
        string.split('').forEach(c => {
          setTimeout(() => bozkoText.value += c, interval += chatSpeed)
        })
      },
      bozkoChat(option) {
        if (option == '[GO BACK]') {
          chatTree.value = AppState.chatTree
          return
        }
        this.bozkoTalk(chatTree.value[option].text)
        chatTree.value = chatTree.value[option].branches
      }
    }
  }
};
</script>


<style lang='scss' scoped>
h5 {
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
  bottom: 0;
  right: -90px;
  position: absolute;
  height: 50vh;
  aspect-ratio: 1;
  transition: all ease 0.2s;
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
