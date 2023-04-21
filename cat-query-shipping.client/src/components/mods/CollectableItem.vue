<template>
  <div class="collectable" :class="{ dragging: dragging }" draggable="true" @drag="move" @dragstart="pickup"
    @dragend="drop" @click="flipItem">
    <img :class="`img-fluid ${collectable.facing}`" :src="collectable.img" alt="">
  </div>
</template>


<script setup>
import { computed, ref, watch, watchEffect } from 'vue';
import { logger } from '../../utils/Logger.js';
import Pop from '../../utils/Pop.js';
import { collectablesService } from '../../services/CollectablesService.js';
import { AppState } from '../../AppState.js';
const collectableArea = ref(0)
const startPosition = ref(0)
const dragging = ref(false)
const props = defineProps({ item: { type: Object, required: true } })
const collectable = ref({})
const position = ref(`50px`)
const emit = defineEmits(['moved'])

watchEffect(() => {
  collectable.value = { ...props.item }
  position.value = `${collectable.value.position}px`
  collectableArea.value = document.getElementById('collectable-area')?.getBoundingClientRect().width
})

function pickup(ev) {
  // logger.log('PICKED UP', ev.clientX, props.item.name)
  startPosition.value = ev.clientX
  dragging.value = true
}
function move(ev) {

}
function flipItem() {
  // logger.log('flipping', collectable.value.name)
  collectable.value.facing = collectable.value.facing == 'left' ? 'right' : 'left'
  let index = AppState.collectables.findIndex(c => c._id == props.item._id)
  // logger.log('dropped', AppState.collectables[index], collectable.value)
  collectable.value.position = parseInt(position.value)
  AppState.collectables.splice(index, 1, collectable.value)
  emit('moved')
}
function drop(ev) {
  let moved = ev.clientX - startPosition.value
  position.value = `${parseInt(position.value) + (moved)}px`
  if (parseInt(position.value) + 100 > collectableArea.value) {
    position.value = `${Math.round(collectableArea.value) - 100}px`
    // logger.log('too far right')
  }
  if (collectableArea.value - parseInt(position.value) > collectableArea.value) {
    position.value = `${0}px`
    // logger.log('too far left')
  }
  dragging.value = false
  let index = AppState.collectables.findIndex(c => c._id == props.item._id)
  // logger.log('dropped', AppState.collectables[index], collectable.value)
  collectable.value.position = parseInt(position.value)
  AppState.collectables.splice(index, 1, collectable.value)
  emit('moved')
}



</script>


<style lang="scss" scoped>
.collectable {
  position: absolute;
  width: 100px;
  left: v-bind(position);
  // grid-column: v-bind(position);
  // grid-row: 1 / span 1;
  cursor: grab;

  place-self: center;
  height: 100%;
  transition: margin .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.4));
  transform: translateY(0px) scale(1.1);
  opacity: 0;
  animation: drop-in .3s cubic-bezier(.74, .71, .68, 1.19) forwards;

}

.dragging {
  img {
    opacity: .25;
  }
}


.left {
  transform: scaleX(1);
}

.right {
  transform: scaleX(-1);
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
