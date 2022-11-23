<template>
  <div></div>
</template>


<script setup>
import { computed } from 'vue';
import { AppState } from '../../AppState.js';

const themeBase = computed(() => AppState.account.installedMods?.find(m => m.action = 'client_theme'))
const primary = computed(() => themeBase.value?.primary || '#A4D5A5')
const secondary = computed(() => themeBase.value?.secondary || '#57a4a9')
const warning = computed(() => themeBase.value?.warning || '#fff')
const danger = computed(() => themeBase.value?.danger || '#fff')
const success = computed(() => themeBase.value?.success || '#fff')
const screenColor = computed(() => themeBase.value?.screenColor || '#fff')
const consoleColor = computed(() => themeBase.value?.consoleColor || '#fff')
</script>


<style lang="scss">
.border-theme {
  border-color: #A4D5A5 !important;
}

.text-theme {
  color: v-bind(primary) !important;
}
</style>
