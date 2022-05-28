<template>
  <div v-if="draggable" class="row" draggable="false">
      <div class="col-12 wrapper" v-pickup="handlePickup" >
        <img class="empCard" src="../assets/img/employeeBadge.png" alt="empBadge" draggable="false">
        <div class="picture"></div>
        <div class="name">{{user.name}}</div>
        <div class="grade text-center">{{user.employeeGrade}}</div>
        <div class="subTitle text-center">C.U.P.S  Lost Shipment
          Recovery Team</div>
      </div>
  </div>
  <div v-else class="row static" draggable="false">
    <div class="col-12 wrapper" >
      <img class="empCard" src="../assets/img/employeeBadge.png" alt="empBadge" draggable="false">
      <div class="picture"></div>
      <div class="name">{{user.name}}</div>
      <div class="grade text-center">{{user.employeeGrade}}</div>
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
  props: {user: {type: User, required: true}, draggable: {type: Boolean, default: true}},
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
.static{
  padding: 0;
  .wrapper{
    position: absolute
  }
}
.empCard{
  image-rendering: pixelated;
  filter: drop-shadow(2px 2px 3px rgba(14, 27, 31, 0.336));
  width: 220px;
}

.picture{
  image-rendering: pixelated;
  background-image: v-bind(empPicture);
  background-position: center;
  background-size: cover;
  overflow: hidden;
  width: 151px;
  height: 128px;
  top: 58px;
  left: 50px;

}

.name{
color: var(--bs-light);
width: 100%;
text-align: center;
bottom: 15px;
font-weight: 200;
}

.grade{
  color: var(--bs-primary);
  bottom: 100px;
  width:100%;
  font-size: 24px;
  font-weight: bold;
}

.subTitle{
  color: var(--bs-primary);
  bottom: 60px;
  width: 100%;
  padding: 0 2.2em;
  font-size: 14px;
  line-height: 1.1;
}



</style>
