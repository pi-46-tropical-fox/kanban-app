<template>
  <div
    style="background-color: #d9dadb;padding:2em 3em;border-radius: 1em;margin:2em 20em"
  >
    <form id="formLogin" @submit.prevent="loginPost">
      <div style="display: flex;flex-direction: row;margin-bottom: 2.5em;">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/GNOME_Todo_icon_2019.svg/1024px-GNOME_Todo_icon_2019.svg.png"
          style="width: 4em;"
          alt=""
        />
        <h3 style="margin-top: 1em;">Kanbanify</h3>
      </div>
      <div
        id="error-login"
        style="color: red;font-size: 15px;line-height: 2px;"
      ></div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          aria-describedby="emailHelp"
          placeholder="Email"
          id="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
          id="password"
        />
      </div>
      <div>
        <button
          type="submit"
          class="btn btn-secondary col-12"
          style="margin-top: 2em;"
        >
          Sign In
        </button>
      </div>

      <div style="margin-top: 1em;font-size: 14px;text-align: center;">
        <p>
          Don't Have An Account?<a
            href="#"
            id="sign-up"
            v-on:click="changePage('register')"
          >
            Sign Up</a
          >
        </p>
      </div>

      <hr style="margin:2em 0;" />

      <p style="text-align: center;">Or</p>
    </form>
    <div style="display:flex;justify-content:center">
      <button
        v-google-signin-button="clientId"
        class="google-signin-button btn btn-primary"
      >
        Continue with Google
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      clientId:
        "985448126582-tcri07qinl83a9v4mtntfrm8t3bbct2a.apps.googleusercontent.com",
    };
  },
  props: ["changePage"],
  methods: {
    OnGoogleAuthSuccess(idToken) {
      axios({
        method: "post",
        url: `https://ardy-kanban.herokuapp.com/auth/googleLogin`,
        headers: {
          id_token: idToken,
        },
      })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$props.changePage("main-menu");
        })
        .catch((err) => {
          console.log(err);
        });
      // Receive the idToken and make your magic with the backend
    },

    OnGoogleAuthFail(error) {
      console.log(error);
    },
    loginPost() {
      axios
        .post("https://ardy-kanban.herokuapp.com/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          this.$props.changePage("main-menu");
          // this.getOrganization()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
