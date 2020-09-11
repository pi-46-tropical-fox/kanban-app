<template>
  <div
    style="background-color: #d9dadb;padding:2em 3em;border-radius: 1em;margin:2em 20em"
  >
    <form id="formLogin" @submit.prevent="registerPost">
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
        <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" placeholder="Name"/>
      </div>
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
          Sign Up
        </button>
      </div>

      <div style="margin-top: 1em;font-size: 14px;text-align: center;">
        <p>
          Already Have An Account?<a
            href="#"
            id="sign-up"
            v-on:click="changePage('login')"
          >
            Sign In</a
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'RegisterPage',
    data() {
        return {
            email : '',
            password : '',
            name : ''
        }
    },
    props : ['changePage'],
    methods : {
        registerPost() {
            axios.post('https://ardy-kanban.herokuapp.com/auth/register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
                .then(() => {
                    this.$props.changePage('login')
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
};
</script>

<style></style>
