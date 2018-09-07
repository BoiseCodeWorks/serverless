<template>
  <div class="vault">
    <div v-if="vault.id">
      <h3>{{vault.title}}</h3>
      <div class="vault-keeps">
        <keep class="m-1 col m4" :keep="keep" v-for="keep in vault.keeps">
          <div slot="actions">
            <div class="action muted" @click="removeFromVault(keep)">
              Remove From Vault?
            </div>
          </div>
        </keep>
      </div>
    </div>
    <div v-else>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from '../Keep'
  export default {
    name: 'vault',
    mounted() {
      this.$store.dispatch('getVault', this.$route.params.id)
    },
    computed: {
      vault() {
        return this.$store.state.data.activeVault
      }
    },
    methods: {
      removeFromVault(keep) {
        let data = this.vault
        data.keeps = data.keeps.filter(k => k.id !== keep.id).map(k => k.id)
        this.$store.dispatch('update', { collection: 'vaults', data })
      }
    },
    components: {
      Keep
    }
  }
</script>