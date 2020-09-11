<template>
  <div v-if="currentPage === 'loginPage'">
    <section id="login-page">
      <div class="login-page-left">
        <img src="../images/searching 1.svg" alt="login page" />
      </div>
      <div class="login-page-right">
        <div class="logo">
          <img src="../images/Group 5.svg" alt="" />
        </div>
        <h1>Sign In</h1>
        <form id="submit-login" @submit.prevent="login">
          <label>Email:</label>
          <input type="email" id="email-login" v-model="email" />
          <label>Password:</label>
          <input type="password" id="password-login" v-model="password" />
          <br />
          <button class="login-btn" type="submit">Sign in</button> <br />
        </form>
        <span
          >Don't have an account?
          <a href="#" id="go-to-register" @click="register">Register Now!</a></span
        >
        <span>or</span>
        <span>You can login with your google account:</span><br />
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </section>
  </div>

  <div v-else>
    <section id="login-page">
      <div class="login-page-left">
        <img src="../images/searching 1.svg" alt="login page" />
      </div>
      <div class="login-page-right">
        <div class="logo">
          <img src="../images/Group 5.svg" alt="" />
        </div>
        <h1>Register</h1>
        <form id="submit-login" @submit.prevent="registerForm">
          <label>Email:</label>
          <input type="email" id="email-login" v-model="email" />
          <label>Password:</label>
          <input type="password" id="password-login" v-model="password" />
          <br />
          <button class="login-btn" type="submit">Register</button> <br />
        </form>
        <span
          >Already have an account?
          <a href="#" id="go-to-register" @click="loginForm">Sign in</a></span
        >
    </section>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: "loginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },props:['currentPage'],
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };

      this.$emit("loginSubmit", payload);
    },
    loginForm(){
      this.currentPage ='loginPage'
    },
    register(){
      this.currentPage = 'registerPage'
    },
    registerForm() {
          axios({
              method: "POST",
              url: '/register',
              data: {
                email:this.email,
                password:this.password
              }
          })
          .then(({data}) => {
              this.currentPage = 'loginPage'
              this.email = '',
              this.password=''
          })
          .catch(err => {
              console.log(err);
          })
      },
  },
};
</script>

<style></style>
