<template>
  <div>
    <div class="col-12 title-bar d-flex justify-content-between px-2">
      <div>Your inventory</div>
      <div>{{ inventoryItems?.length }}<i class="mdi mdi-package ms-3 me-1"></i></div>
    </div>
    <div class="col-12 my-1 justify-content-between">
      <div class="d-flex">
        <button class="col btn-sort" @click="filterBy = 'all'"><i class="mdi mdi-star"></i></button>
        <button class="col btn-sort" @click="filterBy = 'mod'"><i class="mdi mdi-memory"></i></button>
        <button class="col btn-sort" @click="filterBy = 'junk'"><i class="mdi mdi-wrench"></i></button>
        <button class="col btn-sort" @click="filterBy = 'collectable'"><i class="mdi mdi-cassette"></i></button>
        <button class="col btn-sort" @click="sortBy = !sortBy"><i class="mdi mdi-sort"></i></button>
      </div>
    </div>
    <div class="col-12 inventory">
      <InventoryItem v-for="(item, i) in inventoryItems" :key="item._id + i" :item="item" :index="i" />
    </div>
  </div>

</template>


<script>
import { computed, reactive, onMounted, ref } from 'vue';
import { AppState } from '../../AppState.js';
export default {
  setup() {
    const filterBy = ref('all')
    const sortBy = ref(true)
    return {
      filterBy,
      sortBy,
      inventoryItems: computed(() => AppState.account?.inventory?.filter(item => {
        if (filterBy.value == 'all') return true
        if (filterBy.value == item.type) return true
        return false
      }).sort((a, b) => sortBy.value ? a.cost - b.cost : b.cost - a.cost))
    }
  }
};
</script>


<style lang="scss" scoped>
.title-bar {
  height: 1.5em;
  border: 1px solid var(--bs-info);
}

.inventory {
  position: relative;
  width: 100%;
  border: 1px solid;
  height: 45vh;
  overflow-y: scroll;
  display: grid;
  grid-gap: 3px;
  padding: .25em;
  padding-right: .5em;
  margin-right: .2em;
  grid-template-columns: repeat(auto-fill, 70px);
  grid-template-rows: repeat(auto-fit, 70px);
  grid-auto-flow: row;
  justify-content: center;


  &>* {
    height: 65px;
  }

  &::-webkit-scrollbar-track {
    position: absolute;
    //  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: transparent;
    outline: 1px solid var(--bs-info);
    border-radius: 0px;
  }

  &::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    background-color: var(--bs-info);
    border-radius: 0px;
  }

  &::-webkit-scrollbar {
    position: absolute;
    width: 10px;
    background-color: transparent;
  }
}

.btn-sort {
  background-color: transparent;
  color: var(--bs-info);
  border: 1px solid var(--bs-info);
  padding: 1px 15px;

  &:hover {
    background-color: var(--bs-info);
    color: var(--bs-dark);
  }

}
</style>
