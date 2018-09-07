<template>
  <div id="app">
    <notifications></notifications>
    <div class="navbar sticky flex align-items-center text-white p-l-1 space-between p-r-1">
      <div class="nav-left">
        <router-link to="/">Home
        </router-link>
      </div>
      <div class="nav-right">
        <div v-if="!user.uid">
          <router-link :to="{name: 'Login'}">Login</router-link>
          <router-link :to="{name: 'Register'}">Register</router-link>
        </div>
        <div v-else>
          <span>Hello {{user.displayName || user.email}}</span>
          <router-link to="/dashboard">Dashboard</router-link>
          <span class="m-l-1" @click="logout"><i class="fa fa-fw fa-sign-out action muted"></i></span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Notifications from './components/Notifications'
  export default {
    name: 'app',
    mounted() {
      this.$store.dispatch('get', { collection: 'keeps' })
    },
    computed: {
      user() {
        return this.$store.state.auth.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      Notifications
    }
  }
</script>