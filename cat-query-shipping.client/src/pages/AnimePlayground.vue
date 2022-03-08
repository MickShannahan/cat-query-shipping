<template>
  <button class="btn btn-primary" @click="addToList">add</button>
  <div class="bg-light">{{ list }}</div>
  <div class="row flex-column">
    <Animate
      v-for="num in list"
      :key="num"
      class="anime bg-dark p-5 rounded shadow"
      :id="num"
    />
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "@vue/runtime-core"
import anime from "animejs"
export default {
  setup() {
    const list = ref([])
    return {
      list,
      addToList() {
        list.value.unshift(list.value.length + 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.anime {
  height: 50px;
  width: 50px;
}
</style>
