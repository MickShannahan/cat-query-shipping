<template>
  <div class="mod" :class="{ burnt: burnt }">
  </div>
</template>


<script>
import { computed } from 'vue';
import { Mod } from '../../models/Mod.js';

export default {
  props: { mod: Mod, x: Number, y: Number },
  setup(props) {
    return {
      col: computed(() => `${props.x + 1} / span ${props.mod.slots[0].length}`),
      row: computed(() => `${props.y + 1} / span ${props.mod.slots.length}`),
      img: computed(() => `url(${props.mod.img})`),
      burnt: computed(() => props.mod.burnt)
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
  background-image: v-bind(img);
  opacity: 0;
  animation: drop-in .2s ease forwards;
}

.burnt {
  filter: grayscale(.6) brightness(.5) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
}


@keyframes drop-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes burning {
  0% {}

  25% {}

  50% {}

  100% {}
}
</style>
