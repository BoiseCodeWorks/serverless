<template>
  <div class="home text-center">
    <h1>Serverless</h1>
    <p>with Vue & Firebase</p>
    <div class="keeps row">
      <keep class="m-1 col m4" :keep="keep" v-for="keep in keeps">
        <div slot="actions" v-if="user.uid">
          <div class="action muted" @click="showAddToVault(keep)">
            Store in Vault?
          </div>
        </div>
      </keep>
    </div>
    <div v-if="showingVaults" @click="closeModal" class="vault-bg flex justify-content-center align-items-center">
      <div class="my-vaults card p-1" @click.stop="stop">
        <div>
          Select the vault
        </div>
        <div class="flex align-items-center space-between m-1">
          <div class="border-5">
            <div class="dark p-5 action muted" @click="addToVault(v)" v-for="v in vaults">{{v.title}}</div>
          </div>
          <keep :keep="activeKeep"></keep>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from '@/components/Keep'
  export default {
    name: 'home',
    data() {
      return {
        showingVaults: false,
        activeKeep: {}
      }
    },
    computed: {
      user() {
        return this.$store.state.auth.user
      },
      vaults() {
        return this.$store.state.data.vaults
      },
      keeps() {
        return this.$store.state.data.keeps
      }
    },
    methods: {
      showAddToVault(keep) {
        this.activeKeep = keep
        this.showingVaults = true
      },
      stop() {

      },
      closeModal() {
        this.showingVaults = false;
      },
      addToVault(vault) {
        vault.keeps.push(this.activeKeep.id)
        this.$store.dispatch('update', { collection: 'vaults', data: vault })
        this.showingVaults = false;
        this.activeKeep = {}
      }
    },
    components: {
      Keep
    }
  }
</script>

<style>
  .vault-bg {
    background: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .my-vaults {
    height: 70vh;
    width: 80vw;
  }
</style>