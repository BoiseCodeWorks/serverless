<template>
  <div class="dashboard">
    <div class="row center">
      <div class="col m6">
        <div class="card p-1">
          <div class="center">
            <router-link :to="{name: 'Dashboard.Vaults'}">Vaults</router-link>
          </div>
        </div>
      </div>
      <div class="col m6">
        <div class="card p-1">
          <div class="center">
            <router-link :to="{name: 'Dashboard.Keeps'}">Keeps</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="card p-1">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Dashboard',
    mounted() {
      this.$store.dispatch('getUserData', this.user)
    },
    computed: {
      user() {
        return this.$store.state.auth.user
      }
    }
  }
</script>