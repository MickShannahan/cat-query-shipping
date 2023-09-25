<template>
  <div class="container text-center">
    <div class="row mt-5 about justify-content-center">
      <!-- STUB Your Account -->
      <div class="col-12 col-lg-5 me-lg-5 mb-3 p-lg-0">
        <div class="row bg-warning rounded lighten-10 shadow p-3">
          <div class="col-4">
            <div v-if="!editMode" class="position-relative">
              <img class="img-fluid border-2 border-warningS rounded-1" :src="account.picture" alt="" />
              <img v-if="account?.favoriteCollectable?.img" class="account-collectable"
                :src="account?.favoriteCollectable?.img" alt="">
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
              <small>favorite collectable: {{ selectedCollectable?.name }}<img class="item-thumbnail"
                  :src="selectedCollectable?.img" alt=""></small>
              <input value="0" @input="swapCollectable" type="range" class="w-100" :min="0"
                :max="collectables.length - 1">
            </div>
          </div>
        </div>

        <AwardsThread />
      </div>

      <!-- STUB Leaderboard -->
      <div class="col-lg-6 shadow bg-primary lighten-20 rounded p-3 mb-5 position-relative">
        <section class="row justify-content-center leader-border p-2 mx-3">
          <button @click="showAllTimeLeader = !showAllTimeLeader" class="leaderboard-button" v-tooltip:left="`${showAllTimeLeader ? 'show cycle': 'show all time'}`">
            <i v-if="!showAllTimeLeader" class="text-primary darken-30 fs-3 mdi mdi-calendar-star"></i>
            <i v-else class="text-primary darken-30 fs-3 mdi mdi-calendar"></i>
          </button>
          <div v-if="showAllTimeLeader" class="col-12 text-center mb-1 fs-4">
            <i class="mdi mdi-cat mx-1"></i>All Time Top Employee<i class="mdi mdi-cat mx-1"></i>
          </div>
          <div v-else class="col-12 text-center mb-1">
            <div class="fs-4">
              <i class="mdi mdi-cat mx-1"></i>Employee of the Cycle<i class="mdi mdi-cat mx-1"></i>
            </div>
            <div class="text-primary darken-10"><small>(60 days)</small></div>
          </div>
          <div class="col-6" v-if="employeeOfCycle">
            <h5 class="text-dark">{{ employeeOfCycle?.name }}</h5>
            <div>
              <i class="mdi mdi-google-podcast mx-1"></i>{{ employeeOfCycle?.credits }}
            </div>
            <div>
              <b>Recovered Shipments:</b>
              {{ employeeOfCycle?.shipmentsFound?.length }}
            </div>
            <h4>
              <b class="text-primary"> {{ employeeOfCycle?.topGrade || employeeOfCycle?.employeeGrade }}</b>
            </h4>
            <div class="d-flex flex-wrap">
              <div v-for="a in leaderAwards" class="award-icon m-1"
                v-tooltip:bottom="`${a.name} ${a.count > 1 ? a.count : ''}`">
                <img :src="a.img" alt="">
              </div>
            </div>
          </div>
          <div v-else class="col-6">No employee</div>
          <div class="col-6 mb-5">
            <div class="position-relative">
              <img class="img-fluid border border-primary rounded-1" :src="employeeOfCycle?.picture" alt="" />
              <img v-if="employeeOfCycle?.favoriteCollectable" class="leader-collectable"
                :src="employeeOfCycle?.favoriteCollectable?.img" alt="">
            </div>
          </div>
        </section>
        <section class="row text-primary mt-3">
          <div class="col-4 offset-1">name</div>
          <div class="col-3"><i class="mdi mdi-google-podcast mx-1"></i></div>
          <div class="col-2"><i class="mdi mdi-package mx-1"></i></div>
          <div class="col-2"><i class="mdi mdi-smart-card mx-1"></i></div>
        </section>
        <!-- TODO ABSTRACT THIS -->
        <section class="row p-0">
          <div class="leaderboard h-25">
            <div class="col-12 p-0">
              <div v-for="player in leaderboard.slice(1)" :key="player.id" class="row mt-2 px-2" :class="{
                'text-warning': player.id == account.id,
                'text-dark': player.id != account.id,
              }">
                <div class="col-1 list-border">
                  <button type="button" class="btn text-primary py-1" data-bs-html="true"
                    data-bs-custom-class="custom-pop" data-bs-toggle="popover" data-bs-trigger="hover focus"
                    :data-bs-title="popTitle(player)" :data-bs-content="popContent(player)"><i
                      class="mdi mdi-card-bulleted"></i></button>
                </div>
                <div class="col-4 list-border">
                  {{ player.name }}
                </div>
                <div class="col-3 list-border">
                  {{ player.totalCredits }}
                </div>
                <div class="col-2 list-border">
                  {{ player.shipmentsFound?.length }}
                </div>
                <div class="col-2 list-border">
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
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import { accountService } from "../services/AccountService"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { Popover } from 'bootstrap'
import {days} from '../utils/logic.js'
export default {
  name: 'Account',
  setup() {
    const editMode = ref(false)
    const editable = ref({})
    const editTip = ref('edit employee record')
    const collectables = ref([])
    const selectedCollectable = ref({})

    const leaderboard = computed(() => showAllTimeLeader.value ?
    AppState.profiles.filter(a => a.credits > 0).sort((a, b) => b.totalCredits - a.totalCredits) :
    AppState.profiles.filter(a => a.credits > 0 && new Date( a.updatedAt).getTime() > (Date.now - 60* days) ).sort((a, b) => b.totalCredits - a.totalCredits))

    const employeeOfCycle = computed(()=> leaderboard.value[0] != undefined ? leaderboard.value[0] : AppState.profiles.sort((a,b) => b.totalCredits - a.totalCredits)[0])
    const showAllTimeLeader = ref(false)
    onMounted(() => {
      document.body.style.backgroundImage = "radial-gradient(rgba(2, 0, 36, 0), rgba(34, 65, 60, 0.7)), url('/assets/img/bg/Cups-room-cup.png')"
      getAccountAwards()
    })
    watch(leaderboard, () => {
      logger.log("leaderboard change")
      setTimeout(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new Popover(popoverTriggerEl))
      }, 500);

    })
    watchEffect(() => {
      profilesService.getProfiles()
      editable.value = { ...AppState.account }
      sortCollectables()
    })
    function sortCollectables() {
      const all = AppState.account.inventory?.filter(i => i.type == 'collectable')
      if (!all) return []
      const uniqueSet = {}
      all.forEach(a => uniqueSet[a.id] = a)
      collectables.value = Object.keys(uniqueSet).map(s => uniqueSet[s]).sort(s => {
        if (AppState.account?.favoriteCollectable) {
          if (s.name == AppState.account?.favoriteCollectable?.name) return -1
        }
        return 0
      })
      selectedCollectable.value = collectables.value[0]
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
      leaderboard,
      employeeOfCycle,
      showAllTimeLeader,
      account: computed(() => AppState.account),
      leaderAwards: computed(() => employeeOfCycle.value?.awards.filter(a => a.count > 0)),
      async editAccount() {
        try {
          if (editMode.value) {
            editable.value.favoriteCollectable = selectedCollectable.value?.id
            await accountService.editAccount(editable.value)
            Pop.toast('Employee record updated', 'success')
            editMode.value = false
            editTip.value = 'edit employee record'
          } else {
            editMode.value = true
            editTip.value = 'save record'
          }
        } catch (error) {
          Pop.toast(error)
          logger.error(error)
        }
      },
      swapCollectable(ev) {
        let index = ev.target.value
        selectedCollectable.value = collectables.value[index]
      },
      popTitle(player) {
        return `
        <div class="text-primary darken-20">${player.name}  <span >${player.employeeGrade}</span></div>
        `
      },
      popContent(player) {
        let awards = player.awards.filter(a => a.count > 0)
        return `
        <div class=" position-relative">
          <div class="d-flex">
            <img class="pop-img rounded border border-primary" src="${player.picture}"/>
            <img class="pop-trinket ${player.favoriteCollectable ? '' : 'd-none'}" title="${player.favoriteCollectable?.name}" src="${player.favoriteCollectable?.img}"/>
            ${awards.map(a => {
          return `
              <img class="pop-badge" title="${a.name} ${a.count > 1 ? a.count : ''}" src="${a.img}"/>
              `
        }).join('')}
          </div>
          <div class="text-primary fw-bold">${new Date(player.createdAt).toLocaleDateString('en-us', { month: 'short', year: '2-digit' })}</div>
        </div>
        `
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

.leaderboard-button{
  position: absolute;
  right: -25px;
  top: -25px;
  height: 55px;
  width: 55px;
  border-radius: 50em;
  border: 0;
  background-color: var(--bs-primary);
  filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.466));
  transition: all .2s ease;
  &:hover{
    transform: rotate(15deg) scale(1.1);
    color: var(--bs-info)!important;
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
