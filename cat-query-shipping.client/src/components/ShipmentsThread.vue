<template>
  <div class="row px-3 results-thread">
    <div
      class="col-1 text-center bg-dark p-1 rounded"
      :class="{
        'text-primary': hits == 1,
        'text-info': hits < 5,
        'text-warning': hits > 10 && hits < 24,
        'text-danger': hits > 25 || hits == 0,
      }"
    >
      Hits {{ hits }} <span v-if="hits == 50">MAX</span>
    </div>
    <div class="col-12">
      <Shipment v-for="s in shipments" :key="s.id" :shipment="s" />
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {

    return {
      shipments: computed(() => AppState.searchResults.results),
      hits: computed(() => AppState.searchResults.hits)
    }
  }
};
</script>


<style scoped>
</style>
