<template>
  <div class="login text-center container">
    <div class="m-1">
      <h3>Login</h3>
      <form @submit.prevent="loginUser">
        <input type="email" v-model="creds.email" placeholder="email">
        <input type="password" v-model="creds.password" placeholder="password">
        <button type="submit" class="btn">Login</button>
      </form>
      <div class="m-t-1">
        <router-link :to="{name: 'Register'}">No account? Click here to Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        creds: {
          email: "",
          password: ""
        }
      };
    },
    methods: {
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>