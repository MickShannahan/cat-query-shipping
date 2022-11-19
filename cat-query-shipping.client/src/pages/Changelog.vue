<template>
  <div class="container-fluid pt-3">
    <div class="row p-2 border border-bottom my-1 justify-content-end" v-for="l in logs" :key="l">
      <div class=" d-flex justify-content-between">
        <h4 class="text-start bg-primary text-light rounded-pill px-3">{{ l.title }}</h4>
        <div class="text-info darken-20">{{ l.date.toLocaleString() }}</div>
      </div>
      <p class="text-primary p-3 ps-5" v-html="parseMarkdown(l.body)"></p>
      <a class="col-1 text-danger text-end" target="_blank" :href="l.link"><i class="mdi mdi-github"></i></a>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { gameService } from '../services/GameService.js'
import { marked } from 'marked'
export default {
  setup() {
    onMounted(() => {
      getChangelog()
    })
    async function getChangelog() {
      await gameService.getChangelog()
    }
    return {
      logs: computed(() => AppState.changelogs.filter(l => l.body)),
      parseMarkdown(raw) {
        if (raw)
          return marked.parse(raw)
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
