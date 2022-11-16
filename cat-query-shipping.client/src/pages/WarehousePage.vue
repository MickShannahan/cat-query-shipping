<template>
  <section class="warehouse-grid">
    <div class="item-details container-fluid plastic-shell">
    </div>

    <div class="item-buttons">
    </div>

    <div class="inventory-bar physical-border plastic-shell"></div>

    <div class="inventory-main physical-border plastic-shell container-fluid px-4 py-3">
      <!-- STUB inventory screen -->
      <section class="row bg-black rounded screen text-info p-2 h-100">
        <div class="col-12 title-bar d-flex justify-content-between">
          <div>Your inventory</div>
          <div>{{ inventoryItems.length }}<i class="mdi mdi-package ms-3 me-1"></i></div>
        </div>
        <div class="col-12 inventory">
          <InventoryItem v-for="(item, i) in inventoryItems" :key="item._id + i" :item="item" :index="i" />
        </div>
      </section>
    </div>










    <!-- SECTION Dialogues -->
    <section>
      <DialogueV2 :character="Bozko" :btnPosition="1" />
      <DialogueV2 :character="Kimko" :btnPosition="2" />
    </section>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Bozko, Kimko } from '../models/Character.js'
export default {
  setup() {
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-Warehouse.png')"

    })
    return {
      Bozko, Kimko,
      inventoryItems: computed(() => AppState.account.inventory)
    }
  }
};
</script>


<style lang="scss" scoped>
$padding: 12vw;

@media (max-width: 768px) {
  $padding: 5vw;
}

.warehouse-grid {
  display: grid;
  width: 100%;
  grid-template-columns: $padding 30vw 75px 1fr $padding;
  grid-template-rows: 9em 6vh 2em 1fr 2em 7vh 12em;
}

.item-details {
  background-color: var(--bs-info);
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
  background-color: var(--bs-primary);
  grid-column: 4 / 5;
  grid-row: 2 / 3;
  place-self: stretch;
}

.inventory-main {
  background-color: var(--bs-primary);
  grid-column: 4 / 5;
  grid-row: 4 / 7;
  place-self: stretch;

  .title-bar {
    height: 1.5em;
    border: 1px solid var(--bs-info);
  }

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
}
</style>
