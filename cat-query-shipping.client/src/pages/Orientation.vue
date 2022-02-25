<template>
  <div class="getting-started row p-3 pb-1">
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <h2 class="mt-5 text-primary">Welcome to the C.U.P.S!</h2>
          <div class="mt-1 text-grey">(cats universal postal service.)</div>
          <img
            class="letter-head"
            src="../assets/img/CUPS-Logo.png"
            alt=""
            srcset=""
          />
          <hr class="w-75 mx-auto mt-2 border-bottom border-danger" />
        </div>
        <div class="col-11 mt-2 p-2">
          <p>Greetings [employee-name-here]!</p>
          <p>
            Welcome, we are very excited you have joined us in the exciting
            field of universal package delivery. We at Cats Universal Postal
            Service are committed to excellence when it comes to getting
            shipments delivered to every corner of the universe. We aim to
            increase value added to our customers with a win-win delivery
            system. We bring felines together with the unionization of postal
            delivery, identifying new ways to bring a synergistic approach to
            the ever changing field of delivering boxes.
          </p>
          <p>
            Our mission at CUPS is delivering shipments with refinement, grace,
            and elegance. We seek to dynamically introduce shipping solutions
            that fall in line with all universal regulations, unlike our
            competitor the Delivery Of Goods Service.
          </p>
          <p>
            We hope you enjoy your time here at Cats U.P.S., where you will be
            sure to grow into a productive worker over the course of many of
            your lives.
          </p>
          <h1 class="font-cursive mt-5">Professor Tofu Alexander Hobbes</h1>
          <p>-Postmaster General</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {

  setup() {
    const state = reactive({

    })
    return { state }
  }
};
</script>


<style scoped>
b {
  font-size: 1.1em;
}
.row {
  position: relative;
}

.getting-started {
  min-height: 100%;
  background: linear-gradient(
      0deg,
      rgba(230, 230, 230, 0.95) 0%,
      rgba(240, 240, 240, 0.95) 100%
    ),
    url("../assets/img/CUPS-Logo.png");
  background-position: center;
  background-size: 100%, 50%;
  background-repeat: no-repeat;
}

.letter-head {
  position: absolute;
  right: 3em;
  top: 1.5em;
  max-height: 8em;
  aspect-ratio: 1;
  filter: contrast(60%);
}
</style>
