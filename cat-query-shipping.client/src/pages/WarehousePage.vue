<template>
  <div class="component">
    Warehouse Page
    <DialogueV2 :character="Bozko" :btnPosition="1" />
    <DialogueV2 :character="Kimko" :btnPosition="2" />

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Bozko, Kimko } from '../models/Character.js'
export default {
  setup() {
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/src/assets/img/bg/Cups-Warehouse.png')"
    })
    return { Bozko, Kimko }
  }
};
</script>


<style lang="scss" scoped>

</style>
