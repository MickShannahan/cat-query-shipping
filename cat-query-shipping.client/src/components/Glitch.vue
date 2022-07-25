<template>
  <div v-if="glitch" class="row">
    <div class="col-9 p-0 pe-1">
      <div class="glitch-body border border-info px-1">
        <GTimer v-if="glitch == 'timer'" />
        <GBurner v-if="glitch == 'burner'" />
        <GTrapper v-if="glitch == 'trapper'" />
        <GScrambler v-if="glitch == 'scrambler'" />
        <GSpeller v-if="glitch == 'speller'" />
        <GPrinter v-if="glitch == 'printer'" />
        <GJumper v-if="glitch == 'jumper'" />
      </div>
    </div>
    <div class="glitch-name col-3 border border-info">
      <div class="glitch-text" :data-text="'glitch: ' + glitch">
        glitch: {{ glitch }}
      </div>
    </div>
    <audio @load="playSound" src="/src/assets/sounds/glitchload.wav" ></audio>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
export default {
  setup() {
    return {
      glitch: computed(() => AppState.lostShipment.glitch),
      playSound(event) {
        event.target.play()
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.glitch {
  width: 100%;
  &-body {
    min-height: 1.65em;
  }
  &-name {
    min-height: 1.65em;
  }
}

.glitch-name {
  position: relative;
  display: inline-block;
}
</style>
