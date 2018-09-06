import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase-config'
import auth from './stores/auth'

const APP = fb.firebaseApp
const DB = fb.firestore

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  modules: {
    auth
  },
  mutations: {

  },
  actions: {

  }
})
