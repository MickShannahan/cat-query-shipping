<template>
  <div class="mod" :class="{ burnt: burnt && !showBurn }">
    <div v-if="showCount && visibleCount" class="counter bubble">{{ visibleCount }}</div>
    <div v-if="showBurn" class="burner bubble"><i class="mdi mdi-fire"></i></div>
  </div>
</template>


<script>
import { computed, watch, ref, onMounted } from 'vue';
import { Mod } from '../../models/Mod.js';
import { logger } from '../../utils/Logger.js';
import { AppState } from '../../AppState.js';

export default {
  props: { mod: Mod, x: Number, y: Number },
  setup(props) {
    const burnt = computed(() => props.mod.burnt)
    const count = computed(() => props.mod.count || props.mod.data?.count)
    const timer = computed(() => AppState.settings?.modTimer || 1500)
    const visibleCount = ref(0)
    const showBurn = ref(false)
    const showCount = ref(false)
    onMounted(() => visibleCount.value = count.value)
    watch(burnt, () => {
      logger.log(props.mod.name, 'burnt')
      showBurn.value = true
      setTimeout(() => showBurn.value = false, timer.value)
    })
    watch(count, () => {
      if (!burnt.value) {
        logger.log(props.mod.name, count.value)
        visibleCount.value = count.value + 1
        showCount.value = true
        setTimeout(() => visibleCount.value = count.value, timer.value / 2)
        setTimeout(() => showCount.value = false, timer.value)
      }
    })
    return {
      col: computed(() => `${props.x + 1} / span ${props.mod.slots[0].length}`),
      row: computed(() => `${props.y + 1} / span ${props.mod.slots.length}`),
      img: computed(() => `url(${props.mod.img})`),
      burnt,
      count,
      visibleCount,
      showCount,
      showBurn
    }
  }
};
</script>


<style lang="scss" scoped>
.mod {
  position: relative;
  transition: all .2s ease;
  margin: 2px;
  border-radius: 2px;
  grid-column: v-bind(col);
  grid-row: v-bind(row);
  place-self: stretch;
  filter: grayscale(0) brightness(1) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5));
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  background-image: v-bind(img);
  opacity: 0;
  animation: drop-in .2s ease forwards;
}

.bubble {
  position: absolute;
  top: -4px;
  left: -4px;
  height: 25px;
  width: 25px;
  border-radius: 45em;
  text-align: center;
  padding: auto;
  animation: pop-bubble 1.5s ease forwards;
  filter: unset;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.288);
}

.counter {
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(20px);
  color: var(--bs-info);
}

.burner {
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(20px);
  color: var(--bs-danger);
  animation-name: burn-bubble;
}

.burnt {
  filter: grayscale(.4) brightness(0.6) drop-shadow(0px 0px 1px red);
}


@keyframes drop-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes burning {
  0% {
    transform: translate(0px, 0px);
    filter: grayscale(0) brightness(1);
  }

  25% {
    transform: translate(2px, 0px);
    filter: grayscale(0) brightness(1);
  }

  50% {
    transform: translate(0px, 2px);
    filter: grayscale(0) brightness(1);
  }

  50% {
    transform: translate(-2px, 0px);
    filter: grayscale(0) brightness(1);
  }

  100% {
    transform: translate(0px, 0px);
    filter: grayscale(.6) brightness(.5);
  }
}

@keyframes pop-bubble {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  20% {
    opacity: 1;
    transform: scale(1);
  }

  80% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes burn-bubble {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  20% {
    opacity: 1;
    transform: scale(1.5);
  }

  80% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
