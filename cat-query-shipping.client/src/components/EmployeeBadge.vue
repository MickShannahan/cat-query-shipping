<template>
  <div class="row" draggable="false">
      <div class="col-12 wrapper" v-pickup="handlePickup" >
        <img class="empCard" src="../assets/img/employeeBadge.png" alt="empBadge" draggable="false">
        <div class="picture"></div>
        <div class="name">{{user.name}}</div>
        <div class="grade text-center">{{user.grade}}</div>
        <div class="subTitle text-center">C.U.P.S  Lost Shipment
          Recovery Team</div>
      </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { User } from "../models/User"
import { logger } from "../utils/Logger"
export default {
  props: {user: {type: User, required: true}},
  setup(props){
    return{
      empPicture: computed(()=> `url(${props.user.picture})`),
      handlePickup(ev){

      }
    }
  }

}
</script>

<style lang="scss">

.wrapper{
  width: 250px;
  div{
    user-select: none;
    position: absolute;
  }
}
.empCard{
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 3px rgba(14, 27, 31, 0.336));
  width: 250px;
}

.picture{
  image-rendering: pixelated;
  background-image: v-bind(empPicture);
  background-position: center;
  background-size: cover;
  overflow: hidden;
  width: 173px;
  height: 145px;
  top: 66px;
  left: 54px;

}

.name{
color: var(--bs-light);
bottom: 20px;
left: 32px;
font-weight: 200;
}

.grade{
  color: var(--bs-primary);
  bottom: 100px;
  width:100%;
  font-size: 32px;
  font-weight: bold;
}

.subTitle{
  color: var(--bs-primary);
  bottom: 60px;
  width:100%;
  font-size: 18px;
  line-height: 1.1;
}



</style>
