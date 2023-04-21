<template>
  <div class="component">
    <div class="offcanvas offcanvas-end bg-transparent border-0 rounded-lg square-start" data-bs-backdrop="false"
      tabindex="-1" id="collectable-drawer" aria-labelledby="staticBackdropLabel">
      <div class="offcanvas-header console-console2 square-bottom square-left outset plastic">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Set up Collectables <i class="mdi mdi-information"
            v-tooltip:top="information"></i>
        </h5>
        <button type="button" class="col-2 btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body bg-dark-glass container-fluid px-3 py-0">
        <div class="row h-100 w-100">
          <div class=" col-12 collects-tray p-1">
            <section class="collect installed" v-for="(collect, i) in installed" :key="collect.name + i"
              @click="removeCollect(collect.id)">
              <div>{{ collect.name }}</div>
              <img :src="collect.img" alt="">
            </section>
            <section class="collect" :class="{ installed: collect.itemId }" v-for="(collect, i) in inventory"
              :key="collect.name + i" @click="addCollect(collect)">
              <div class="text-light">{{ collect.name }}</div>
              <img :src="collect.img" alt="">
            </section>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { AppState } from '../../AppState.js';
import { collectablesService } from '../../services/CollectablesService.js';
import { Account } from '../../models/Account.js';
import { logger } from '../../utils/Logger.js';
const information = `
Show off you swag with collectables! If one is your favorite, then perhaps you should head over to your account in the break room and set that using the edit account feature.
`
const collectCounts = ref({})
const addingCollect = ref(false)
const installed = computed(() => AppState.collectables)
const installedLength = computed(() => AppState.collectables.length)
const inventory = computed(() => AppState.account?.inventory?.filter(i => i.type == 'collectable').sort((a, b) => {
  return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
}).filter(ma => {
  if (collectCounts.value[ma.name]) {
    collectCounts.value[ma.name]--
    return false
  }
  return true
}))
watch(installedLength, () => {
  collectCounts.value = {}
  installed.value.forEach(m => {
    let collect = collectCounts.value
    collect[m.name] = collect[m.name] ? collect[m.name] + 1 : 1
  })
})
watchEffect(() => {
  logger.log('collectable watch', AppState.account.installedCollectables)
  AppState.collectables = AppState.account.installedCollectables || []
})
async function addCollect(collect) {
  if (!addingCollect.value) {
    addingCollect.value = true
    // AppState.collectables.push(collect)
    collectablesService.addCollectable(collect)
  }
  addingCollect.value = false
}
function removeCollect(id) {
  collectablesService.removeCollectable(id)
  // AppState.collectables.splice(index, 1)
}
</script>


<style lang="scss" scoped>
.offcanvas {
  height: 25vh;
  width: 100vw;
  top: unset;
  bottom: 0;
  overflow: hidden;
}

.offcanvas-header {
  height: 2em;
}

.collects-tray {
  height: 100%;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-auto-rows: 110px;
  gap: 5px;
}

.collect {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: rgba(39, 39, 39, 0.219);
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    outline: 1px solid var(--bs-info);
  }

  img {
    height: 50%;
    image-rendering: pixelated;
  }
}

.installed {
  background-color: var(--bs-info);
  color: var(--bs-dark);
  transition: all .2s ease;

  &:hover {
    background-color: var(--bs-danger);
  }
}
</style>
