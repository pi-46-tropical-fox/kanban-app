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
          <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
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
      clientId: '807199705023-40ob77cl80k94mmk5ue30jg1tij8tedj.apps.googleusercontent.com'
    };
  },
  props:['currentPage'],
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };

      this.$emit("loginSubmit", payload);
    },
     OnGoogleAuthSuccess (idToken) {
      console.log(idToken, 'token <<<<<<')
      axios({
        method: "POST",
        url: "/googleLogin",
        headers: {
          google_access_token: idToken
        }
      })
      .then(({data}) => {
        this.$emit('googleLogin', data)
      })
    
    },
    OnGoogleAuthFail (error) {
      console.log(error, 'error <<<<<<')
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
