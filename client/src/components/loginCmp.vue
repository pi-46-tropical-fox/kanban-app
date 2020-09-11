<template>
  <div class="form-right">
    <form id="loginForm" @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailLogin"
          v-model= "email"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          v-model= "password"
          id="passwordLogin"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <a href="#" @click.prevent="openRegister">Register</a>
  </div>
</template>

<script>
import axios from "../axios/axiosInstance";
import dashboardPageVue from '../views/dashboardPage.vue';
export default {
  name: "Login",
  data(){
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    submitLogin() {
      let data ={
        email : this.email,
        password : this.password
      }
      axios
        .post("/login", data)
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$emit('isLogin', 'Dashboardpage')
          this.$emit('getTask')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openRegister(){
      console.log('masuk register')
      this.$emit('openRegister','register')
    }
  },
};
</script>

<style></style>
