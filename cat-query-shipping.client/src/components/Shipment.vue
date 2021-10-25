<template>
  <div class="shipment row my-1 p-2 rounded" @click="checkAnswer">
    <div
      class="col-12 rounded"
      :class="{
        'bg-light': !hasBeenGuessed,
        'bg-danger lighten-30': hasBeenGuessed,
      }"
    >
      <div class="row">
        <div class="col-6" v-for="(value, key) in shipment" :key="key">
          <b class="hover">{{ key }}</b
          ><span class="hover text-dark lighten-20">: {{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { accountService } from '../services/AccountService'
export default {
  props: { shipment: { type: Object, required: true } },
  setup(props) {
    return {
      hasBeenGuessed: computed(() => AppState.currentGuesses.includes(props.shipment._id)),
      checkAnswer() {
        accountService.checkAnswer(props.shipment._id)
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.shipment {
  transition: all 0.15s ease;
}
.shipment:hover {
  outline: 1px solid #a4d5a5;
  background: #a4d5a53f;
}

.hover {
  transition: all 0.15s ease;
}

.hover:hover {
  background: #2a2f32;
  color: #a4d5a5 !important;
}
</style>
