<template>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" :id="id" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
    aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg " role="document">
      <div class="modal-content bg-transparent shadow-lg">
        <div class="modal-header console-console2 plastic outset square-bottom">
          <slot name="header"></slot>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body bg-dark-glass">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer console-console outset plastic square-top">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>



</template>


<script setup>
const props = defineProps({ id: String })
</script>


<style lang="scss" scoped>

</style>
