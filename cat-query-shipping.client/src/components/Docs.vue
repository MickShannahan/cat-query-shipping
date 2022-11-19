<template>
  <div class="row justify-content-end">
    <button id="tour-docs" class="
        btn btn-success
        help-button
        border border-info
        text-secondary
        col-3
        pl-3
        rounded
        shadow-sm
        docs-scroll
      " type="button" data-bs-toggle="offcanvas" data-bs-target="#docsOffCanvas" aria-controls="offcanvasBottom"
      @click="navigateTo()">
      User Manual
    </button>
    <div class="text-dark docs-offcanvas offcanvas offcanvas-bottom p-0 col-12" tabindex="-1" id="docsOffCanvas"
      aria-labelledby="offcanvasBottomLabel">
      <div class="offcanvas-header bg-info shadow-sm row justify-content-start">
        <button type="button" class="col-2 btn-close text-reset" data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
        <h5 class="col offcanvas-title ml-5" id="offcanvasBottomLabel">
          Documentation
        </h5>
      </div>
      <div class="offcanvas-body row justify-content-center pb-0 pe-5 me-1">
        <div class="col-2 tabs-col order-first h-100 sticky-top pe-0">
          <div class="sticky-top d-flex flex-column align-items-end h-100">
            <button class="btn mb-2 mt-4 docs-tab tab1" @click="navigateTo('Orientation')">
              Orientation
            </button>
            <button class="btn mb-2 mt-4 docs-tab tab2" @click="navigateTo('LostShipments')">
              Lost Shipments
            </button>
            <button class="btn mb-2 mt-2 docs-tab tab3" @click="navigateTo('QueryUrl')">
              Query the Url
            </button>
            <button class="btn mb-5 mt-4 docs-tab tab4" @click="navigateTo('MongooseTerminal')">
              Mongoose Terminal
            </button>
            <div class="flex-grow">
              <!-- TOP BUTTON / BOTTOM BUTTONS -->
            </div>
            <button class="btn mb-2 mt-3 docs-tab tab3" @click="navigateTo('Changelog')">
              Cats UPS Changelog
            </button>
            <button class="btn mb-2 mt-4 docs-tab tab2 mb-3">
              <span class="text-dark" @click="resetTour">Restart Tour</span>
            </button>
            <button class="btn mb-2 mt-4 docs-tab tab1 mb-5">
              <a class="text-dark" href="https://github.com/MickShannahan/cat-query-shipping/issues"
                target="_blank">Report an issue</a>
            </button>
          </div>
        </div>
        <div class="
            docs-page
            col-md-9
            bg-light
            border border-primary
            d-flex
            order-md-first order-last
            align-items-end
            flex-column
            shadow-sm
          ">
          <transition name="page">
            <router-view />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Offcanvas } from 'bootstrap';

export default {
  setup() {
    const router = useRouter()

    return {
      navigateTo(name) {
        if (!name) {
          name = AppState.lastDocPage
        }
        router.push({ name: name })
        AppState.lastDocPage = name
      },
      resetTour() {
        AppState.account.needsTour = false
        setTimeout(() => AppState.account.needsTour = true, 200)
        Offcanvas.getOrCreateInstance(document.getElementById('docsOffCanvas')).hide()
      }
    }
  }
};
</script>


<style lang='scss' >
@import "../assets/scss/main.scss";

.help-button {
  text-align: left;
  position: fixed;
  bottom: 5em;
  right: 2em;
  transform: translateX(75%);
  transition: all ease 0.2s;
}

.help-button:hover {
  transform: translateX(60%);
}

.docs-offcanvas {
  height: 90vh;
  background-color: lighten($info, 5);

  .offcanvas-body {
    background-image: url("../assets/img/Textures/notebook.png");
  }
}

.tabs-col {
  overflow: hidden;
}

.docs-page {
  max-width: 130ch;
  padding: 0;

  .row {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
    justify-content: center;

    [class*="col-"] {
      max-width: 90ch;
    }
  }
}

.docs-tab {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.356);
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  font-family: "Permanent Marker", cursive;
  transition: all 0.1s ease;
  cursor: pointer;
}

.docs-tab:hover {
  transform: rotateZ(0deg) translateX(2px);
}

.tab1 {
  background-color: rgba(217, 87, 221, 0.5);
  transform: rotateZ(2deg) translateX(6px);
}

.tab2 {
  background-color: rgba(197, 221, 87, 0.5);
  transform: rotateZ(-1deg) translateX(6px);
}

.tab3 {
  background-color: rgba(87, 190, 221, 0.5);
  transform: rotateZ(-2deg) translateX(6px);
}

.tab4 {
  background-color: rgba(147, 221, 87, 0.5);
  transform: rotateZ(2deg) translateX(6px);
}

.docs-scroll::-webkit-scrollbar {
  width: 1.5em;
}

.docs-scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.docs-scroll::-webkit-scrollbar-thumb {
  background-color: darken($info, 10) !important;
  outline: 1px solid darken($info, 10);
}

// Page transition
.page-enter-active,
.page-leave-active {
  transition: all 0.7s ease;
}

.page-enter-from,
.page-leave-to {
  position: absolute;
  opacity: 0;
  transform: rotate3d(1, 0.5, 1, 45deg) translateX(100%) scale(0%, 90%);
  filter: brightness(50%);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
}
</style>
