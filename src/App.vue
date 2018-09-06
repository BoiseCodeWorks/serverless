<template>
  <div id="app">
    <div class="navbar sticky flex align-items-center text-white p-l-1 space-between p-r-1">
      <div class="nav-left">
        <router-link v-if="user.uid" to="/dashboard">Dashboard</router-link>
        <router-link v-else to="/">Home</router-link>
      </div>
      <div class="nav-right">
        <div v-if="!user.uid">
          <router-link :to="{name: 'Login'}">Login</router-link>
          <router-link :to="{name: 'Register'}">Register</router-link>
        </div>
        <div v-else>
          <span>Hello {{user.displayName || user.email}}</span>
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
  export default {
    name: 'app',
    computed: {
      user() {
        return this.$store.state.auth.user
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>