<template>
  <div class="register container text-center">
    <div class="m-1">
      <h3>Register</h3>
      <form @submit.prevent="register">
        <input type="text" v-model="newUser.name" placeholder="name">
        <input type="email" v-model="newUser.email" placeholder="email">
        <input type="password" v-model="newUser.password" placeholder="password">
        <button type="submit" class="btn">Create Account</button>
      </form>
      <div class="m-t-1">
        <router-link :to="{name: 'Login'}">Already a user Login Here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      }
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      }
    }
  }
</script>