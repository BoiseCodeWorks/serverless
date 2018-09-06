<template>
  <div class="my-keeps">
    <div class="flex space-between align-items center">
      <h3>My Keeps</h3>
      <i @click="showCreate = !showCreate" class="fa fa-fw action muted" :class="{'fa-plus-square': !showCreate, 'fa-minus-square': showCreate}"></i>
    </div>
    <div class="create-keep slide-down" :class="{open: showCreate}">
      <form @submit.prevent="createKeep">
        <div class="input-group">
          <label for="title">Title:</label>
          <input type="text" v-model="newKeep.title" required>
        </div>
        <div class="input-group">
          <label for="img">Img:</label>
          <input type="text" v-model="newKeep.img" required>
        </div>
        <div class="input-group">
          <label for="public">Public:</label>
          <input type="checkbox" v-model="newKeep.public">
        </div>
        <button class="btn" type="submit">Create</button>
        <button class="btn red" type="reset" @click="showCreate = false">Cancel</button>
      </form>
    </div>
    <div class="keeps flex flex-wrap">
      <div class="keep col l3 m4" v-for="keep in myKeeps">
        <keep :keep="keep">
          <div slot="actions">
            Actions here
          </div>
        </keep>
      </div>
    </div>
  </div>
</template>

<script>
  import Keep from '../Keep'
  export default {
    name: 'MyVaults',
    data() {
      return {
        showCreate: false,
        newKeep: {}
      }
    },
    computed: {
      user() {
        return this.$store.state.auth.user
      },
      myKeeps() {
        return this.$store.state.data.myKeeps
      }
    },
    methods: {
      createKeep() {
        this.newKeep.creatorId = this.user.uid
        this.newKeep.views = 0
        this.$store.dispatch('create', { collection: 'keeps', data: this.newKeep })
      }
    },
    components: {
      Keep
    }
  }
</script>

<style>
</style>