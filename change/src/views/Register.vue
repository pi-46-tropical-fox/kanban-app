<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="registerPost">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <a href="#" v-on:click="changePage('login')">Login</a>
      </form>
    </div>
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
            axios.post('http://localhost:3000/auth/register', {
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
