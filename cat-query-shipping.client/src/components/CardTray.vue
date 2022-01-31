<template>
<div class="offcanvas offcanvas-bottom card-tray" tabindex="-1" id="cardTray" aria-labelledby="cardTrayLabel" data-bs-backdrop="false">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title text-light" id="cardTrayLabel">Saved Cards</h5>
    <button type="button" class="btn-close text-reset text-light" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body small container-fluid">
    <div class="row h-100">
      <div class="col-4 border border-light rounded h-100" v-drop="closeTray">
        drop zone
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Offcanvas } from "bootstrap"
import { shipmentService } from "../services/ShipmentService"
export default {
setup(){
  return{
    closeTray(){
      Offcanvas.getOrCreateInstance(document.getElementById('cardTray')).hide()
      shipmentService.getLostShipment()
    }
  }
}
}
</script>

<style lang="scss">
.card-tray{
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(20px);
}
</style>

