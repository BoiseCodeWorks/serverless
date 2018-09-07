import firebase from 'firebase/app'
import 'firebase/auth'
import router from '../router'
export default {
  state: {
    user: {}
  },
  mutations: {
    // 
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    // USER AUTHENTICATION
    register({ commit, dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push("/dashboard/vaults")
          commit("setUser", res.user)
          firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
            .then(res => {
              console.log("Profile Updated")
            })
            .catch(err => { console.error(err) })
          firebase.auth().currentUser.sendEmailVerification()
            .then(res => {
              console.log("Verification Email Sent")
            })
            .catch(err => { console.error(err) })
        })
        .catch(err => { console.error(err) })
    },
    login({ commit, dispatch }, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          router.push('/dashboard')
          commit("setUser", res.user)
        })
        .catch(err => { console.error(err) })
    },
    logout({ commit, dispatch }) {
      firebase.auth().signOut()
        .then(res => {
          router.push('/login')
          commit('setUser', {})
        })
        .catch(err => { console.error(err) })
    },
    authenticate({ commit, dispatch }) {
      // you can change the default route here
      //if someone is signed in, it goes to dashboard, if not, go to auth
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user || {})
          dispatch('addNotification', { type: 'success', message: 'Welcome ' + user.email })
          router.push('/dashboard/vaults')
        } else {
          router.push('/login')
        }
      });
    }
  }
}