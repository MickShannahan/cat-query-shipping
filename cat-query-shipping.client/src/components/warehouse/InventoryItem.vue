<template>
  <div>
    <button class="item btn-theme-primary d-flex flex-column justify-content-center align-items-center text-center"
      :class="{ active: isActive }" @click="selectItem">
      <i :class="`fs-5 mdi mdi-${icon}`"></i>
      <div>{{ item.name }}</div>
    </button>
  </div>
</template>


<script>
import { AppState } from '../../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Collapse } from 'bootstrap';
import { gameService } from '../../services/GameService.js';
export default {
  props: { item: { type: Object }, index: Number },
  setup(props) {
    return {
      icon: computed(() => {
        switch (props.item.type) {
          case 'mod':
            return 'memory'
          case 'resource':
            return 'flask'
          case 'collectable':
            return 'cassette'
          case 'junk':
            return 'trash-can'
        }
      }),
      isActive: computed(() => AppState.activeItem == props.item),
      selectItem() {
        gameService.setItem(props.item)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.item {
  line-height: 1.2em;
  font-size: auto;
  height: 100%;
  place-self: stretch;
  padding: .2em;
  font-size: 13px;

}
</style>
