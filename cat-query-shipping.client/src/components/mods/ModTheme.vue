<template>
  <div></div>
</template>


<script setup>
import { computed, watchEffect } from 'vue';
import { AppState } from '../../AppState.js';
watchEffect(() => {
  const mods = AppState.account.installedMods
  let mod = mods?.find(m => m.action == 'client_theme')
  if (mod) {
    document.body.classList = `theme--${mod.data.theme}`
  } else {
    document.body.classList = `theme--union`
  }
})
</script>


<style lang="scss">

</style>
