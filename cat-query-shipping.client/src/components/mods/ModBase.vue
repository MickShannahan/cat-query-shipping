<template>
  <div class="mod" :class="type">

  </div>
</template>


<script>
import { computed } from 'vue';

export default {
  props: { x: Number, y: Number, slots: Array, type: String },
  setup(props) {
    const slots = [0, 1]
    return {
      col: computed(() => `${props.x + 1} / span ${props.slots[0].length}`),
      row: computed(() => `${props.y + 1} / span ${props.slots.length}`)
    }
  }
};
</script>


<style lang="scss" scoped>
.mod {
  transition: all .2s ease;
  margin: 2px;
  border-radius: 2px;
  grid-column: v-bind(col);
  grid-row: v-bind(row);
  place-self: stretch;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.retry {
  background-image: url(/src/assets/img/mods/modRetry1.gif);
}

.antenna {
  background-image: url(/src/assets/img/mods/antenna1.gif);
}

.battery {
  background-image: url(/src/assets/img/mods/battery1.png);
}
</style>
