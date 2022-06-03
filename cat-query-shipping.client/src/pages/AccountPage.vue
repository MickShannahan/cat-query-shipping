<template>
  <div class="container text-center">
    <div class="row mt-5 about justify-content-center">
      <!-- STUB Your Account -->
      <div class="col-12 col-lg-5 me-lg-5 mb-3 p-lg-0">
        <div class="row bg-warning rounded lighten-10 shadow p-3">
          <div class="col-4">
            <img
              v-if="!editMode"
              class="img-fluid border-2 border-warningS rounded-1"
              :src="account.picture"
              alt=""
            />
            <input
              v-else
              class="form-control w-100"
              type="text"
              placeholder="Enter image url.."
              v-model="editable.picture"
              required
            />
          </div>
          <div class="col-8 text-start position-relative">
            <i
              v-show="editMode"
              class="
                mdi mdi-cancel
                me-5
                icon
                selectable
                text-danger
                darken-10
                p-1
                px-2
                rounded
              "
              @click="editMode = !editMode"
              v-tooltip:auto="'cancel'"
            ></i>
            <i
              class="
                mdi mdi-pencil
                icon
                selectable
                text-warning
                darken-40
                p-1
                px-2
                rounded
              "
              @click="editAccount"
              v-tooltip:auto="'edit account'"
            ></i>
            <h5 v-if="!editMode" class="text-primary">{{ account.name }}</h5>
            <input
              v-else
              class="form-control w-75"
              type="text"
              placeholder="Enter Name.."
              v-model="editable.name"
              minlength="5"
              maxlength="15"
              required
            />
            <div>
              <i class="mdi mdi-google-podcast mx-1"></i>{{ account.credits }}
            </div>
            <div>
              <b>Recovered Shipments:</b> {{ account.shipmentsFound?.length }}
            </div>
            <h4>
              <b class="text-primary"> {{ account?.employeeGrade }}</b>
            </h4>
          </div>
        </div>
      </div>

      <!-- STUB Leaderboard -->
      <div class="col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5">
        <div class="row justif-content-center leader-border p-2 mx-3">
          <h4 class="col-12 text-center">
            <i class="mdi mdi-cat mx-1"></i>Employee of the Cycle<i
              class="mdi mdi-cat mx-1"
            ></i>
          </h4>
          <div class="col-6">
            <h5 class="text-dark">{{ leaderboard[0]?.name }}</h5>
            <div>
              <i class="mdi mdi-google-podcast mx-1"></i
              >{{ leaderboard[0]?.credits }}
            </div>
            <div>
              <b>Recovered Shipments:</b>
              {{ leaderboard[0]?.shipmentsFound?.length }}
            </div>
            <h4>
              <b class="text-primary"> {{ leaderboard[0]?.employeeGrade }}</b>
            </h4>
          </div>
          <div class="col-6 mb-5">
            <img
              class="img-fluid border border-primary rounded-1"
              :src="leaderboard[0]?.picture"
              alt=""
            />
          </div>
        </div>
        <div class="row text-primary mt-3">
          <div class="col-4">name</div>
          <div class="col-3"><i class="mdi mdi-google-podcast mx-1"></i></div>
          <div class="col-2"><i class="mdi mdi-package mx-1"></i></div>
          <div class="col-3"><i class="mdi mdi-smart-card mx-1"></i></div>
        </div>
        <!-- TODO ABSTRACT THIS -->
        <div class="row p-0">
          <div class="leaderboard h-25">
            <div class="col-12 p-0">
              <div
                v-for="player in leaderboard.slice(1)"
                :key="player.id"
                class="row mt-2 px-2"
                :class="{
                  'text-warning': player.id == account.id,
                  'text-dark': player.id != account.id,
                }"
              >
                <div class="col-4 list-border">
                  {{ player.name }}
                </div>
                <div class="col-3 list-border">
                  {{ player.credits }}
                </div>
                <div class="col-2 list-border">
                  {{ player.shipmentsFound?.length }}
                </div>
                <div class="col-3 list-border">
                  {{ player.employeeGrade }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { accountService } from "../services/AccountService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
export default {
  name: 'Account',
  setup() {
    const editMode = ref(false)
    const editable = ref({})
    const editTip = ref('edit employee record')
    watchEffect(() => {
      profilesService.getProfiles()
      editable.value = AppState.account
    })
    return {
      editMode,
      editable,
      editTip,
      account: computed(() => AppState.account),
      leaderboard: computed(() => AppState.profiles.filter(a => a.credits > 0).sort((a, b) => b.credits - a.credits)),
      async editAccount() {
        try {
          if (editMode.value) {
            await accountService.editAccount(editable.value)
            Pop.toast('Employee record updated', 'success')
            editMode.value = false
            editTip.value = 'edit employee record'
          } else {
            editMode.value = true
            editTip.value = 'save record'
          }
        } catch (error) {
          Pop.toast(error?.error)
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.position-relative {
  position: relative;
}

.icon {
  position: absolute;
  right: 0px;
}

.leaderboard {
  min-height: 60vh;
  padding-bottom: 1em;
}

.leader-border {
  border-radius: 6px;
  border: 2px dashed var(--bs-primary);
}

.list-border {
  border-bottom: 2px dashed var(--bs-primary);
}
</style>
