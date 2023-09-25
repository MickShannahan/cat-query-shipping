<template data-simplebar >
  <header class="container-fluid ">
    <NotificationThread />
    <Navbar />
  </header>
  <main class="container-fluid d-flex">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="container-fluid fixed-bottom d-flex align-items-center justify-content-center">
    <div class="me-auto selectable text-light p-2 rounded" @click="switchBg"><i class="mdi mdi-lightbulb-outline"></i>
    </div>
    <div class="text-light text-center p-2 me-auto">
      Made with your <i class="mdi mdi-google-podcast text-theme-primary"></i> Union Tax Credits
    </div>
    <!-- STUB mod theme -->
    <ModTheme />
    <!-- mod theme -->
    <MapComponent />
  </footer>
</template>

<script>
import { computed, ref, useCssModule } from 'vue'
import { AppState } from './AppState'
import isoLight from '/src/assets/img/bg/Cups-room-iso.png'
import isoDark from '/src/assets/img/bg/Cups-room-iso-dark.png'
export default {
  name: 'App',
  setup() {
    const bgSelcted = ref(0)
    const bgs = ref([isoLight, isoDark])
    return {
      appState: computed(() => AppState),
      bg: computed(`url(${bgs[bgSelcted.value]})`),
      switchBg() {
        bgSelcted.value = (bgSelcted.value + 1) % bgs.value.length
        document.body.style.backgroundImage = ` radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url("${bgs.value[bgSelcted.value]}")`
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.tour-boz {
  position: absolute;
  top: -80px;
  right: -20px;
  background-image: url("./assets/img/Boz/CUPS Manager.png");
  height: 120px;
  width: 120px;
  background-position: top;
  // border: 1px solid var(--bs-info);
}

body {
  background-image: radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)),
    url("../assets/img/bg/Cups-room-iso.png");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  transition: background-image linear .5s;
}

.popover.custom-pop {
  background-color: lighten($color: #498d96, $amount: 30);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2));
  border: dashed 2px var(--bs-primary);

  .popover-header {
    background-color: lighten($color: #498d96, $amount: 15);

  }

  .popover-arrow::after {
    border-right-color: lighten($color: #498d96, $amount: 15);
  }

  .pop-img {
    width: 75px;
    height: 75px;
    object-fit: cover;
    object-position: center;
  }

  .pop-trinket {
    width: 75px;
    height: 75px;
    position: absolute;
    bottom: -35px;
    right: -35px;
  }

  .pop-badge {
    width: 25px;
    height: 25px;
  }
}

.route-enter-active,
.route-leave-active {
  overflow: hidden;
  transition: all 0.2s ease;
}

.route-enter-from {
  overflow: hidden;
  opacity: 0;
  filter: blur(5px);
}

.route-leave-to {
  overflow: hidden;
  opacity: 0;
  filter: blur(5px);
  // max-height: 100vh;
}
</style>
