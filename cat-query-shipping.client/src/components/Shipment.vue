<template>
  <div class="row mx-auto mb-1" @click="checkAnswer">
    <div class="col-12 paper-edge rounded py-0">
      <div
        class="shipment row my-0 mx-5 perferated-edge-bottom px-2"
        :class="{
          'bg-light': !hasBeenGuessed,
          'bg-danger lighten-30': hasBeenGuessed,
        }"
      >
        <div class="col-12 action">
          <div class="row p-2 ps-3">
            <div  class="col-6" v-for="(value, key) in shipment" :key="key">
              <b v-if="key != 'description'" class="">{{ key }}</b
              ><span v-if="key != 'description'" class=" text-dark lighten-20">: {{ value }}</span>
            </div>
          </div>
        </div>
        <div class="col-4 stamp-incorrect" v-if="hasBeenGuessed">
          <img
            class="stamp"
            src="../assets/img/incorrectStamp.png"
            loading="eager"
            alt=""
          />
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
// .shipment:hover {
//   outline: 1px solid #a4d5a5;
//   background: #a4d5a53f;
// }

.perferated-edge-bottom {
  outline: 4px dashed var(--bs-light);
}

.paper-edge {
  height: 100%;
  background-image: url("../assets/img/whitePageEdge.png");
  background-repeat: space repeat;
  image-rendering: pixelated;
  background-size: 8em;
  transition: all 0.15s ease;
  &:hover {
    transform: scale(1.01);
    outline: 2px solid #a4d5a5;
    // background: #a4d5a53f url("../assets/img/whitePageEdge.png");
    background-repeat: space repeat;
    image-rendering: pixelated;
    background-size: 8em;
  }
}

.hover {
  padding: 3px;
  border-radius: 5px;
  transition: all 0.15s ease;
}

.hover:hover {
  background: #2a2f32;
  color: #a4d5a5 !important;
  transform: translate(0, -2);
}

.stamp-incorrect {
  transform: translate(15em, 2em);
  position: absolute;
}

.stamp {
  min-height: 12em;
  aspect-ratio: 1;
  animation: stampped 0.2s cubic-bezier(0.54, -0.35, 0.45, 1.41) forwards;
}

@keyframes stampped {
  0% {
    opacity: 0%;
    transform: scale(1.2) rotate(30deg);
  }
  100% {
    opacity: 70%;
    transform: scale(1) rotate(30deg);
  }
}
</style>
