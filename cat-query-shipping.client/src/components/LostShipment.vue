<template>
  <div class="lost-shipment row bg-primary physical-border my-2 p-2">
    <div class="col-1 border border-light d-flex" v-drop="">
      <button class="btn btn-outline-light h-25" @click="getLostShipment">get new</button>
      <transition name="fade">
      <DataCard v-if="lostShipment" :data="lostShipment"/>
      </transition>
      <CardTray/>
    </div>
    <div class="col-11 screen text-info">
      <div class="row p-2">
        <div class="col-9 pe-3">
          <div class="row border border-info">
            <div
              v-for="(value, key) in lostShipment"
              v-show="visible(key)"
              :key="key + value"
              class="col-6 glitch"
            >
              <span
                class="hover text-secondary lighten-30 line"
                :data-text="key"
                @click="copy"
                >{{ key }}</span
              >:
              <span class="hover line" @click="copy" :data-text="value">
                {{ value }}</span
              >
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="row h-100">
            <div class="col-12 border border-info mb-1">
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <span>searches:</span
                  ><span class="ms-push">
                    {{ account.currentRequestsMade }}
                  </span>
                </div>
                <div class="col-12 d-flex justify-content-between">
                  <span>pages Printed:</span
                  ><span class="ms-push">
                    {{ account.currentPagesPrinted }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 border border-info">
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <span>difficulty:</span
                  ><span class="ms-push">
                    {{ difficulty }}
                  </span>
                </div>
                <div class="col-12 d-flex justify-content-between">
                  <span>credits:</span
                  ><span class="ms-push">
                    {{ creditsWorth }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  <script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { shipmentService } from '../services/ShipmentService';
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
  setup() {
    const newDifficulty = ref(1)
    return {
      account: computed(() => AppState.account),
      creditsWorth: computed(() => AppState.lostShipment.creditsWorth),
      difficulty: computed(() => AppState.lostShipment.difficultyRating),
      lostShipment: computed(() => {
        AppState.lostShipment?.creditsWorth
        AppState.lostShipment?.difficultyRating
        return AppState.lostShipment
      }),
      getLostShipment() {
        shipmentService.getLostShipment(``)
      },
      difficultyChange(val) {
        newDifficulty.value += val
        newDifficulty.value = newDifficulty.value <= 1 ? 1 : newDifficulty.value >= 20 ? 20 : newDifficulty.value
      },
      copy() {
        let elem = event.target
        logger.log(elem)
        navigator.clipboard.writeText(elem.innerText)
        Pop.toast('copied ' + elem.innerText, 'success', 'top')
      },
      visible(key) {
        let notShown = ['_id', 'id', '__v', 'creditsWorth', 'difficultyRating']
        return !notShown.includes(key)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.lost-shipment {
  min-height: 40vh;
}



.paper-edge {
  height: 100%;
  background-image: url("../assets/img/yellowPageEdge.png");
  background-repeat: space repeat;
  image-rendering: pixelated;
  background-size: 8em;
}

.component {
  position: relative;
}

.hover {
  cursor: pointer;
  padding: 3px;
  border-radius: 5px;
  transition: all 0.15s ease;
}

.hover:hover {
  background: #a4d5a5;
  color: #2a2f32 !important;
  transform: translate(0, -2);
}

.glitch {
  position: relative;
}

.line:hover {
  &:after,
  &:before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 13px;
  }

  &:after,
  &:before {
    animation: glitch 300ms -300ms linear infinite;
    @keyframes glitch {
      0% {
        transform: translateX(0);
        clip-path: polygon(0 100%, 100% 100%, 100% 120%, 0 120%);
      }
      80% {
        transform: translateX(0);
        color: var(--bs-info);
      }
      85% {
        transform: translateX(random(10) - 5px);
        color: #4e9a26;
      }
      90% {
        transform: translateX(random(10) - 5px);
        color: #ac1212;
      }
      95% {
        transform: translateX(random(10) - 5px);
        color: #fff;
      }
      100% {
        transform: translateX(0);
        clip-path: polygon(0 -20%, 100% -20%, 100% 0%, 0 0);
      }
    }
  }
}
</style>
