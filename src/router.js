import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

let views = ['Login', 'Register']

function loadViews(views) {
  return views.map(v => {
    return {
      path: '/' + v,
      name: v,
      // which is lazy-loaded when the route is visited.
      component() {
        return import('./views/' + v + '.vue')
      }
    }
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...loadViews(views),
    {
      path: '/dashboard',
      name: 'Dashboard',
      beforeEnter(to, from, next) {
        // @ts-ignore
        if (store.state.auth.user.uid) {
          return next()
        }
        next('/login')
      },
      component() { return import('./views/Dashboard.vue') },
      children: [{
        path: 'vaults',
        name: 'Dashboard.Vaults',
        component() { return import('./components/dashboard/MyVaults') }
      }, {
        path: 'keeps',
        name: 'Dashboard.Keeps',
        component() { return import('./components/dashboard/MyKeeps') }
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
