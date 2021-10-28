<template>
  <div
    class="
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
    "
  >
    <div class="container-fluid">
      <LostShipment />
      <Search />
      <CodeSearch />
      <ShipmentsThread />
      <Docs />
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 's') {
          e.preventDefault()
          Pop.toast('Saving Union documents is stricly prohibited', 'warning', 'bottom')
        }
      })
    })
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
