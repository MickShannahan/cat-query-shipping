<template>
<button class="btn btn-primary" @click="addToList">add</button>
<div class="bg-light">{{list}}</div>
<div class="row">
  <Animate v-for="num in list" :key="num" class="anime bg-dark p-5 rounded shadow"/>
</div>
</template>

<script>
import { onMounted, ref, watchEffect } from "@vue/runtime-core"
import anime from "animejs"
export default {
setup(){
  const list = ref([])
  return {
    list,
    addToList(){
      list.value.push(list.value.length + 1)
    }
  }
}
}
</script>

<style lang="scss" scoped>
.anime{
  height: 50px;
  width: 50px
}
</style>
