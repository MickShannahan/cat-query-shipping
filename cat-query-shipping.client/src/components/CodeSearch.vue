<template>
  <div class="row px-3">
    <div
      class="text-light col-2 btn"
      data-bs-toggle="collapse"
      href="#code-collapse"
    >
      <i class="mdi mdi-console"></i> toggle code window
    </div>
  </div>
  <div id="code-collapse" class="row px-3 align-items-end justify-content-end">
    <div id="code-window" class="col-12 p-0 code-search"></div>
    <button class="col-1 btn btn-outline-info btn-over-window" @click="search">
      <i class="mdi mdi-send"></i>
    </button>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { init } from '../services/CodeEditor'
import { logger } from '../utils/Logger';
import { shipmentService } from '../services/ShipmentService';
export default {
  setup() {
    let code = null
    onMounted(() => {
      code = init()
    })
    return {
      code,
      search() {
        logger.log(code.getValue())
        shipmentService.searchWithQueryObject(code.getValue())
      }
    }
  }
};
</script>


<style scoped>
#code-window {
  min-height: 17vh;
  max-width: 100%;
  border-radius: 5px;
  border: 1px solid #499678;
  overflow: hidden;
}

.btn-over-window {
  position: absolute;
}
</style>
