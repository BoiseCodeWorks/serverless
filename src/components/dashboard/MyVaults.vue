<template>
  <div class="my-vaults">
    <div class="flex space-between align-items-center">
      <h3>My Vaults</h3>
      <i @click="showCreate = !showCreate" class="fa fa-lg fa-fw action muted" :class="{'fa-plus-square': !showCreate, 'fa-minus-square': showCreate}"></i>
    </div>
    <div class="create-vault slide-down" :class="{open: showCreate}">
      <form @submit.prevent="createVault">
        <div class="input-group">
          <label for="title">Title:</label>
          <input type="text" v-model="newVault.title" required>
        </div>
        <button class="btn" type="submit">Create</button>
        <button class="btn red" type="reset" @click="showCreate = false">Cancel</button>
      </form>
    </div>
    <div class="collection">
      <div class="collection-item" v-for="vault in myVaults" :key="vault.id">
        <router-link :to="{name: 'Dashboard.Vault', params: {id: vault.id}}">
          <div class="flex space-between align-items-center m-lr-1">
            <span>{{vault.title}}</span>
            <span>{{vault.keeps.length}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyVaults',
    data() {
      return {
        showCreate: false,
        newVault: {}
      }
    },
    computed: {
      user() {
        return this.$store.state.auth.user
      },
      myVaults() {
        return this.$store.state.data.vaults
      }
    },
    methods: {
      createVault() {
        this.newVault.keeps = []
        this.newVault.creatorId = this.user.uid
        this.$store.dispatch('create', { collection: 'vaults', data: this.newVault })
        this.newVault = {}
        this.showCreate = false
      }
    }

  }
</script>