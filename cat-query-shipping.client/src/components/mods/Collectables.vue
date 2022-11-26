<template>
  <div class="container-fluid flex-row">
    <div class="collectable-grid">

      <div v-for="item in displayed" class="collect">
        <img class="img-fluid " :src="item.img" alt="">
      </div>

      <button v-if="collectables" class="btn text-light" data-bs-toggle="offcanvas"
        data-bs-target="#collectable-drawer"><i class="mdi mdi-cassette"></i></button>
    </div>
    <CollectableDrawer />
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { AppState } from '../../AppState.js';

const collectables = computed(() => AppState.account.inventory?.filter(c => c.type == 'collectable'))
const displayed = computed(() => AppState.collectables)
</script>


<style lang="scss" scoped>
.collectable-grid {
  position: relative;
  margin: .25em 7em;
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: 25px;
  justify-items: end;
  grid-auto-flow: row reverse;
}

.collect {
  place-self: center;
  height: 100%;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
  transform: translateY(0px) scale(1.1);
  opacity: 0;
  animation: drop-in .3s cubic-bezier(.74, .71, .68, 1.19) forwards;
}

button {
  position: absolute;
  top: 2px;
  right: -1em;
  opacity: .6;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

@keyframes drop-in {
  0% {
    transform: translateY(-50px) scale(0);
    opacity: 0;
  }

  50% {
    transform: translateY(-50px) scale(.8);
    opacity: 1;
  }

  100% {
    transform: translateY(0px) scale(1.1);
    opacity: 1;
  }
}
</style>
