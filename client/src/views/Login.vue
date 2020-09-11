<template>
  <div>
    <section id="login-page">
      <div class="login-page-left">
        <img src="./assets/logo.png" alt="login page" />
      </div>
      <div class="login-page-right">
        <h1>Sign In</h1>
        <form @submit.prevent="loginChild()">
          <label>Email</label>
          <input type="email" v-model="email" id="login-email" />
          <label>Password</label>
          <input type="password" v-model="password" id="login-password" required />
          <button class="login-btn" type="submit">Login</button>
          <br>
          <p>
            Don't have an id?
            <a href="#" @click="toRegisterPage">Sign up here</a>
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: "loginPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    loginChild() {
      let payload = {
        email: this.email,
        password: this.password
      };
      this.$emit("loginSubmit", payload);
    },
    toRegisterPage() {
      this.$emit("toRegisterPage")
    }
  }
};
</script>

<style>
</style>