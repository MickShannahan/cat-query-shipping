<template>
  <div class="component">
    <div class="offcanvas offcanvas-start bg-transparent border-0 rounded-lg square-start" data-bs-backdrop="false"
      tabindex="-1" id="mod-drawer" aria-labelledby="staticBackdropLabel">
      <div class="offcanvas-header console-console2 square-bottom square-left outset plastic">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Configure Mods</h5>
      </div>
      <div class="offcanvas-body bg-dark-glass container-fluid px-3 py-0">
        <div class="row h-100">
          <div class="col-4 p-3 ">description</div>
          <div class=" col-8 mods-tray p-1">
            <section class="mod installed" v-for="(mod, i) in installed" :key="mod.type + i" @click="removeMod(mod.id)">
              <div>{{ mod.name }}</div>
              <img :src="mod.img" alt="">
            </section>
            <section class="mod" :class="{ installed: mod.itemId }" v-for="(mod, i) in inventory" :key="mod.name + i"
              @click="addMod(mod.id)">
              <div class="text-light">{{ mod.name }}</div>
              <img :src="mod.img" alt="">
            </section>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { computed, ref, watch } from 'vue';
import { AppState } from '../../AppState.js';
import { modsService } from '../../services/ModsService.js'
const modCounts = ref({})
const addingMod = ref(false)
const installed = computed(() => AppState.account.installedMods)
const installedLength = computed(() => AppState.account.installedMods?.length)
const inventory = computed(() => AppState.account?.inventory?.filter(i => i.type == 'mod').sort((a, b) => {
  return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
}).filter(ma => {
  if (modCounts.value[ma.name]) {
    modCounts.value[ma.name]--
    return false
  }
  return true
}))
watch(installedLength, () => {
  modCounts.value = {}
  installed.value.forEach(m => {
    let mod = modCounts.value
    mod[m.name] = mod[m.name] ? mod[m.name] + 1 : 1
  })
})
async function addMod(id) {
  if (!addingMod.value) {
    addingMod.value = true
    await modsService.addMod(id)
  }
  addingMod.value = false
}
function removeMod(id) {
  modsService.removeMod(id)
}
</script>


<style lang="scss" scoped>
.offcanvas {
  height: 40vh;
  width: 100vw;
  top: unset;
  bottom: 0;
  overflow: hidden;
}

.offcanvas-header {
  height: 2em;
}

.mods-tray {
  height: 100%;
  max-width: 66vw;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-auto-rows: 110px;
  gap: 5px;
}

.mod {
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
