<template>
  <div class="computer row bg-primary shadow physical-border p-2 pb-3 px-4">
    <div class="col-12 p-0 pt-2">
      <div class="d-flex">
        <label for="basic-url" class="form-label bg-info rounded py-1 px-3"
          >make a query object to search the shipment database</label
        >
        <button
          class="switch-button comp-button ms-auto mb-2 p-1 px-2"
          type="button"
          @click="switchScreen"
        >
          http
        </button>
      </div>
    </div>
    <!-- Actual Window -->
    <div id="code-window" class="col-9 p-0 code-search"></div>
    <div class="col-3">
      <div class="row justify-content-end">
        <button
          class="col-10 py-2 mt-3 mb-4 comp-button comp-green"
          @click="search"
        >
          search
        </button>
        <button class="col-5 py-2 comp-button comp-yellow" @click="clear">
          reset
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { init } from '../services/CodeEditor'
import { logger } from '../utils/Logger';
import { shipmentService } from '../services/ShipmentService';
export default {
  setup(props, { emit }) {
    let code = null
    onMounted(() => {
      code = init()
    })
    return {
      code,
      search() {
        logger.log(code.getValue())
        shipmentService.searchWithQueryObject(code.getValue())
      },
      clear() {
        code.setValue([
          'const query = {',
          'recipient: "Boz"',
          '}'
        ].join('\n'))
      },
      switchScreen() {
        logger.log('code switch')
        emit('switch')
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.computer {
  min-height: 25vh;
}

#code-window {
  border-radius: 5px;
  outline: 1px solid #499678;
  overflow: hidden;
  max-height: 100%;
  border-top: 5px solid #315f8a;
  border-left: 5px solid #315f8a;
  border-bottom: 5px solid #55a6a8;
  border-right: 5px solid #55a6a8;
}
</style>
