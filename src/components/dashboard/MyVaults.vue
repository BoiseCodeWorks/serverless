<template>
  <div class="my-vaults">
    <h3>My Vaults</h3>
    <div class="collection">
      <div class="collection-item" v-for="vault in myVaults" :key="vault.id">
        <div class="flex space-between align-items-center m-lr-1">
          <span>{{vault.title}}</span>
          <span>{{vault.keeps.length}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyVaults',
    data() {
      return {
        showCreate: false
      }
    },
    computed: {
      myVaults() {
        return this.$store.state.data.myVaults
      }
    }
  }
</script>