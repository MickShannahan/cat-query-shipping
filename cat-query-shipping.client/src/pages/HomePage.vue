<template>
  <div class="row no-overflow-x justify-content-center">
    <div class="col-md-10 col-lg-8 p-0 m-0">
      <LostShipment />
      <transition name="flip">
        <Search v-if="compScreen == 'http'" @switch="switchScreen" />
        <CodeSearch v-else @switch="switchScreen" />
      </transition>
    </div>
    <div class="col-md-11 col-lg-9">
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
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 's') {
          e.preventDefault()
          Pop.toast('Saving Union documents is stricly prohibited', 'warning', 'bottom')
        }
      })
    })
    return {
      compScreen: computed(()=> AppState.searchType),
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
