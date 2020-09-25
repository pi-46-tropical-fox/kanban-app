<template>
  <div id="login" class="todos mt-5" v-if="page === 'login'">
    <div class="row align-items-center">
      <div
        class="col-sm-12 col-md-8"
        style="background-image: url('https://img.freepik.com/free-vector/kanban-board-illustration-for-agile-scrum-management-and-teamwork-process-methodology_33099-569.jpg'); height: 90vh;  background-repeat: no-repeat; background-size: cover;"
      ></div>
      <div class="col">
        <h1 class="text-center text-success">Kanban App</h1>
        <h2>Sign in</h2>
        <form v-on:submit.prevent="login">
          <div class="form-group">
            <label for>Email address</label>
            <input type="email" class="form-control" v-model="emailLogin" />
          </div>
          <div class="form-group">
            <label for>Password</label>
            <input type="password" class="form-control" v-model="passwordLogin" />
          </div>
          <button type="submit" class="btn btn-block btn-primary">Signin</button>
        </form>
        <button
          type="button"
          class="btn btn-block btn-danger mt-3"
          @click="signInGoogle"
        >Sign in With Google</button>
        <h5 class="mt-3">
          Don't have an account ?
          <button
            type="button"
            class="btn btn-lg btn-link"
            id="signupForm"
            v-on:click="changePage('register')"
          >Sign up here</button>
        </h5>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const ToastSuccess = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export default {
  name: "Login",
  props: ["page"],
  data() {
    return {
      emailLogin: null,
      passwordLogin: null
    };
  },
  methods: {
    login() {
      this.$emit("showLoader", true);
      axios({
        method: "POST",
        url: "/login",
        data: {
          email: this.emailLogin,
          password: this.passwordLogin
        }
      })
        .then(result => {
          localStorage.setItem("access_token", result.data.access_token);
          localStorage.setItem("username", result.data.username);
          this.$emit("getTasks");
          this.$emit("showLoader", false);
          ToastSuccess.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          this.changePage("home");
        })
        .catch(err => {
          if (err.response.data.length > 0) {
            this.$emit("showError", err.response.data[0].message);
          } else {
            this.$emit("showError", err.response.data.message);
          }
          this.$emit("showLoader", false);
        });
    },
    changePage(nextPage) {
      this.$emit("changePage", nextPage);
    },
    signInGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          var id_token = GoogleUser.getAuthResponse().id_token;
          this.isSignIn = this.$gAuth.isAuthorized;
          return axios({
            method: "post",
            url: "/googleSignIn",
            data: { token: id_token }
          });
        })
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("username", response.data.username);
          this.$emit("getTasks");
          this.$emit("showLoader", false);
          ToastSuccess.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          this.changePage("home");
        })
        .catch(error => {
          //on fail do something
          console.log(error);
        });
    }
  }
};
</script>
