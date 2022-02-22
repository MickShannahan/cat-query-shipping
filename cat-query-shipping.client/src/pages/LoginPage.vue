<template>
  <div class="row bg-pink-800 p-4">
    <div class="col-12 text-indigo-600">this is the login page</div>
    <div class="col-6 btn btn-teal-500">button</div>
    <div class="col-3" v-for="u in users" :key="u.id">
      <EmployeeBadge :user="u" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from "@vue/runtime-core"
import { lcStorage } from "../services/Storage"
import { AppState } from "../AppState"
export default {
  setup() {
    onBeforeMount(() => {
      lcStorage.loadUsers()
    })
    return {
      users: computed(() => AppState.users)
    }
  }
}
</script>

<style>
</style>
