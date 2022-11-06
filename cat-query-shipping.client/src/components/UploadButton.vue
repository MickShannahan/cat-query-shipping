<template>
  <div class="load-wrapper">
    <input type="file" :required="options.require" :class="options.class" :placeholder="options.placeholder"
      @change="fileUpload">
    <div v-if="uploading" class="loading">{{ options.spinner }}</div>
    <input v-show="false" type="checkbox" :required="!complete">
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { accountService } from '../services/AccountService.js';
export default {
  props: {
    options: {
      type: Object, required: false, default: {
        require: true,
        multiple: false,
        class: 'form-control btn btn-primary',
        placeholder: 'pick a file',
        spinner: '🧇'
      }
    }
  },
  setup(props, { emit }) {
    const uploading = ref(false)
    const complete = ref(false)
    return {
      uploading,
      complete,
      async fileUpload(e) {
        try {
          uploading.value = true
          if (e.target.files.length) {
            let file = e.target.files[0]
            logger.log('file', file)
            const url = await accountService.uploadPicture(file)
            complete.value = true
            emit('uploadComplete', { url })
          }
        } catch (e) {
          Pop.toast(e.message, 'error')
          logger.error(e)
        } finally {
          uploading.value = false
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.load-wrapper {
  position: relative;
}

.loading {
  width: 2em;
  height: 2em;
  text-align: center;
  transform-origin: center;
  animation: loading 5s linear infinite;
  position: absolute;
  top: 0;
  right: 0;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(3600deg);
  }
}
</style>
