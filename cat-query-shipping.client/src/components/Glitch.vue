<template>
  <div v-if="glitch" class="row">
    <div class="col-9 p-0 pe-1">
      <div class="glitch-body border border-info px-1">
        <GTimer v-if="glitch == 'timer'" />
        <GBurner v-if="glitch == 'burner'" />
        <GTrapper v-if="glitch == 'trapper'" />
        <GScrambler v-if="glitch == 'scrambler'" />
        <GBurner v-if="glitch == 'burner'" />
        <GSpeller v-if="glitch == 'speller'" />
        <GPrinter v-if="glitch == 'printer'" />
        <GJumper v-if="glitch == 'jumper'" />
      </div>
    </div>
    <div class="glitch-name col-3 border border-info">{{ glitch }}</div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    return {
      glitch: computed(() => AppState.lostShipment.glitch)
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
</style>
