<template>
  <div class="mod-panel " :class="{ 'bad-mods': !modsOk }">
    <ModBase v-for="m in mods" :key="m.id" @click="selectActive(m)" @blur="activeMod = {}" :class="{
      'active':
        m.id == activeMod.id,
      'unlocked': modConfigure
    }" :mod="m" :x="m.x" :y="m.y" />
    <section class="info-tab" v-if="mods.length">
      <i class="mdi mdi-information text-light"></i>
      <div class="window bg-dark-glass text-light p-2">
        <small>arrange mods by clicking on them and positioning them with the ⬅⬆⬇➡ keys.</small>
      </div>
    </section>
  </div>
  <div class="mod-btn mt-2 d-flex" :class="{ 'configure': modConfigure }" @click="configure"
    v-tooltip:right="'configure mods'">
    <span></span>
    <div class="mod-thumb">
    </div>
  </div>
  <ModDrawer />
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect, watch } from 'vue';
import { logger } from '../utils/Logger.js';
import { Offcanvas } from 'bootstrap';
import { Mod } from '../models/Mod.js'
import Pop from '../utils/Pop.js';
import { modsService } from '../services/ModsService.js';
import { accountService } from '../services/AccountService.js';
import { shipmentService } from '../services/ShipmentService.js';
export default {

  setup() {
    const modConfigure = ref(false)
    const activeMod = ref({})
    const modsUnlocked = ref(false)
    const slots = ref([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ])
    const modsOk = ref(true)
    function selectActive(mod) {
      if (!modsUnlocked.value) return
      if (activeMod.value.id != mod.id) {
        activeMod.value = mod
        window.addEventListener('keydown', moveMod, false)
      } else {
        activeMod.value = {}
        window.removeEventListener('keydown', moveMod, false)
      }
    }
    function moveMod(ev) {
      ev.preventDefault()
      let key = ev.key
      let mod = activeMod.value
      switch (key) {
        case 'ArrowUp':
          if (mod.y > 0)
            mod.y--
          break;
        case 'ArrowDown':
          if (mod.y + mod.slots.length < 5)
            mod.y++
          break;
        case 'ArrowLeft':
          if (mod.x > 0)
            mod.x--
          break;
        case 'ArrowRight':
          if (mod.x + mod.slots[0].length < 4)
            mod.x++
          break;
      }
    }
    watchEffect(() => {
      let tempSlots = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      AppState.account.installedMods?.forEach(mod => {
        mod.slots.forEach((row, r) => {
          row.forEach((col, c) => {
            tempSlots[mod.y + r][mod.x + c] += col
          })
        })
      })
      slots.value = tempSlots
      let good = slots.value.every(r => r.every(c => c <= 1))
      modsOk.value = good
      AppState.modsOk = good
    })
    watch(modConfigure, () => {
      console.log('mod configured');
      Offcanvas.getOrCreateInstance('#mod-drawer').toggle()
    })
    return {
      selectActive,
      slots,
      activeMod,
      modsOk,
      modConfigure,
      modsUnlocked,
      mods: computed(() => AppState.account.installedMods),
      async configure() {
        if (!modsUnlocked.value) {
          modsUnlocked.value = true
          modConfigure.value = true
        } else if (!modsOk.value) {
          Pop.toast('invalid mod configuration', 'error')
          return
        } else {
          await modsService.updateMods()
          await shipmentService.getAccountShipment()
          modsUnlocked.value = false
          modConfigure.value = false
          activeMod.value = {}
          Pop.toast('Mods Config saved', 'success')
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.mod-panel {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-template-rows: repeat(5, 40px);
  grid-auto-flow: dense;
}

.active {
  transition: all .3s ease;
  transform: translateY(-5px);
  box-shadow: 0px 5px 1px rgba(0, 0, 0, 0.479);
  outline: 3px dashed rgba(255, 255, 255, 0.541);
  z-index: 100;
}

.bad-mods {
  outline: 2px dashed var(--bs-danger);
}

.mod-btn {
  width: 50%;
  margin: auto 0;
  grid-row: 6 / 7;
  align-self: baseline;
  border-radius: 45em;

  span {
    width: 0px;
    transition: all .2s ease;
  }


  .mod-thumb {
    height: 1em;
    width: 70%;
    border-radius: 45em;
    text-align: center;
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
      background-color: #489da8;
    }

    &::before {
      content: '';

      width: 50px;
      height: 1em;
      background-color: var(--bs-info);
    }

    i {
      padding: 0;
    }
  }
}

.unlocked {
  position: relative;

  &:hover {
    cursor: pointer;

    &:after {
      opacity: 0.1;
    }
  }

  &:after {
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    background-color: currentColor;
  }
}

.configure {
  span {
    width: 30%;
  }

  .mod-thumb {
    background-color: var(--bs-info);
  }
}

.info-tab {
  text-align: end;
  position: absolute;
  top: 0;
  right: 110%;

  i {
    opacity: .6;
  }

  .window {
    text-align: start;
    border-radius: 8px;
    opacity: 0;
    transform: scale(0);
    transition: all .2s ease;
    width: 20ch;
    transform-origin: top left;
    position: absolute;
    top: 1em;
    left: 0;
  }

  &:hover {
    .window {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
