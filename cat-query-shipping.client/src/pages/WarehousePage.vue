<template>
  <section class="warehouse-grid">

    <!-- STUB item details -->
    <div class="item-details container-fluid console-console2 outset plastic px-4 py-3 rounded ">
      <!-- SECTION primary screen -->
      <ItemDetails :screen="screen" />
      <!--  -->
    </div>

    <div class=" item-buttons">
    </div>

    <div class="inventory-bar console-console outset plastic p-3 pb-4">
      <button class="btn comp-button comp-green px-2 py-1" @click="screen = 'shop'"><i class="mdi mdi-cart"></i>
      </button>
      <button class="btn comp-button comp-green px-2 py-1" @click="screen = 'craft'"><i class="mdi mdi-wrench"></i>
      </button>
      <button class="btn comp-button comp-yellow px-2 py-1" @click="screen = 'inventory'"><i
          class="mdi mdi-bag-personal"></i> </button>
      <button class="btn comp-button comp-blue px-2 py-1" @click="screen = 'mods'"> <i class="mdi mdi-memory"></i>
      </button>
      <button class="btn comp-button comp-red px-2 py-1"><i class="mdi mdi-exit-run"></i></button>
    </div>

    <div class="inventory-main console-console outset plastic container-fluid px-4 py-3">
      <!-- STUB inventory screen -->
      <section class="row rounded screen-theme inset text-theme-primary p-2 h-100">
        <!-- SECTION secondary screen -->
        <div class="col-12 p-0">
          <ShopScreen v-if="screen == 'shop'" />
          <CraftScreen v-if="screen == 'craft'" />
          <InventoryScreen v-if="screen == 'inventory'" />
          <ModsScreen v-if="screen == 'mods'" />
        </div>
        <!--  -->
      </section>
    </div>


    <!-- SECTION Dialogues -->
    <section>
      <DialogueV2 :character="Bozko" :btnPosition="1" />
      <DialogueV2 :character="Kimko" :btnPosition="2" />
      <DialogueV2 :character="KimkoShop" :btnPosition="0" />
    </section>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watch } from 'vue';
import { Bozko, Kimko, KimkoShop } from '../models/Character.js'
import { logger } from '../utils/Logger.js';
export default {
  setup() {
    const screen = ref('inventory')
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-Warehouse.png')"

    })
    return {
      screen,
      Bozko, Kimko, KimkoShop,
      inventoryItems: computed(() => AppState.account.inventory)
    }
  }
};
</script>


<style lang="scss" scoped>
$padding: 12vw;

@media (max-width: 768px) {
  $padding: 3vw;
}

.warehouse-grid {
  display: grid;
  width: 100%;
  grid-template-columns: $padding 35vw 75px 1fr $padding;
  grid-template-rows: 5em 5em 2em 1fr 2em 6em 9em;
}

.grid-nav {
  grid-column: 2 / span 3;
  grid-row: 1 /span 1;
}

.item-details {
  grid-column: 2 / 3;
  grid-row: 2 / 5;
  place-self: stretch;
}

.item-buttons {
  background-color: var(--bs-info);
  grid-column: 2 / 3;
  grid-row: 6 / 7;
  place-self: stretch;
}

.inventory-bar {
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  place-self: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 3em;
  gap: 1em;

  >button {
    place-self: stretch;
  }
}

.inventory-main {
  grid-column: 4 / 5;
  grid-row: 4 / 7;
  place-self: stretch;

}
</style>
