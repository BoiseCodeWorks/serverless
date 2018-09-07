import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase-config'
import auth from './stores/auth'
import data from './stores/data'
import notifications from './stores/notifications'

const APP = fb.firebaseApp
const DB = fb.firestore

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  modules: {
    auth,
    data,
    notifications
  },
  mutations: {

  },
  actions: {

  }
})
