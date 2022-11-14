<template>
  <div class="mod-panel " :class="{ 'bad-mods': !modsOk }">
    <ModBase v-for="m in mods" :key="m.id" class="selectable" @click="selectActive(m.id)" @blur="activeMod = {}" :class="{
      'active':
        m.id == activeMod.id
    }" :x="m.x" :y="m.y" :slots="m.slots" :type="m.type" />

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, watchEffect } from 'vue';
import { logger } from '../utils/Logger.js';
export default {

  setup() {
    const activeMod = ref({})
    const slots = ref([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ])
    const modsOk = ref(true)
    const mods = ref([
      {
        id: '123',
        name: '1',
        slots: [[1, 1]],
        x: 0, y: 0
      },
      {
        id: '345',
        name: '2',
        slots: [[1, 1], [0, 1]],
        x: 0, y: 0
      },
      {
        id: '456',
        name: '3',
        slots: [[1, 1]],
        x: 0, y: 0
      },
      {
        id: '567',
        name: '4',
        slots: [[1, 1]],
        x: 0, y: 0
      },
    ])
    function selectActive(id) {
      const mod = mods.value.find(m => m.id == id)
      if (activeMod.value != mod) {
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
      switch (key) {
        case 'ArrowUp':
          if (activeMod.value.y > 0)
            activeMod.value.y--
          break;
        case 'ArrowDown':
          if (activeMod.value.y + activeMod.value.slots.length < 5)
            activeMod.value.y++
          break;
        case 'ArrowLeft':
          if (activeMod.value.x > 0)
            activeMod.value.x--
          break;
        case 'ArrowRight':
          if (activeMod.value.x + activeMod.value.slots[0].length < 4)
            activeMod.value.x++
          break;
      }
    }
    watchEffect(() => {
      let tempSlots = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
      mods.value.forEach(m => {
        m.slots.forEach((row, r) => {
          row.forEach((col, c) => {
            tempSlots[m.y + r][m.x + c] += col
          })
        })
      })
      slots.value = tempSlots
      modsOk.value = slots.value.every(r => r.every(c => c <= 1))
    })
    return {
      selectActive,
      slots,
      activeMod,
      modsOk,
      mods
    }
  }
};
</script>


<style lang="scss" scoped>
.mod-panel {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-template-rows: repeat(5, 40px);
  background-color: #6de9f9;
  background-image: url('/src/assets/img/Textures/carbon-fibre.png');
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
</style>
