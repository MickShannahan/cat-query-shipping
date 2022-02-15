<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="container-fluid fixed-bottom">
    <div class="text-light text-center p-2">
      Made with your <i class="mdi mdi-google-podcast"></i> Union Tax Credits
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
body {
  background-image: radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)),
    url("./assets/img/CUPS-bgFilter.png");
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
}
@import "./assets/scss/main.scss";

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
