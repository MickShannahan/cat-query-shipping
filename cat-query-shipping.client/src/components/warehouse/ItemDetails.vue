<template>
  <div class="row p-2 screen-theme rounded h-100">
    <transition name="screenEffect" mode="out-in">
      <!-- Item details -->
      <div v-if="item.name" class="item-details p-0">

        <div class="item-img ">
          <DynamicImage :image="item.img" :background="item.background" />
        </div>

        <div class="item-description border border-theme">
          <p class="bg-info text-dark px-3 fw-bold mb-1 d-flex justify-content-between">
            <span>{{ item.name }}</span>
            <span>{{ item.type }}</span>
          </p>
          <p class="p-1">{{ item.description }}</p>
        </div>

        <div v-if="screen == 'shop'" class="item-shop text-theme-primary mt-2">
          <button class="bg-info text-center w-100 border-0" @click="buyItem">buy <i
              class="mdi mdi-google-podcast"></i>{{ item.cost
              }}</button>
        </div>
        <div v-else-if="screen == 'craft'" class="item-craft">craft</div>
        <div v-else class="item-stats">stats</div>

      </div>
      <!-- no item selected -->
      <div class="text-theme-primary" v-else>no signal...</div>

    </transition>
    <RevealModal id="reveal-modal" />
  </div>
</template>


<script>
import { AppState } from '../../AppState';
import { computed, reactive, onMounted } from 'vue';
import { gameService } from '../../services/GameService.js';
import Pop from '../../utils/Pop.js';
import { Modal } from 'bootstrap';
export default {
  props: { screen: String },
  setup() {
    return {
      item: computed(() => AppState.activeItem),
      background: computed(() => `url(${AppState.activeItem?.background || defaultBg})`),
      async buyItem() {
        let item = await gameService.buyItem()
        if (!item) {
          Pop.toast(`Purchased: ${AppState.activeItem.name}`)
        } else {
          AppState.hiddenItem = item
          Modal.getOrCreateInstance('#reveal-modal').show()
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.item-details {
  display: grid;
  grid-template-rows: 60% 1fr 50px;
  grid-template-columns: repeat(auto-fill, 10%);
  place-items: center;
}

.item-img {
  grid-column: 1/ -1;
  grid-row: 1/2;
  height: 26vh;
  width: 100%;
}

.item-description {
  grid-column: 1 / -1;
  color: var(--bs-info);
  font-size: 14px;
  place-self: stretch;
}

.item-stats {}

.item-shop {
  place-self: stretch;
  grid-column: 1 / -1;

  button:hover {
    background-color: var(--bs-warning) !important;
    box-shadow: 0px 0px 3px var(--bs-warning);
  }
}

.item-craft {}




.screenEffect-enter-active,
.screenEffect-leave-active {
  opacity: 1;
  transition: all 0.2s linear;
  transition-timing-function: steps(2, end);
}

.screenEffect-enter-from,
.screenEffect-leave-to {
  opacity: 0;
}
</style>
