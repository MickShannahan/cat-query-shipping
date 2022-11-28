<template>

  <div class="offcanvas offcanvas-top bg-transparent" tabindex="-1" id="map-offcanvas"
    aria-labelledby="staticBackdropLabel">
    <section class="offcanvas-body bg-dark-glass border border-info">
      <div class="container-fluid">
        <section class="row text-center">

          <div class="col-md-6 border border-info p-4" :class="{ 'bg-info text-dark': route.name == 'Home' }">
            <router-link :to="{ name: 'Home' }">
              <i class="mdi mdi-home"></i>
              <div>
                Lost Shipment Recovery
              </div>
            </router-link>
          </div>
          <div class="col-md-6 border border-info p-4" :class="{ 'bg-info text-dark': route.name == 'Account' }">
            <router-link :to="{ name: 'Account' }">
              <i class="mdi mdi-clipboard-list-outline"></i>
              <div>
                Employee Break Room
              </div>
            </router-link>
          </div>
          <div class="col-md-6 border border-info p-4" :class="{ 'bg-info text-dark': route.name == 'Warehouse' }">
            <router-link :to="{ name: 'Warehouse' }">
              <i class="mdi mdi-warehouse"></i>
              <div>
                Recovered Shipment Warehouse
              </div>
            </router-link>
          </div>

        </section>
      </div>
    </section>
    <section class="offcanvas-header console-console2 outset square-top ">
      <h5 class="offcanvas-title text-center" id="staticBackdropLabel">Where to?</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </section>
  </div>

</template>


<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

</script>


<style lang="scss" scoped>
.offcanvas-body {
  min-height: 15vh;
}

.offcanvas-top {
  width: 35vw;
  min-height: 40vh;
  margin: 0 auto;
  z-index: 200000;
}
</style>
