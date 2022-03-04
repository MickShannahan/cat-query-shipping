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
        path: 'docs/mongooseterminal',
        name: 'MongooseTerminal',
        component: loadPage('MongooseTerminal'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: loadPage('LoginPage')
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
  },
  {
    path: '/anime',
    name: 'Anime',
    component: loadPage('AnimePlayground'),
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
