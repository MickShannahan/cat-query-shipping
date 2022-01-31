<template>
  <div :id="'dataChip'+data.id" class="data-card text-dark lighten-20 " draggable="true"  v-pickup:anchor="something" :data-pickup="JSON.stringify(data)">
    <div class="label">{{data.id}}</div>
    <img :src="cards[Math.round(data.difficultyRating/2)-1]" alt="" draggable="false">
  </div>
</template>

<script>
import card1 from '../assets/img/DataCard1.png'
import card2 from '../assets/img/DataCard2.png'
import card3 from '../assets/img/DataCard3.png'
import card4 from '../assets/img/DataCard4.png'
import card5 from '../assets/img/DataCard5.png'
import card6 from '../assets/img/DataCard6.png'
import card7 from '../assets/img/DataCard7.png'
import card8 from '../assets/img/DataCard8.png'
import card9 from '../assets/img/DataCard9.png'
import card10 from '../assets/img/DataCard10.png'

import { Offcanvas } from "bootstrap"
import { logger } from "../utils/Logger"
import { computed, onBeforeMount, onMounted, watchEffect } from "@vue/runtime-core"
import { AppState } from "../AppState"
export default {
  props: {data:{type: Object, default: {id: 'REDACTED'}}},
  setup(props){
    watchEffect(()=>{
      let dataChip = document.getElementById('dataChip'+ props.data.id)
      if(dataChip){
        dataChip.style.top = '30px'
      }
    })
    return{
      something(){
        logger.log('moving data card')
        Offcanvas.getOrCreateInstance(document.getElementById('cardTray')).show()
      },
      cards : [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10],
      cardTray: computed(()=> AppState.cardTray)
    }
  }
}
</script>

<style lang="scss">
.data-card{
  left: 3.5vw;
  height: 175px;
  width: 175px;
  transform: rotateZ(90deg);
  user-select: none;
  img{
    image-rendering: pixelated;
    height: 100%;
  }
  .label{
    position: absolute;
    top: 122px;
    width: 100%;
    text-align: center;
    padding-left: 1.9em;
    padding-right: 1.9em;
    font-size: 12px;
    font-weight: bold;
    word-wrap: break-word;
  }
}

</style>
