<template>
<div class="d-flex ms-5 count-container">
        <div class="shipment-counter text-warning bg-info rounded shadow p-1">
          <div class="text-primary px-2">shipments left</div>
          <div class="screen px-2" :class="{'bg-black text-warning': !flash, 'bg-warning text-dark': flash}">
            {{remaining || '00000'}}
          </div>
      </div>
        <div v-show="recentUser.name" class="found-card p-1 text-primary">{{recentUser.name}} found a shipment</div>
    </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { shipmentService } from "../services/ShipmentService"
import { socketService } from "../services/SocketService"
import { logger } from "../utils/Logger"
export default {
  setup(){
    let printing = false;
    let interval = null;
    let remaining = ref(0)
    let flash = ref(false)
    const recentUser = ref({})
    const currentUser = ref({})
    function flashNumber(){
      flash.value = true
      setTimeout(()=> flash.value = false, 700)
    }
    watchEffect(()=> {
      if(AppState.recentFoundUsers.length > 0  && !printing){
        printing = true
        interval = setInterval(()=> {
          // none left
          if(AppState.recentFoundUsers.length == 0){
            logger.log('out of users')
            printing = false
            clearInterval(interval)
            recentUser.value = {}
          } else {
            // counting down
          remaining.value--
          flashNumber()
          let user = AppState.recentFoundUsers.shift()
          logger.log('print next user', user)
          recentUser.value = user
          }
        }, 6000)
      }
    })
    onMounted( async ()=>{
      await shipmentService.getCount()
      socketService.joinRoom()
      remaining.value = AppState.shipmentsRemaining
    })
    return{
      printing,
      interval,
      recentUser,
      currentUser,
      remaining,
      flash,
      flashNumber,
      recentUsers: computed(()=> AppState.recentFoundUser[0])
    }
  }

}
</script>

<style lang="scss" scoped>
.count-container{
  top: -1.5em;
  position: relative;
  flex-direction: row;
}

.shipment-counter{
position: absolute;
.screen{
border-bottom-color: #c4e9ba ;
border-right-color: #c4e9ba;
border-left-color: #7ab6a2 ;
border-top-color: #7ab6a2 ;
}
div{
  width: 8em;
  position: relative;
}
background: var(--bs-info);
}

.found-card{
  background: var(--bs-light);
  border-right: 3px dotted #696a6a;
  border-radius: 2px;
  z-index: -1;
  font-size: 15px;
  position: relative;
  top: 15px;
  min-width: 8em;
  left: 136px;
  animation: 5s ease print-card 0s 1 normal;
  opacity: 0;
}
@keyframes print-card{
  0%{transform:translateX(-100%) scaleX(0); opacity: 1;}
  10%{transform:translateX(-50%) scaleX(.5);}
  20%{transform:translateX(0%) scaleX(1);}
  40%{ transform: translateX(10%);}
  95%{opacity: 1;  transform: translateX(10%) translateY(0px) rotate(0deg); }
  100%{transform: translateY(-30px) translateX(12%) rotate(5deg); opacity: 0;}
}

</style>
