import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase-config'
import auth from './stores/auth'
import data from './stores/data'

const APP = fb.firebaseApp
const DB = fb.firestore

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  modules: {
    auth,
    data
  },
  mutations: {

  },
  actions: {

  }
})
