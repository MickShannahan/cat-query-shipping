<template>
  <div
    class="
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="container-fluid">
      <transition name="lost">
      <LostShipment v-if="showLost"/>
      </transition>
      <Search />
      <CodeSearch />
      <transition name="thread">
      <ShipmentsThread v-if="showThread" />
      </transition>
      <Docs />
    </div>
  </div>
</template>

<script>
import {  computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    const showThread = ref(false)
    const showLost = ref(false)
    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 's') {
          e.preventDefault()
          Pop.toast('Saving Union documents is stricly prohibited', 'warning', 'bottom')
        }
      })
      showThread.value = true
      showLost.value = true
    })
    return {
      showThread,
      showLost
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

}

.thread-enter-active,
.thread-leave-active {
  transition: all 0.7s cubic-bezier(0.54, -0.35, 0.45, 1.41) 1s;
}
.thread-enter-from,
.thread-leave-to {
  position: absolute;
  opacity: 0;
  transform:  translateY(-10em);
}

.lost-enter-active,
.lost-leave-active {
  transition: all 0.7s cubic-bezier(0.54, -0.35, 0.45, 1.41) .5s;
}
.lost-enter-from,
.lost-leave-to {
  position: absolute;
  opacity: 0;
  transform:  translateY(-10em);
}

@keyframes bounce{

}
</style>
