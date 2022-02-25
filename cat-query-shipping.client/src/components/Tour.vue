<template>
  <v-tour name="tutorial" :steps="steps" :callbacks="tourCallbacks"></v-tour>
</template>

<script>
import { AppState } from "../AppState"
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'
export default {
  name: "Tour",
  setup() {
    function bozInsert(message) {
      return `<div class="tour-boz" ></div><b class="me-5">${message}</b>`
    }
    return {
      bozInsert,
      tourCallbacks: {
        onFinish: (() => accountService.editAccount({ needsTour: false })),
        onSkip: (() => accountService.editAccount({ needsTour: false }))
      },
      steps: [
        {
          target: '#tour-shipment-panel',
          header: {
            title: bozInsert('Lost Shipments'),
          },
          content: 'The the lost shipments you will be searching for will be displayed here on this screen.',
          params: {
            placement: 'top',
            enableScrolling: false
          }
        },
        {
          target: '#tour-shipment-details',
          header: {
            title: bozInsert('Lost Shipments'),
          },
          content: 'The details of the shipment <em> we do know </em> are shown here on this side. If a shipment is missing any details they simply aren\'t shown.',
          params: {
            placement: 'top',
            enableScrolling: false
          }
        },
        {
          target: '#tour-shipment-stats',
          header: {
            title: bozInsert('Lost Shipments'),
          },
          content: 'Here you can seen the stats of the shipment like: How much it\'s bounty is worth (based off of difficulty) and how many current searches, and pages printed you\'ve made.',
          params: {
            placement: 'top-end',
            enableScrolling: false
          }
        },
        {
          target: '#tour-search',
          header: {
            title: bozInsert('Search Module'),
          },
          content: 'This device here is where you will enter your search queries to ping lost shipment relays to find lost shipments. The base url is fixed so you just have to enter a query and hit <b>search</b>. The secondary screen will highlight using some shipment\'s context, it\'s mostly there to help bad spellers.',
          params: {
            placement: 'top-end',
            enableScrolling: false
          }
        },
        {
          target: '#tour-printer',
          header: {
            title: bozInsert('Manifest Printout'),
          },
          content: 'Your search results will be printed out here.  We got this going green initiative so it will only print out 50 results at a time.  Try not to waste the paper.',
          params: {
            placement: 'top-end',
            enableScrolling: false
          }
        },
        {
          target: '#tour-employee-stats',
          header: {
            title: bozInsert('Employee information'),
          },
          content: 'Up here you will be able to see your employee grade and current pay in union credits (score).',
          params: {
            placement: 'bottom',
            enableScrolling: false
          }
        },
        {
          target: '#authDropdown',
          header: {
            title: bozInsert('Employee information'),
          },
          content: 'If you click on your name here you can see more details about your employee record and view the records of other employees.  Ya\'know for a little friendly workplace competition.',
          params: {
            placement: 'bottom-end',
            enableScrolling: false
          }
        },
        {
          target: '#tour-dialogue',
          header: {
            title: bozInsert('Ask Boz'),
          },
          content: 'Press this to call me over if you need any help. Also Great place to get started.',
          params: {
            placement: 'left-start',
            enableScrolling: false
          }
        },
        {
          target: '#tour-docs',
          header: {
            title: bozInsert('User Manual'),
          },
          content: 'And <em>Finally</em>, here is all your employee documentation, best to read up on this if you\'re feelin stuck or are looking to get better at your job.',
          params: {
            placement: 'left-start',
            enableScrolling: false
          }
        }
      ]
    }
  },
  mounted: function () {
    logger.log('touring')
    this.$tours['tutorial'].start()
  }
}
</script>

<style lang="scss" >
.v-step {
  background-color: #2a2f32a4 !important;
  backdrop-filter: blur(20px);
  border-bottom: 2px solid #15181aa4;
  .v-step__header {
    background: var(--bs-warning) !important;
    color: var(--bs-dark);
  }
  .v-step__content {
    text-align: start;
  }
  .v-step__buttons {
    text-align: end;
    .v-step__button {
      border-radius: 3px;
    }
    .v-step__button-skip {
      border: none;
      color: var(--bs-light);
    }
    .v-step__button-skip:hover {
      color: var(--bs-danger);
    }
    .v-step__button-next {
      border: 1px solid var(--bs-info);
    }
  }
  // .v-step__arrow{border-bottom-color: #fbe8a5!important} FIXME this reacts weirdly with different angles
}
  .v-step[x-placement^=bottom] .v-step__arrow{
    border-width: 0em 1.2em 1.2em 1.2em !important;
    top: -1.2em!important;
    border-bottom-color: var(--bs-warning);
  }
   .v-step[x-placement^=top] .v-step__arrow{
    border-width: 1.2em 1.2em 0em 1.2em !important;
    bottom: -1.2em!important;
    border-top-color: var(--bs-warning);
  }
   .v-step[x-placement^=left] .v-step__arrow{
    border-width: 1.2em 0em 1.2em 1.2em !important;
    right: -1.2em!important;
    border-left-color: var(--bs-warning);
  }
</style>
