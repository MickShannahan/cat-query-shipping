<template>
  <div class="getting-started bg-light row p-3 pb-1">
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-12 text-center">
          <h2 class="mt-1 text-primary">Welcome to the C.U.P.S!</h2>
          <div class="mt-1 text-grey">(cats universal postal service.)</div>
          <img
            class="letter-head"
            src="../assets/img/CUPS-Logo.png"
            alt=""
            srcset=""
          />
          <hr class="w-50 mx-auto mt-2 border-bottom border-danger" />
        </div>
        <div class="col-8 mt-2 p-2">
          <p>
            <b>What is Expected of you</b>
            Always ensure to lay down in such a manner that tail can lightly
            brush human's nose with tail in the air or murf pratt ungow ungow.
            Shake treat bag meow meow, i tell my human run in circles, and floof
            tum, tickle bum, jellybean footies curly toes so sugar, my siamese,
            stalks me (in a good way), day and night . Ask to be pet then attack
            owners hand sleep and wake up human for food at 4am at four in the
            morning wake up owner meeeeeeooww scratch at legs and beg for food
            then cry and yowl until they wake up at two pm jump on window and
            sleep while observing the bootyful cat next door that u really like
            but who already has a boyfriend end up making babies with her and
            let her move in i love cuddles. Fish i must find my red catnip fishy
            fish attack feet. Sit on human they not getting up ever love you,
            then bite you or make meme, make cute face fall asleep on the
            washing machine time to go zooooom for that box? i can fit in that
            box. Sniff all the things chase ball of string leave hair on owner's
            clothes. If it fits, i sits sit on the laptop for spit up on light
            gray carpet instead of adjacent linoleum. Scratch at the door then
            walk away all of a sudden cat goes crazy cats are a queer kind of
            folk but ask to be pet then attack owners hand. Try to hold own back
            foot to clean it but foot reflexively kicks you in face, go into a
            rage and bite own foot, hard my left donut is missing, as is my
            right stare at the wall.
          </p>
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
  background-size: 50%;
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
