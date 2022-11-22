<template>
  <div>
    <div class="item collapsable-item d-flex flex-column justify-content-center align-items-center text-center"
      :class="{ active: isActive }" @click="selectItem">
      <i :class="`fs-5 mdi mdi-${icon}`"></i>
      <div>{{ item.name }}</div>
    </div>
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
  border: 1px solid var(--bs-info);
  padding: .2em;
  font-size: 13px;
  transition: all .2s linear steps(4);

  &:hover {
    background: var(--bs-info);
    color: var(--bs-dark);
    cursor: pointer;
    box-shadow: 0px 0px 3px var(--bs-info);
  }
}

.active {
  background: var(--bs-warning);
  color: var(--bs-dark);
  box-shadow: 0px 0px 3px var(--bs-warning);
}

.expand {
  width: 100%;
  position: absolute;
  left: 0;
  margin: .25em;
  background-color: var(--bs-info);
  color: var(--bs-dark);
}
</style>
