<template>
  <div>
    <div class="item collapsable-item d-flex flex-column justify-content-center align-items-center text-center"
      @click="openCollapse('i' + item._id + index)">
      <i :class="`fs-5 mdi mdi-${icon}`"></i>
      <div>{{ item.name }}</div>
    </div>
    <div :id="'i' + item._id + index" class="expand collapse row">
      <div class="col-4">
        <h5>{{ item.name }}</h5>
        <h5>{{ item.rarity }}</h5>
      </div>
      <p class="col-8">{{ item.description }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Collapse } from 'bootstrap';
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
      openCollapse(clicked) {
        document.querySelectorAll('.show').forEach(c => {
          Collapse.getOrCreateInstance(c).toggle()
        })
        setTimeout(() => {
          Collapse.getOrCreateInstance(document.getElementById(clicked)).toggle()
        }, 200)
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
  }
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
