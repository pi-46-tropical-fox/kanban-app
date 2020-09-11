<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="loginPost">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            aria-describedby="emailHelp"
            id="email"
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
            v-model="password"
            id="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <a href="#" v-on:click="changePage('register')">Register</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name : 'LoginPage',
    data() {
        return {
            email : '',
            password : '',
            name : ''
        }
    },
    props : ['changePage'],
    methods : {
        loginPost() {
            axios.post('http://localhost:3000/auth/login', {
                email: this.email,
                password: this.password
            })
                .then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.$props.changePage('main-menu')
                    // this.getOrganization()
                })
                .catch(err => {
                    console.log(err);
                })
        },
    }
};
</script>

<style></style>
