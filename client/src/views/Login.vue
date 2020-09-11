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
          <button class="login-btn" type="submit">Login</button> <br>
          <br>
          <p>
            Don't have an id?
            <a href="#" @click="toRegisterPage">Sign up here</a>
          </p>
        </form>
        <p>or login with google</p><br>
        <button  v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
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
      password: "",
      clientId: '653981013357-7o98gntkfmkbi9dvf9h6ng1g7dq7lvuu.apps.googleusercontent.com'
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
    },
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      localStorage.setItem('access_token', idToken)
      this.$emit('googleSignIn')
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    }
  }
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>