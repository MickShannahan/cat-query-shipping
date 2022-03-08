<template>
  <div :id="'animate' + id" class="anime">Hi</div>
</template>

<script>
import { onMounted } from "@vue/runtime-core"
import anime from "animejs"
export default {
  props: ['id'],
  setup(props) {
    onMounted(() => {
      anime(
        {
          targets: '#animate' + props.id,
          translateY: [{
            value: '-200px',
            duration: 0,
            easing: 'easeOutExpo'
          },
          {
            value: '0px',
            duration: 350,
            easing: 'easeOutExpo'
          }
          ],
          opacity: [{
            value: 0,
            duration: 0
          },
          {
            value: 1,
            duration: 350
          }],
          width: {
            value: '-20px',
            duration: 500,
            easing: 'easeInOutSine'
          },
          direction: 'forwards'
        }
      );
    })
  }
}
</script>

<style>
.anime {
  transform: translateX(-250px);
}
</style>
