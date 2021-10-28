import { authGuard, authSettled } from '@bcwdev/auth0provider-client'
import { createRouter, createWebHashHistory } from 'vue-router'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authSettled,
    children: [
      {
        path: 'docs/orientation',
        name: 'Orientation',
        component: loadPage('Orientation'),
      },
      {
        path: 'docs/lostshipments',
        name: 'LostShipments',
        component: loadPage('LostShipments'),
      },
      {
        path: 'docs/queryurl',
        name: 'QueryUrl',
        component: loadPage('QueryUrl'),
      },
      {
        path: 'docs/mongooseterminl',
        name: 'MongooseTerminal',
        component: loadPage('MongooseTerminal'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
