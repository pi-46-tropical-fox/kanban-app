<template>
  <div class="form-right">
    <form id="registerForm" @submit.prevent="submitRegister">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="emailRegister"
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
          id="passwordRegister"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <a href="#" @click.prevent="openLogin">Login</a>
  </div>
</template>

<script>
import axios from "../axios/axiosInstance";
import dashboardPageVue from '../views/dashboardPage.vue';
export default {
  name: "Register",
  data(){
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    submitRegister() {
        let data ={
        email : this.email,
        password : this.password
      }
      axios
        .post("/register", data)
        .then(({ data }) => {
          this.$emit('openLogin','login')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openLogin(){
        this.$emit('openLogin','login')
    }
  },
};
</script>

<style></style>
