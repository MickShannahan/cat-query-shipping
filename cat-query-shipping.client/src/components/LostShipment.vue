<template>
  <div class="lost-shipment row bg-primary physical-border my-2 p-2">
    <!-- STUB side bar -->
    <div class="col-1 d-flex align-items-end justify-content-end ps-0">
      <!-- <button class="btn btn-outline-light h-25" @click="getLostShipment">get new</button> -->
      <transition name="slot">
        <button
          id="tour-new-shipment"
          class="comp-button comp-yellow p-2 mb-5 w-100"
          v-tooltip:bottom="'get new lost shipment'"
          @click="getLostShipment"
        >
          <i class="mdi mdi-card-bulleted-outline"></i>
        </button>
        <!-- TODO better datacard usage -->
        <!-- <DataCard v-if="lostShipment.id" :data="lostShipment" /> -->
      </transition>
      <!-- <div class="card-slot-bottom"></div>
      <div class="card-slot-top"></div> -->
    </div>
    <CardTray />
    <!-- STUB Screen -->
    <div id="tour-shipment-panel" class="col-11 screen text-info screen-on">
      <div class="row p-2">
        <!-- STUB shipment side -->
        <div id="tour-shipment-details" class="col-9 pe-3">
          <transition name="screenEffect" mode="out-in">
            <div
              id="shipment-details"
              v-if="lostShipment.id"
              class="row border border-info"
            >
              <div
                v-for="(value, key) in lostShipment"
                v-show="visible(key)"
                :key="key + value"
                class="col-6"
              >
                <div class="glitch">
                  <span
                    :id="key + '-key'"
                    class="hover text-secondary lighten-30 line key"
                    :data-text="key"
                    @click="copy"
                    >{{ key }}</span
                  >:
                </div>
                <span class="glitch">
                  <span
                    :id="key + '-value'"
                    class="hover line value"
                    @click="copy"
                    :data-text="value"
                  >
                    {{ value }}</span
                  >
                </span>
              </div>
            </div>
            <div v-else class="row justify-content-center border border-info">
              <div class="col-6 text-center">
                <img
                  class="img-correction"
                  src="../assets/img/CUPS-loadingLow.gif"
                />
                <p>loading...</p>
              </div>
            </div>
          </transition>
        </div>
        <!-- STUB Stats side -->
        <div id="tour-shipment-stats" class="col-3">
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
        <!-- STUB -->
        <div class="col-12 pt-1">
          <Glitch />
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
    const glitchProgress = ref(0)
    return {
      account: computed(() => AppState.account),
      creditsWorth: computed(() => AppState.lostShipment.creditsWorth),
      difficulty: computed(() => AppState.lostShipment.difficultyRating),
      glitchProgress,
      glitchWidth: computed(() => glitchProgress.value + '%'),
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
        let notShown = ['_id', 'id', '__v', 'creditsWorth', 'difficultyRating', 'glitch', 'postalHistory', 'postalStation', 'containsHazard', 'glitchData']
        return !notShown.includes(key)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.lost-shipment {
  min-height: 30vh;
}

.card-slot-bottom {
  width: 40px;
  height: 180px;
  background: var(--bs-dark);
  border-left: 8px var(--bs-primary) inset;
  border-top: 8px var(--bs-primary) inset;
  border-bottom: 8px #55a6a8 inset;
  border-radius: 8px;
}
.card-slot-top {
  z-index: 500;
  width: 400px;
  height: 180px;
  background: var(--bs-primary);
  border-left: 4px #55a6a8 solid;
  border-radius: 4px;
  transform: translateX(-4px);
}

.slot-enter-active,
.slot-leave-active {
  transition: opacity 01s ease;
  opacity: 1;
}
.slot-enter-from,
.slot-leave-to {
  opacity: 0;
}

// SECTION SCREEN

.screenEffect-enter-active,
.screenEffect-leave-active {
  opacity: 1;
  transition: all 0.3s linear;
  transition-timing-function: steps(2, end);
}
.screenEffect-enter-from,
.screenEffect-leave-to {
  opacity: 0;
}

.mutation-wrapper {
  min-height: 1.5em;
  padding: 1px;
  position: relative;
}

.mutation-progress {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: v-bind(glitchWidth);
  background: var(--bs-info);
  transition: linear 0.5s width;
  transition-delay: 0.2s;
}
.mutation-under {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: v-bind(glitchWidth);
  background: var(--bs-warning);
  transition: linear 0.5s width;
}

// SECTION HOVERS

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

.img-correction {
  filter: hue-rotate(-33deg) saturate(0.8) brightness(1.6);
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
  display: inline-block;
}

.line:hover {
  &:after,
  &:before {
    content: attr(data-text);
    position: absolute;
    top: 0px;
    left: 3px;
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
