<template>
  <div>
    <section id="login-page">
      <div class="login-page-left">
        <h1>KanBan</h1>
      </div>

      <!-- login -->
      <div class="login-page-right" v-if="currentPage === 'loginPage'">
        <h1>Sign into your account</h1>
        <form id="submit-login" @submit.prevent="login">
          <label style="font-family: 'Ubuntu Condensed', sans-serif;"
            >Email :</label
          >
          <input
            type="email"
            id="email-login"
            placeholder="kanBan@mail.com"
            v-model="email"
            required
          />
          <label style="font-family: 'Ubuntu Condensed', sans-serif;"
            >Password :</label
          >
          <input
            type="password"
            placeholder="*******"
            v-model="password"
            required
          />
          <button class="login-btn" id="pass-login" type="submit">Login</button>
        </form>
        <hr />
        <br />
        <div class="register">
          <p>Dont have account ? <a href="#" @click="registerForm">Register here</a></p>
        </div>
      </div>

      <!-- register -->
      <div class="login-page-right" v-if="currentPage === 'registerPage'">
        <h1>Register and start manage!</h1>
        <form id="submit-login" @submit.prevent="register">
          <label style="font-family: 'Ubuntu Condensed', sans-serif;"
            >Email :</label
          >
          <input
            type="email"
            id="email-login"
            placeholder="kanBan@mail.com"
            v-model="email"
            required
          />
          <label style="font-family: 'Ubuntu Condensed', sans-serif;"
            >Password :</label
          >
          <input
            type="password"
            placeholder="*******"
            v-model="password"
            required
          />
          <button class="login-btn" id="pass-login" type="submit">Register</button>
        </form>
        <hr />
        <br />
        <div class="register">
          <p>Already have account?<a href="#" @click="loginForm">Sign in</a></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Axios from '../config/axios'
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  props:['currentPage']
  ,

  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("loginSubmit", payload);
    },
    register(){
      Axios({
        url: "/register",
        method: "POST",
        data:{
          email:this.email,
          password:this.password
        }
      })
        .then(({ data })  => {
          console.log(data)
          this.currentPage = "loginPage";
          // this.fetchTask()
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
    registerForm(){
      this.currentPage = 'registerPage'
    },
    loginForm(){
      this.currentPage = 'loginPage'
    },
    fetchTask(){
      this.$emit('fetchTask')
    }
  },
};
</script>

<style scoped></style>
