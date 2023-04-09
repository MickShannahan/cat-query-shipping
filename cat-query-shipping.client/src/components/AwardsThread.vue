<template>
  <section class="row bg-info lighten-10 rounded mt-1">
    <h4 data-bs-toggle="collapse" data-bs-target="#awards">Awards <i
        class=" fs-4 mdi mdi-information text-info darken-30 pt-2"
        v-tooltip:auto="`Awards can be earned for various tasks. Some even come with bonus rewards as incentives. You will only see ones that you have progress towards here but there are a lot more to unlock!`"></i>
    </h4>
    <div id="awards" class="col-12 py-3 award mb-2 px-3 text-start" v-for="award in awards">
      <div class="d-flex">
        <div v-if="award.count" class="d-flex ps-2">
          <div v-for="num in award.count" class="award-sprite">
            <img :src="award.img" alt="">
          </div>
        </div>
        <span v-else class="fw-bold">[ ]</span>
        <div class="text-start fw-bold ms-4"> {{ award.name
        }}
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <small class="ps-3">{{ award.description }}</small>
        <small v-if="award.itemAward" v-tooltip:right="`reward: ${award.itemAward.name}`">📦</small>
        <small v-if="award.creditsAward" v-tooltip:right="award.creditsAward"><i
            class="mdi mdi-google-podcast"></i></small>
      </div>
      <div class="progress bg-info " v-if="award.progress">
        <div class="progress-bar bg-info darken-10" role="progressbar"
          :style="`width: ${progressBar(award.progress, award.limit)}%;`" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100">{{ award.progress }} / {{ award.limit }}</div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    return {
      awards: computed(() => AppState.awards.sort((a, b) => {
        if (a.count == 0) return -1
        return a.progress - b.progress
      })),
      progressBar(progress, limit) {
        if (progress % limit == 0) return 100
        if (progress > limit) return ((progress % limit) / limit) * 100
        return (progress / limit) * 100
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.award {
  border-bottom: 2px dashed var(--bs-info);
}

.award-sprite {
  height: 25px;
  width: 8px;

  filter: drop-shadow(0px 2px 1px rgba(0, 0, 0, 0.438));

  img {
    width: 25px;
    height: 25px;
    display: inline-block;
  }
}
</style>
