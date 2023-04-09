<template>
  <section class="position-relative">

    <div class="toast-container position-absolute top-0 end-0 pt-5 mt-4">

      <!--  -->
      <div v-for="note in notifications" class="toast show bg-transparent" role="alert" aria-live="assertive"
        aria-atomic="true">
        <div class="toast-header bg-info lighten-10 border-bottom border-info">
          <img v-if="note.img" :src="note.img" class="note-img me-1" alt="">
          <strong class="me-auto text-info darken-40">{{ note.title }}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="bg-dark-glass p-3 rounded-bottom text-info border-dark-glass" v-html="note.body">
        </div>
      </div>
      <!--  -->

    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  setup() {
    return {
      notifications: computed(() => AppState.notifications)
    }
  }
};
</script>


<style lang="scss" scoped>
.note-img {
  height: 25px;
  width: 25px;
}

.toast-container {
  max-width: max(15vw, 22ch);
  overflow-x: hidden;
  padding-inline: .5em;
}

.toast {
  transform: translateX(200px);
}

.show {
  animation: slide-in .2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes slide-in {
  0% {
    transform: translateX(200px);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>
