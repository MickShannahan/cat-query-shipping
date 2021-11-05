<template>
  <div class="container  text-center">
    <div class="row mt-5 about justify-content-center">

    <div class="col-4 me-5 p-0">
      <div class="row bg-warning rounded lighten-10 shadow p-3 ">
        <div class="col-4">
          <img class="img-fluid border-2 border-warningS rounded-1" :src="account.picture" alt="">
        </div>
        <div class="col-8 text-start">
          <h5 class="text-primary">{{account.name}}</h5>
            <div><i class="mdi mdi-google-podcast mx-1"></i>{{account.credits}}</div>
            <div> <b>Recovered Shipments:</b> {{account.shipmentsFound.length}}</div>
            <h4><b class="text-primary"> {{account?.employeeGrade}}</b></h4>
        </div>
      </div>
    </div>

    <div class="col-6 shadow bg-primary lighten-20 rounded p-3">
      <div class="row justif-content-center leader-border p-2 mx-3">
        <h4 class="col-12 text-center"><i class="mdi mdi-cat mx-1"></i>Employee of the Cycle<i class="mdi mdi-cat mx-1"></i></h4>
        <div class="col-6">
            <h5 class="text-dark">{{leaderboard[0]?.name}}</h5>
            <div><i class="mdi mdi-google-podcast mx-1"></i>{{leaderboard[0]?.credits}}</div>
            <div> <b >Recovered Shipments:</b> {{leaderboard[0]?.shipmentsFound.length}}</div>
            <h4><b class="text-primary"> {{leaderboard[0]?.employeeGrade}}</b></h4>
        </div>
        <div class="col-6">
          <img class="img-fluid border border-primary rounded-1" :src="leaderboard[0]?.picture" alt="">
        </div>
      </div>
      <div class="row text-primary mt-3">
        <div class="col-4">name</div>
        <div class="col-3"><i class="mdi mdi-google-podcast mx-1"></i></div>
        <div class="col-2"><i class="mdi mdi-package mx-1"></i></div>
        <div class="col-3"><i class="mdi mdi-smart-card mx-1"></i></div>
      </div>
      <!-- TODO ABSTRACT THIS -->
      <div class="row leaderboard p-0">
        <div class="col-12 p-0">
          <div v-for="player in leaderboard.slice(1)" :key="player.id" class="row mt-2 px-2" :class="{'text-warning': player.id == account.id, 'text-dark': player.id != account.id}">
            <div class="col-4 list-border">
            {{player.name}}
            </div>
            <div class="col-3 list-border">
            {{player.credits}}
            </div>
            <div class="col-2 list-border">
            {{player.shipmentsFound.length}}
            </div>
            <div class="col-3 list-border">
            {{player.employeeGrade}}
            </div>
          </div>
        </div>
      </div>

    </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import {profilesService} from '../services/ProfilesService'
export default {
  name: 'Account',
  setup() {
    onMounted(() =>{
      profilesService.getProfiles()
    })
    return {
      account: computed(() => AppState.account),
      leaderboard: computed(()=> AppState.profiles.sort((a,b)=> b.credits - a.credits))
    }
  }
}
</script>

<style lang="scss" scoped>
.leaderboard{
  max-height: 60vh;
}

.leader-border{
  border-radius: 6px;
  border: 2px dashed var(--bs-primary);
}

.list-border{
  border-bottom: 2px dashed var(--bs-primary);
}
</style>
