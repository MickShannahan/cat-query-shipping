<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-glass ps-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="../assets/img/CUPS-Logo.png" height="40" />
        <h3 class="site-header ms-2">C.U.P.S</h3>
        <small class="text-dark ms-3">alpha v.0.0.early.as.heck</small>
      </div>
    </router-link>
      <ShipmentCounter/>
      <div class="d-flex justify-content-end w-100">
        <CardReader/>
      </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { logger } from "../utils/Logger"
import { accountService } from '../services/AccountService'
import { useRoute } from 'vue-router'
import { lcStorage } from '../services/Storage'
export default {
  setup() {
    const route = useRoute()
    const creditScale = ref(1)
    const decayRate = 100
    const interval = ref(null)
    const state = reactive({
      credits: computed(() => AppState.account.credits),
    })
    onMounted(() => {
      logger.log(route.name)
    })
    watch(() => state.credits, () => {
      creditScale.value += 0.012
      if (!interval.value) {
        // setTimeout(() => clearInterval(interval.value), 10000)
        interval.value = setInterval(() => {
          if (creditScale.value > 1) {
            creditScale.value -= 0.01
          } else {
            creditScale.value = 1
            clearInterval(interval.value)
            interval.value = null
          }
        }, decayRate)
      }
    })
    return {
      state,
      interval,
      creditScale,
      decayRate,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      testCredits() {
        accountService.countUpCredits(100)
      },
      async login() {
        AuthService.loginWithPopup()
        lcStorage.loadUsers()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.site-header {
  color: var(--bs-warning);
  font-weight: bold;
  text-shadow: -1px 1px 0px var(--bs-primary), -2px 2px 0px var(--bs-primary),
    -3px 3px 0px var(--bs-primary), -4px 4px 0px var(--bs-primary),
    1px -1px 0px var(--bs-danger);
}

.navbar {
  border-bottom: outset 5px #485a648f;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.credits {
  transition: all 0.2s linear;
}

.credits-effect {
  transform: scale(1.1);
}

@keyframes countUp {
  0% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
