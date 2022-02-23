<template>
  <div class="row justify-content-end">
    <button
      id="tour-docs"
      class="
        btn btn-success
        help-button
        border border-info
        text-secondary
        col-3
        pl-3
        rounded
        shadow-sm
      "
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#docsOffCanvas"
      aria-controls="offcanvasBottom"
      @click="navigateTo()"
    >
      User Manual
    </button>
    <div
      class="
        text-dark
        docs-offcanvas
        offcanvas offcanvas-bottom
        bg-info
        lighten-10
        p-0
        col-12
      "
      tabindex="-1"
      id="docsOffCanvas"
      aria-labelledby="offcanvasBottomLabel"
    >
      <div class="offcanvas-header bg-info shadow-sm row justify-content-start">
        <button
          type="button"
          class="col-2 btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <h5 class="col offcanvas-title ml-5" id="offcanvasBottomLabel">
          Documentation
        </h5>
      </div>
      <div class="offcanvas-body row pb-0">
        <div class="col-2 tabs-col order-first d-flex flex-column pe-0">
          <button
            class="btn mb-2 mt-4 docs-tab tab1"
            @click="navigateTo('Orientation')"
          >
            Orientation
          </button>
          <button
            class="btn mb-2 mt-4 docs-tab tab2"
            @click="navigateTo('LostShipments')"
          >
            Lost Shipments
          </button>
          <button
            class="btn mb-2 mt-2 docs-tab tab3"
            @click="navigateTo('QueryUrl')"
          >
            Query the Url
          </button>
          <button
            class="btn mb-2 mt-4 docs-tab tab4"
            @click="navigateTo('MongooseTerminal')"
          >
            Mongoose Terminal
          </button>
             <button class="btn mb-2 mt-4 docs-tab tab2 mt-auto mb-5">
            <span
              class="text-dark"
              @click="resetTour"
              >Restart Tour</span
            >
          </button>
          <button class="btn mb-2 mt-4 docs-tab tab1 mt-auto mb-5">
            <a
              class="text-dark"
              href="https://github.com/MickShannahan/cat-query-shipping/issues"
              target="_blank"
              >Report an issue</a
            >
          </button>
        </div>
        <div
          class="
            docs-scroll
            col-md-9
            bg-light
            border border-primary
            col-md-3
            d-flex
            order-md-first order-last
            justify-content-between
            flex-column
            shadow-sm
          "
        >
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
      resetTour(){
        AppState.account.needsTour = true
      }
    }
  }
};
</script>


<style lang='scss' >
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
}

.tabs-col {
  overflow: hidden;
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
  width: 1em;
}

.docs-scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.docs-scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
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
