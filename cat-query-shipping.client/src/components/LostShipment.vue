<template>
  <div class="lost-shipment  console-console plastic outset my-2 p-2 ps-1">
    <!-- STUB side bar -->
    <div class="component-panel ps-1 pe-3">
      <!-- <button class="btn btn-outline-light h-25" @click="getLostShipment">get new</button> -->

      <!-- SECTION MODS -->
      <div class="mods">
        <ModPanel />
      </div>


      <!--  -->
      <transition name="slot">
      </transition>
      <button v-if="account.employeeGrade?.length >= 4" id="tour-new-shipment"
        class="new-ship-btn comp-button comp-yellow p-2 mb-5 w-100" v-tooltip:bottom="'get new lost shipment'"
        @click="getLostShipment">
        <i class="mdi mdi-refresh"></i>
        <i class="mdi mdi-card-bulleted-outline"></i>
      </button>
      <button v-else id="tour-new-shipment" class="new-ship-btn comp-button comp-yellow p-2 mb-5 w-100"
        v-tooltip:bottom="'abandon this shipment'" @click="abandonShipment">
        <i class="mdi mdi-alert-box-outline"></i>
        <i class="mdi mdi-card-bulleted-outline"></i>
      </button>
      <!-- TODO better datacard usage -->
      <!-- <DataCard v-if="lostShipment.id" :data="lostShipment" /> -->
      <!-- <div class="card-slot-bottom"></div>
      <div class="card-slot-top"></div> -->
    </div>
    <CardTray />
    <!-- STUB Screen -->
    <div id="tour-shipment-panel" class="shipment-panel p-1 px-2 p-md-3 screen-theme inset rounded screen-on">
      <div class="row p-2">
        <!-- STUB shipment side -->
        <div id="tour-shipment-details" class="col-md-9 pe-3 text-theme-primary">
          <transition name="screenEffect" mode="out-in">
            <div id="shipment-details" v-if="lostShipment.id" class="row border border-theme-primary">
              <div v-for="(value, key) in lostShipment" v-show="visible(key)" :key="key + value" class="col-md-6">
                <div class="glitch">
                  <span :id="key + '-key'" class="hover text-theme-secondary lighten-30 line key" :data-text="key"
                    @click="copy" v-html="recover(key)"></span>:
                </div>
                <span class="glitch">
                  <span :id="key + '-value'" class="hover line value" @click="copy" :data-text="value"
                    v-html="recover(value)">
                  </span>
                </span>
              </div>
            </div>
            <div v-else class="row justify-content-center border border-theme-primary">
              <div class="col-6 text-center">
                <img class="img-correction" src="../assets/img/CUPS-loadingLow.gif" />
                <p>loading...</p>
              </div>
            </div>
          </transition>
        </div>
        <!-- STUB Stats side -->
        <div id="tour-shipment-stats" class="col-md-3 text-theme-primary">
          <div class="row h-100">
            <div class="col-12 border border-theme-primary mb-1">
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <span>searches:</span><span class="ms-push">
                    {{ account.currentRequestsMade }}
                  </span>
                </div>
                <div class="col-12 d-flex justify-content-between">
                  <span>pages Printed:</span><span class="ms-push">
                    {{ account.currentPagesPrinted }}
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12 border border-theme-primary">
              <div class="row">
                <div class="col-12 d-flex justify-content-between">
                  <span>difficulty:</span><span class="ms-push">
                    {{ difficulty }}
                  </span>
                </div>
                <div class="col-12 d-flex justify-content-between">
                  <span>credits:</span><span class="ms-push">
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
import { computed, reactive, onMounted, ref, useCssModule } from 'vue';
import { shipmentService } from '../services/ShipmentService';
import { modsService } from '../services/ModsService.js'
import Pop from '../utils/Pop';
import { logger } from '../utils/Logger';
export default {
  setup() {
    const newDifficulty = ref(1)
    const glitchProgress = ref(0)
    const mods = ref(false)
    return {
      mods,
      account: computed(() => AppState.account),
      creditsWorth: computed(() => AppState.lostShipment.creditsWorth),
      difficulty: computed(() => AppState.lostShipment.difficultyRating),
      recoveredData: computed(() => AppState.lostShipment.recoveredData),
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
      async abandonShipment() {
        try {
          const cost = this.lostShipment.creditsWorth ? Math.floor(this.lostShipment.creditsWorth / 3) : 'No'
          if (await Pop.confirm(`Abandon this shipment?`, `Abandoning this shipment for a new one will cost you: ${cost} Union Credits.`, 'warning', 'yes, get me a new one', 'never mind'))
            await shipmentService.abandonShipment()
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      difficultyChange(val) {
        newDifficulty.value += val
        newDifficulty.value = newDifficulty.value <= 1 ? 1 : newDifficulty.value >= 20 ? 20 : newDifficulty.value
      },
      recover(sProp) {
        let recoveredData = AppState.lostShipment.recoveredData
        if (recoveredData) {
          for (let damageType in recoveredData) {
            switch (damageType) {
              case 'damagedKeys':
                for (let key in recoveredData.damagedKeys) {
                  sProp = sProp == recoveredData.damagedKeys[key] ? `<span style="border-bottom: 1px dotted;">${key}</span>` : sProp
                }
                break
              case 'damagedProperties':
                for (let key in recoveredData.damagedProperties) {
                  sProp = sProp == key ? `<span style="border-bottom: 1px dotted;">${recoveredData.damagedProperties[sProp]}</span>` : sProp
                }
                break
              case 'missingProperties':
            }
          }
        }
        return sProp
      },
      copy() {
        let mod = modsService.findMod('copy_paste')
        if (!modsService.useMod(mod.id)) return
        let elem = event.target
        logger.log(elem)
        navigator.clipboard.writeText(this.recover(elem.innerText))
        Pop.toast('copied ' + elem.innerText, 'success', 'top')
      },
      visible(key) {
        let notShown = ['_id', 'id', '__v', 'creditsWorth', 'difficultyRating', 'glitch', 'postalHistory', 'postalStation', 'containsHazard', 'glitchData', 'recoveredData']
        return !notShown.includes(key)
      },
      // MODS
      themePrimary: computed(() => AppState.modTheme ? AppState.modTheme.primary : '#A4D5A5')
    }
  }
};
</script>


<style lang="scss" scoped>
.lost-shipment {
  min-height: 35vh;
  display: grid;
  grid-template-columns: 175px 1fr;
}

.component-panel {
  width: 100%;
  grid-column: 1 2;
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-template-rows: repeat(5, 40px) 1.25em 1fr 60px;

  .mods {
    grid-column: span 4;
    grid-row: span 5;
  }



  .new-ship-btn {
    grid-column: 2 / 4;
    grid-row: 8 / 9;
    align-self: baseline;
    height: 60%;
  }
}

.shipment-panel {
  grid-column: 2 / 3
}

.screen {
  background-image: url(/src/assets/img/Textures/black-orchid.png);
}

.dirty-screen {
  background-image: url(/src/assets/img/Textures/green-dust-and-scratches.png);
  background-blend-mode: darken;
}

.recovered {
  border-bottom: 1px dotted;
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
  background: var(--bs-theme);
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
        color: var(--bs-theme);
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
