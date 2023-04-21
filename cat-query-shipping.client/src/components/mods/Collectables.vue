<template>
  <div class="container-fluid flex-row">
    <div id="collectable-area" class="collectable-grid">

      <CollectableItem v-for="item in displayed" :key="item.id" :item="item" @moved="movedCollectable" />

      <button v-if="collectables" class="btn text-light" data-bs-toggle="offcanvas"
        data-bs-target="#collectable-drawer"><i class="mdi mdi-cassette"></i></button>
    </div>
    <CollectableDrawer />
  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../../AppState.js';
import { collectablesService } from '../../services/CollectablesService.js';
import { logger } from '../../utils/Logger.js';
const autoSave = ref(false)
const timer = ref(5)
let inter = null

const collectables = computed(() => AppState.account.inventory?.filter(c => c.type == 'collectable'))
const displayed = computed(() => AppState.collectables)

function movedCollectable() {
  logger.log('moved')
  timer.value = 5
  if (inter == null) {
    inter = setInterval(() => {
      logger.log('saving in', timer.value)
      timer.value--
      if (timer.value == 0) autoSave.value = true
    }, 1000)
  }
}
watch(autoSave, saveCollectables)

async function saveCollectables() {
  try {
    if (autoSave.value) {
      logger.log('saving')
      autoSave.value = false
      inter = clearInterval(inter)
      await collectablesService.saveCollectables()
    }
  } catch (error) {
    Pop.error(error)
  }
}
</script>


<style lang="scss" scoped>
.collectable-grid {
  position: relative;
  // margin: .25em 7em;
  // display: grid;
  // grid-template-columns: repeat(auto-fill, 50px);
  // grid-template-rows: 25px;
  // justify-items: end;
  // grid-auto-flow: row reverse;
}

.collect {
  place-self: center;
  height: 100%;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
  transform: translateY(0px) scale(1.1);
  opacity: 0;
  animation: drop-in .3s cubic-bezier(.74, .71, .68, 1.19) forwards;

  &:hover {
    transform: translateY(0px) scale(1.5);
    transition: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
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
