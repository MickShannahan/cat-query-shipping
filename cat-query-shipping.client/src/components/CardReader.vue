<template>
  <div class="reader bg-danger plastic-shell shadow">
    <div v-if="loggedIn" class="row reader-buttons">
      <div class="screen-theme p-1">
        <button class="btn btn-outline-info rounded-0" @click="goTo('Account')">
          employee record
        </button>
        <!-- <button class="btn btn-outline-info rounded-0">two</button> -->
      </div>
    </div>
    <div class="employee-card-container">
      <div v-if="user && loggedIn" class="employee-card">
        <EmployeeBadge :user="account" :draggable="false" />
      </div>
      <div class="
          card-slot
          text-end
          p-3
          d-flex
          w-100
          justify-content-between
          flex-wrap
        ">
        <div class="col-5">
          <p class="screen-theme text-warning px-1 pt-1 w-100 m-0">
            {{ account.credits || "0000" }}
          </p>
          <small class="text-danger darken-20">
            credits <i class="mdi mdi-google-podcast"></i></small>
        </div>
        <div class="col-7">
          <button v-if="loggedIn" class="comp-button comp-yellow px-2 py-1" :disabled="!loggedIn" @click="logout">
            clock out <i class="mdi mdi-logout"></i>
          </button>
          <button v-else class="comp-button comp-yellow px-2 py-1" @click="login">
            clock in <i class="mdi mdi-login"></i>
          </button>
        </div>
      </div>
    </div>
    <div v-if="!loggedIn" class="login-text text-danger darken-40">
      clock in <i class="mdi mdi-arrow-up"></i>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { lcStorage } from "../services/Storage"
import { onBeforeMount } from "@vue/runtime-core"
import { AuthService } from "../services/AuthService"
import { useRouter } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    onBeforeMount(() => {
      lcStorage.loadUsers()
    })
    return {
      account: computed(() => AppState.account),
      loggedIn: computed(() => AppState.user.isAuthenticated),
      user: computed(() => AppState.users[0]),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      goTo(page) {
        router.push({ name: page })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
$reader-trans: 0.2s;

.reader {
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 8rem;
  position: absolute;
  top: -75px;
  right: 0;
  @include console-border($danger, -1);
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transition: all $reader-trans ease;

  &:hover {
    transform: translateY(75px);
  }

  &-buttons {
    background: darken($danger, 2);
    @include console-border($danger, -1);
    padding: 1em;
    position: absolute;
    z-index: -2;
    transition: all 0.3s ease;
    transform: scale(0.25) rotate(90deg) translateX(0%);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  &:hover &-buttons {
    transform: scale(1) rotate(0deg) translateX(-96%);
  }

  .employee-card-container {
    position: relative;
  }

  .employee-card {
    margin-left: 5px;
    transform: translateY(-200px);
    transition: all 0.3s ease;
  }

  &:hover .employee-card {
    transform: translateY(60px);
  }

  .screen {
    @include console-border($danger, -1, true, 2px);
  }

  .comp-button::before {
    outline: 3px inset saturate(darken(adjust-hue($danger, -15), 4), 10);
  }
}

.card-slot {
  position: absolute;
  top: 0;
  height: 8rem;
  width: 100%;
  background: url(/src/assets/img/ReaderBlank.png);
  background-size: 100% 100%;
  background-position-y: -10px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.mdi-eject {
  height: unset !important;
}

.comp-button {
  font-size: 13px;
}

.login-text {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
}
</style>
