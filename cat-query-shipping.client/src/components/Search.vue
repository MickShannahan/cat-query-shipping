<template>
  <form class="search" @submit="searchShipmentDatabase">
    <label for="basic-url" class="form-label bg-info rounded py-1 px-3"
      >make a query to find the lost shipment</label
    >
    <div class="input-group mb-3">
      <span class="input-group-text bg-dark text-success" id="basic-addon3">{{
        baseUrl
      }}</span>
      <input
        spellcheck="false"
        v-model="query"
        type="text"
        class="form-control bg-dark text-info"
        id="basic-url"
        aria-describedby="basic-addon3"
      />
      <button class="btn btn-info">search</button>
    </div>
  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { shipmentService } from '../services/ShipmentService'
export default {
  setup() {
    const query = ref('?')
    return {
      query,
      baseUrl: computed(() => AppState.baseUrl),
      searchShipmentDatabase() {
        shipmentService.searchShipmentDatabase(query.value)
      }
    }
  }
};
</script>


<style scoped>
</style>
