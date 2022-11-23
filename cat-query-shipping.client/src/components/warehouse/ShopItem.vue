<template>
  <div class="item border border-theme text-center selectable" @click="setItem">
    <i :class="`mdi mdi-${icon}`"></i>
    <div>
      {{ item.name }}
    </div>
    <img v-if="item.img != 'na'" :src="item.img" alt="">
    <img v-else src="../../assets/img/DataCard2.png" alt="">
    <div class="text-warning"><i class="mdi mdi-google-podcast"></i> {{ item.cost }}</div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { AppState } from '../../AppState.js';
import { gameService } from '../../services/GameService.js';

const props = defineProps({
  item: Object
})

function setItem() {
  gameService.setItem(props.item)
}

const icon = computed(() => {
  switch (props.item.type) {
    case 'mod':
      return 'memory'
    case 'resource':
      return 'flask'
    case 'collectable':
      return 'cassette'
    case 'junk':
      return 'trash-can'
  }
})

</script>


<style lang="scss" scoped>
.item {
  width: 28%;
  transition: all .1s linear;
  min-height: 8em;


  &:hover {
    width: 40%;

  }

}
</style>
