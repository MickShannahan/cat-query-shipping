<template>
  <ModalComponent :id="id">
    <template #header class="bg-dark"></template>
    <template #body class="bg-dark-glass">
      <div class="container-fluid item-area">
        <section v-if="revealed" class="item-img">
          <img class="open-bg" :src="boxImage" alt="">
          <DynamicImage class="item" :image="hiddenItem.img" :background="hiddenItem.background" />
          <h2 class="item-title">{{ hiddenItem.name }}</h2>
        </section>
        <section v-else-if="!revealed && hiddenItem.id" class="hidden-img" @click="revealItem">
          <!-- <img class="closed-bg" src="/assets/img/items/BoxClosed.gif" alt=""> -->
          <DynamicImage class="closed-bg" image="/assets/img/items/BoxClosed.gif" />
        </section>
      </div>
    </template>
    <template #footer>
      <section class="row description  w-100 justify-content-between">
        <div class="col-8 screen-theme text-theme-primary inset rounded p-1">
          <div v-if="revealed" class="reveal-text">
            <small>
              {{ hiddenItem.description }}
            </small>
            <div class="text-theme-warning d-flex" v-tooltip:bottom="hiddenItem.rarity">
              <span class="text-theme-secondary mx-3 fw-bold">{{ hiddenItem.type }}</span>
              <i v-for="n in rarities.indexOf(hiddenItem.rarity) + 1" class="mdi mdi-star"></i>
            </div>
          </div>
          <small v-else>
            click on the shipment to open...
          </small>
        </div>

        <div class="col-4 text-end">
          <button @click="revealed = false" class=" comp-button comp-red w-50">re-hide</button>
          <button @click="buyAgain" class="comp-button comp-green px-3 py-2 w-100 mt-2" :disabled="!revealed">buy
            another</button>
        </div>
      </section>
    </template>
  </ModalComponent>
</template>


<script setup>
import { Modal } from 'bootstrap';
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../../AppState.js';
import { gameService } from '../../services/GameService.js';
import { logger } from '../../utils/Logger.js';
import closed from '/assets/img/items/BoxClosed.gif'
import open from '/assets/img/items/BoxOpen.gif'
const rarities = ['common', 'uncommon', 'rare', 'super-rare', 'ultra-rare', 'secret-rare']
const props = defineProps({ id: String })
const revealed = ref(false)
const hiddenItem = computed(() => AppState.hiddenItem)
const activeItem = computed(() => AppState.activeItem)
const boxImage = ref(closed)
function revealItem() {
  revealed.value = true
  setTimeout(() => boxImage.value = open, 100)
}
function seeDetails() {
  gameService.setItem(AppState.hiddenItem)
  Modal.getOrCreateInstance('#' + props.id).hide()
}
function buyAgain() {
  AppState.hiddenItem = {}
  boxImage.value = closed
  revealed.value = false
  gameService.buyRandom()
}
onMounted(() => {
  const revealModal = document.getElementById(props.id)
  revealModal?.addEventListener('hidden.bs.modal', function (event) {
    logger.log('hiding')
    AppState.hiddenItem = {}
    boxImage.value = closed
    revealed.value = false
  })
})
</script>


<style lang="scss" scoped>
$delay: 2.7s;

.item-area {
  height: 40vh;
}

.item-img {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}

.item-title {
  position: absolute;
  bottom: 0;
  animation: reveal .5s ease $delay forwards;
  color: var(--bs-dark);
  background-color: var(--bs-info);
  opacity: 0;
  transform: scale(0);
  padding: .25em .75em;
  margin: 0px .5em 0px 0px;
  border-radius: 45em;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
}

.item {
  opacity: 0;
  transform: scale(0);
  animation: reveal .5s cubic-bezier(.53, .36, .65, 1.51) $delay forwards;
}

.hidden-img {
  height: 100%;
  cursor: grab;
  display: flex;
  justify-content: center;
  opacity: 0;
  transform: translateY(-70px);
  animation: drop .5s forwards 1 ease-in;
}

.closed-bg {
  height: 100%;
  position: absolute;
  top: 0;

  &:hover {
    filter: drop-shadow(0px 0px 5px var(--bs-info));
  }
}

.open-bg {
  height: 100%;
  position: absolute;
  top: 0;
}

.description {
  min-height: 10vh;
}

.reveal-text {
  opacity: 0;
  animation: revealed-text .3s $delay forwards
}

@keyframes reveal {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(.75);
  }
}

@keyframes revealed-text {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes drop {
  0% {
    opacity: 0;
    transform: translateY(-150px) scale(.2, .2);
  }

  50% {
    opacity: 1;
    transform: translateY(-90px) scale(1, 1);
  }

  80% {
    opacity: 1;
    transform: translateY(40px)scale(1.05, .9);
  }

  100% {
    opacity: 1;
    transform: translateY(0px)scale(1, 1);
  }
}
</style>
