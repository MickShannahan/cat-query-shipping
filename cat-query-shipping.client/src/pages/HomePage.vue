<template>
  <div class="shipment-search-area no-overflow-x justify-content-center ">
    <div class="computer p-0 m-0">
      <LostShipment />
      <transition name="flip">
        <Search v-if="compScreen == 'http'" @switch="switchScreen" />
        <CodeSearch v-else @switch="switchScreen" />
      </transition>
    </div>
    <div class="printer">
      <ShipmentsThread />
    </div>
    <Dialogue />
    <Docs />
    <Tour v-if="account.needsTour" />
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { shipmentService } from '../services/ShipmentService'
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { useRoute } from 'vue-router'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const showTabs = ref(false)
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/src/assets/img/bg/Cups-room-iso.png')"
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 's') {
          e.preventDefault()
          Pop.toast('Saving Union documents is stricly prohibited', 'warning', 'bottom')
        }
      })
    })
    return {
      compScreen: computed(() => AppState.searchType),
      showTabs,
      lostShipmentLoading: computed(() => AppState.loading.lostShipment),
      account: computed(() => AppState.account),
      switchScreen() {
        logger.log('switching')
        AppState.searchType = AppState.searchType == 'http' ? 'code' : 'http'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.shipment-search-area {
  display: grid;
  grid-template-columns: 5vw minmax(25px, 3vw) 1fr minmax(25px, 3vw) 5vw;
  grid-template-rows: 2.2em 1fr 1fr;
}

.computer {
  grid-column: 3/4;
  grid-row: 2 / 3
}

@media (max-width: 768px) {
  .computer {
    grid-column: 1 / 6;
    grid-row: 2 / 3
  }
}

.printer {
  grid-column: 2/5;
  grid-row: 3 / 4;
}

.no-overflow-x {
  max-width: 100%;
  overflow-x: hidden;
}

.lost-enter-active,
.lost-leave-active {
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.54, -0.35, 0.45, 1.41) 0.5s;
}

.lost-enter-from {
  opacity: 0;
  transform: translateY(-10em);
}

.lost-leave-to {
  transform: translateX(200%);
}

.flip-enter-active {
  transition: all 0.7s cubic-bezier(0.54, -0.35, 0.45, 1.41);
}

.flip-leave-active {
  position: absolute;
  width: inherit;
  transition: all 0.7s cubic-bezier(0.54, -0.35, 0.45, 1.41);
}

.flip-enter-from {
  opacity: 0;
  transform: rotate3d(1, 0, 0, 180deg) translateY(-1em);
}

.flip-leave-to {
  position: absolute;
  width: inherit;
  opacity: 0;
  transform: rotate3d(1, 0, 0, -180deg) translateY(-1em);
}
</style>
