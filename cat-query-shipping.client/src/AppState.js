import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  lostShipment: {},
  baseUrl: 'http://localhost:3000/api/shipments',
  searchResults: [],
  currentGuesses: []
})
