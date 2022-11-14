<template>
  <div class="retry bg-danger elevation-1">

  </div>
</template>


<script>
import { computed } from 'vue';

export default {
  props: { x: Number, y: Number, slots: Array },
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
.retry {
  transition: all .2s ease;
  margin: 2px;
  border-radius: 2px;
  grid-column: v-bind(col);
  grid-row: v-bind(row);
  place-self: stretch;
  border-bottom: 4px solid #893341;
  outline: 2px solid rgba(0, 0, 0, 0.2);
}
</style>
