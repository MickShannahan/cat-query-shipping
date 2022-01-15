<template>
  <div class="row letter-head flex-column align-items-center p-4">
    <h3 class="col-12 text-warning darken-40 text-center">
      Search the Shipment Database using a 'mongoose' filter object
    </h3>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    const state = reactive({

    })
    return { state }
  }
};
</script>


<style scoped>
.letter-head {
  min-height: 100%;
  background: linear-gradient(0deg, #fdf4d6cb 0%, #fdf4d6cb 00%),
    url("../assets/img/CUPS-Logo.png");
  background-position: center center;
  background-size: 100%, 50%;
  background-repeat: no-repeat no-repeat;
}
</style>

