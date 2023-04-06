<template>

  <div class="offcanvas offcanvas-top bg-transparent" tabindex="-1" id="map-offcanvas"
    aria-labelledby="staticBackdropLabel">
    <section class="offcanvas-body bg-dark-glass border border-info screen">
      <div class="container-fluid">
        <section class="row text-center text-light text-shadow justify-content-around align-items-center">

          <router-link :to="{ name: 'Home' }" class="col-md-5 border border-info bg-dark-glass btn-theme-primary p-4"
            :class="{ 'bg-info text-dark': route.name == 'Home' }">
            <div>
              <i class="mdi mdi-desktop-classic"></i>
              <div>
                Lost Shipment Recovery
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Account' }" class="col-md-5 border border-info bg-dark-glass btn-theme-primary p-4"
            :class="{ 'bg-info text-dark': route.name == 'Account' }">
            <div>
              <i class="mdi mdi-clipboard-list-outline"></i>
              <div>
                Employee Break Room
              </div>
            </div>
          </router-link>
          <router-link :to="{ name: 'Warehouse' }"
            class="col-md-5 mt-3 border border-info bg-dark-glass btn-theme-primary p-4"
            :class="{ 'bg-info text-dark': route.name == 'Warehouse' }">
            <div>
              <i class="mdi mdi-warehouse"></i>
              <div>
                Recovered Shipment Warehouse
              </div>
            </div>
          </router-link>

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
  background-image: url(/assets/img/bg/Map.gif);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.offcanvas-top {
  width: 35vw;
  min-height: 40vh;
  margin: 0 auto;
  z-index: 200000;
}
</style>
