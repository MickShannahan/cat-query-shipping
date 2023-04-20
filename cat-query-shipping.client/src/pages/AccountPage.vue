<template>
  <div class="container text-center">
    <div class="row mt-5 about justify-content-center">
      <!-- STUB Your Account -->
      <div class="col-12 col-lg-5 me-lg-5 mb-3 p-lg-0">
        <div class="row bg-warning rounded lighten-10 shadow p-3">
          <div class="col-4">
            <div v-if="!editMode" class="position-relative">
              <img class="img-fluid border-2 border-warningS rounded-1" :src="account.picture" alt="" />
              <img class="account-collectable" :src="account?.favoriteCollectable?.img" alt="">
            </div>
            <UploadButton v-else @uploadComplete="u => editable.picture = u.url" :options="{
              class: 'w-100 btn btn-white form-control px-3 py-5', spinner: '🐱'
            }" />
          </div>
          <div class=" col-8 text-start position-relative">
            <i v-show="editMode"
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
              @click="editMode = !editMode" v-tooltip:auto="'cancel'"></i>
            <i class="
                                                                                                                                                                                                                                                          mdi mdi-pencil
                                                                                                                                                                                                                                                          icon
                                                                                                                                                                                                                                                          selectable
                                                                                                                                                                                                                                                          text-warning
                                                                                                                                                                                                                                                          darken-40
                                                                                                                                                                                                                                                          p-1
                                                                                                                                                                                                                                                          px-2
                                                                                                                                                                                                                                                          rounded
                                                                                                                                                                                                                                                          "
              @click="editAccount" v-tooltip:auto="'edit account'"></i>
            <h5 v-if="!editMode" class="text-primary">{{ account.name }}</h5>
            <input v-else class="form-control w-75" type="text" placeholder="Enter Name.." v-model="editable.name"
              minlength="5" maxlength="15" required />
            <div>
              <i class="mdi mdi-google-podcast mx-1"></i>{{ account.credits }}
            </div>
            <div>
              <b>Recovered Shipments:</b> {{ account.shipmentsFound?.length }}
            </div>
            <h4>
              <b class="text-primary"> {{ account?.employeeGrade }}</b>
            </h4>
            <div v-if="editMode && collectables.length">
              <small>favorite collectable: {{ selectedCollectable.name }}<img class="item-thumbnail"
                  :src="selectedCollectable.img" alt=""></small>
              <input @input="swapCollectable" type="range" class="w-100" :min="0" :max="collectables.length - 1">
            </div>
          </div>
        </div>

        <AwardsThread />
      </div>

      <!-- STUB Leaderboard -->
      <div class="col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5">
        <section class="row justif-content-center leader-border p-2 mx-3">
          <h4 class="col-12 text-center">
            <i class="mdi mdi-cat mx-1"></i>Employee of the Cycle<i class="mdi mdi-cat mx-1"></i>
          </h4>
          <div class="col-6">
            <h5 class="text-dark">{{ leaderboard[0]?.name }}</h5>
            <div>
              <i class="mdi mdi-google-podcast mx-1"></i>{{ leaderboard[0]?.credits }}
            </div>
            <div>
              <b>Recovered Shipments:</b>
              {{ leaderboard[0]?.shipmentsFound?.length }}
            </div>
            <h4>
              <b class="text-primary"> {{ leaderboard[0]?.topGrade || leaderboard[0]?.employeeGrade }}</b>
            </h4>
            <div class="d-flex flex-wrap">
              <div v-for="a in leaderAwards" class="award-icon m-1"
                v-tooltip:bottom="`${a.name} ${a.count > 1 ? a.count : ''}`">
                <img :src="a.img" alt="">
              </div>
            </div>
          </div>
          <div class="col-6 mb-5">
            <div class="position-relative">
              <img class="img-fluid border border-primary rounded-1" :src="leaderboard[0]?.picture" alt="" />
              <img v-if="leaderboard[0]?.favoriteCollectable" class="leader-collectable"
                :src="leaderboard[0]?.favoriteCollectable?.img" alt="">
            </div>
          </div>
        </section>
        <section class="row text-primary mt-3">
          <div class="col-4">name</div>
          <div class="col-3"><i class="mdi mdi-google-podcast mx-1"></i></div>
          <div class="col-2"><i class="mdi mdi-package mx-1"></i></div>
          <div class="col-3"><i class="mdi mdi-smart-card mx-1"></i></div>
        </section>
        <!-- TODO ABSTRACT THIS -->
        <section class="row p-0">
          <div class="leaderboard h-25">
            <div class="col-12 p-0">
              <div v-for="player in leaderboard.slice(1)" :key="player.id" class="row mt-2 px-2" :class="{
                'text-warning': player.id == account.id,
                'text-dark': player.id != account.id,
              }">
                <div class="col-4 list-border">
                  {{ player.name }}
                </div>
                <div class="col-3 list-border">
                  {{ player.totalCredits }}
                </div>
                <div class="col-2 list-border">
                  {{ player.shipmentsFound?.length }}
                </div>
                <div class="col-3 list-border">
                  {{ player.topGrade || player.employeeGrade }}
                </div>
              </div>
            </div>
          </div>
        </section>
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
    const collectables = ref([])
    const selectedCollectable = ref({})
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')"
      getAccountAwards()
    })
    watchEffect(() => {
      profilesService.getProfiles()
      editable.value = { ...AppState.account }
      sortCollectables()
    })
    function sortCollectables() {
      selectedCollectable.value = editable.value.favoriteCollectable
      const all = AppState.account.inventory?.filter(i => i.type == 'collectable')
      if (!all) return []
      const uniqueSet = {}
      all.forEach(a => uniqueSet[a.id] = a)
      collectables.value = Object.keys(uniqueSet).map(s => uniqueSet[s])
    }
    async function getAccountAwards() {
      try {
        accountService.getAwards()
      } catch (error) {
        logger.error(error)
        Pop.error(error)
      }
    }
    return {
      editMode,
      editable,
      editTip,
      collectables,
      selectedCollectable,
      account: computed(() => AppState.account),
      leaderboard: computed(() => AppState.profiles.filter(a => a.credits > 0).sort((a, b) => b.totalCredits - a.totalCredits)),
      leaderAwards: computed(() => AppState.leaderAwards.filter(l => l.count > 0)),
      async editAccount() {
        try {
          if (editMode.value) {
            editable.value.favoriteCollectable = selectedCollectable.value.id
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
      },
      swapCollectable(ev) {
        let index = ev.target.value
        selectedCollectable.value = collectables.value[index]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-thumbnail {
  height: 25px;
  width: 25px;
  transition: all .2s ease;
}

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

.account-collectable {
  height: 100px;
  width: 100px;
  bottom: -20px;
  right: -35px;
  position: absolute;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3));
}

.leader-collectable {
  height: 130px;
  width: 130px;
  bottom: -45px;
  right: -25px;
  position: absolute;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.4));
  transition: all .5s ease;

  &:hover {
    transform: scale(2.2);
    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.award-icon {
  transition: all .2s ease;
  image-rendering: pixelated;
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.466));

  &:hover {
    transform: scale(1.8);
    filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.466));
  }

  img {
    width: 45px;
    height: 55px;
    padding-bottom: 10px;
  }
}

input {
  accent-color: var(--bs-warning);
}
</style>
