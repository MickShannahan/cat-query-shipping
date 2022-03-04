<template>
  <div class="anime">Hi</div>
</template>

<script>
import { onMounted } from "@vue/runtime-core"
import anime from "animejs"
export default {
setup(){
    onMounted(()=>{
      anime(
        {
  targets: '.anime',
  translateX: {
    value: '*=2.5', // 100px * 2.5 = '250px'
    duration: 1000
  },
  width: {
    value: '-=20px', // 28 - 20 = '8px'
    duration: 1800,
    easing: 'easeInOutSine'
  },
  rotate: {
    value: '+=2turn', // 0 + 2 = '2turn'
    duration: 1800,
    easing: 'easeInOutSine'
  },
  direction: 'alternate'
         }
      );
  })
}
}
</script>

<style>
.anime{
  transform: translateX(-250px);
}
</style>
