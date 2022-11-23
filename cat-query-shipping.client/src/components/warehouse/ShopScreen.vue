<template>
  <div class="shop-screen row">
    <!-- SECTION BUY -->
    <div class="col-6 pe-0 ">
      <div class="text-dark bg-info text-center fw-bold py-1 h-100">Buy</div>
    </div>
    <div class="col-6 ps-0 text-end">
      <div class="text-dark bg-info text-end fw-bold py-1 h-100" title="time until shop gets new items">{{ timeLeft
      }}
        <i class="mdi mdi-clock pe-4"></i>
      </div>
    </div>
    <!-- STUB items -->
    <div class="col-12 d-flex mt-3 justify-content-around align-items-center">
      <ShopItem v-for="(item, i) in items" :item="item" :class="`item-${i}`" />
    </div>
    <!-- STUB liquidated shipments -->
    <div class="col-12 mt-2">
      <div class="liq-shipment-btn border border-warning selectable text-center p-2 py-4" @click="selectDeserted">
        <i class="mdi mdi-shimmer"></i> <i class="mdi mdi-package-variant-closed"></i>
      </div>
    </div>

    <!-- SECTION SELL -->
    <!-- <div class="col-12 mt-3">
      <div class="text-theme-primary text-center border border-theme py-1">sell</div>
    </div>

    <div class="col-12">
      <div class="inventory h-100">
        <InventoryItem v-for="(item, i) in yourItems" :item="item" :index="i" />
      </div>
    </div> -->
  </div>
</template>


<script setup>
import { Offcanvas } from 'bootstrap';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AppState } from '../../AppState.js';
import { chatService } from '../../services/ChatService.js';
import { gameService } from '../../services/GameService.js';

const items = computed(() => AppState.shop?.itemsForSale)
const yourItems = computed(() => AppState.account?.inventory.filter(i => i.type != 'junk'))
Offcanvas.getOrCreateInstance('#KimkoShop-OffCanvas').show()
const timeLeft = ref('loading...')

onMounted(async () => {
  AppState.activeItem = {}
  await gameService.getShop()
  chatService.quip('[Open Shop]')
  startTime()
})
onUnmounted(() => {
  Offcanvas.getOrCreateInstance('#KimkoShop-OffCanvas').hide()
})
function startTime() {
  setInterval(() => {
    let now = new Date().getTime()
    let then = new Date(AppState.shop.updatedAt).getTime() + 1000 * 60 * 3
    let when = then - now
    let time = Math.round(when / 1000)
    if (time <= 0) {
      timeLeft.value = 'new shop loading...'
      gameService.getShop()
    } else if (time > 60 * 60) { //hours
      timeLeft.value = Math.round(time / 60 / 60) + 'h'
    } else if (time > 60) {
      timeLeft.value = Math.round(time / 60) + 'm'
    } else {
      timeLeft.value = Math.round(time) + 's'
    }
  }, 1000)
}
function selectDeserted() {
  gameService.setItem({
    name: 'Deserted Shipment',
    level: 0,
    cost: 450,
    img: '/assets/img/items/BoxClosed.gif',
    description: `These are lost shipments that have been recovered and deserted by their recipients. C.U.P.S. would like to thank the hard work of their employees by offering such shipments to buy. The contents of each shipment is unknown, imagine what could be inside! no refunds.`,
    id: 'random'
  })
}
</script>


<style lang="scss" scoped>
.inventory {
  position: relative;
  width: 100%;
  border: 1px solid;
  height: 92%;
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
}

.liq-shipment-btn {
  color: var(--bs-warning);
  background-color: transparent;
  cursor: pointer;

  // &:hover {
  //   background-color: var(--bs-warning);
  //   color: var(--bs-dark);
  // }
}
</style>
