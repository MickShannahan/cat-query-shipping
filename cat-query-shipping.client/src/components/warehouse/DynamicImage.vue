<template>
  <div class="image">
    <div class="reflection-container">
      <div v-for="n in 9" :class="`reflection-grid-cell cell-${n}`"></div>
      <div class="reflection-content d-flex justify-content-center">
        <img v-if="image == 'na'" src="../../assets/img/DataCard1.png" class="img-fluid" alt="">
        <img v-else :src="image" class="img-fluid" alt="">
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import defaultBg from '/assets/img/items/genericItemBg.png'
const props = defineProps({
  image: String,
  background: String
})
const background = computed(() => `url(${props.background || defaultBg})`)
</script>


<style lang="scss" scoped>
.image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
}

.reflection-container {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  transform-style: preserve-3d;
  perspective: 1000px;
  aspect-ratio: 1/1;
  height: 100%;


  .reflection-content {
    height: 100%;
    width: auto;
    background-size: cover;
    background-position: center;
    transform: rotateX(0) rotateY(0);
    pointer-events: none;
    transition: 100ms linear transform;

    img {
      height: 100%;
      width: auto;
      object-fit: contain;
      image-rendering: pixelated;
    }

    &:before {
      content: '';
      position: absolute;
      width: 110%;
      height: 110%;
      left: -5%;
      top: -5%;
      z-index: -1;
      background-image: v-bind(background);
      background-position: center;
      background-size: contain;
      transition: all .2s ease;
      image-rendering: pixelated;
    }
  }

  .reflection-grid-cell {
    position: absolute;
    z-index: 1;
    width: 33%;
    height: 33%;
  }

  @for $r from 1 to 4 {
    @for $c from 1 to 4 {
      .cell-#{( ($r*3) + $c - 3)} {
        top: ($r*33%)-33%;
        left: ($c*33%)-33%;
      }

      .cell-#{( ($r*3) + $c - 3)}:hover~.reflection-content {
        transform: rotateX((($r*-7)+15deg)) rotateY((-15deg+($c*7)));

        &:before {
          transform: translateX(10-(5%*$c)) translateY(10-(5%*$r));
        }
      }
    }
  }
}
</style>
