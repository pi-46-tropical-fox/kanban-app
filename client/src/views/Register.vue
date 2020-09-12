<template>
  <div class="register-page">
    <center>
      <img class="responsive-img" style="width: 250px;" src="" />
      <div class="section"></div>
      <h5 class="sub-title">Create your account</h5>
      <div class="section"></div>
      <div class="container">
        <div class="z-depth-1 grey lighten-4 row"
          style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form @submit.prevent="register" class="col s12" method="post" id="registerForm">

            <div class='row'>
              <div class='input-field'>
                <input class='validate' id="email" type='email' name='email' v-model="email" />
                <label for='email'>Enter your email</label>
              </div>
            </div>

            <div class='row'>
              <div class='input-field'>
                <input class='validate' id="password" type='password' name='password' v-model="password" />
                <label for='password'>Enter your password</label>
              </div>
            </div>
            <br />
            <center>
              <div class='row'>
                <button type='submit' name='btn_login' class='button btn btn-large blue darken-4'>Register</button>
              </div>
            </center>
          </form>
        </div>
        <center>
          <a @click.prevent="movePageLogin" href="#">Have an account?</a>
        </center>
      </div>
    </center>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      console.log('masuk sini Register.vue');
      axios({
        url: '/register', 
        method: 'POST',
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        console.log(data, 'data register masuk siini');
        this.$emit('emitRegister', 'loginPage')
      })
      .catch(err => {
        console.log(err);
      })
    },
    movePageLogin() {
      this.$emit('emitMovePageLogin')
    }
  }
}
</script>

<style>
.sub-title {
  font-family: 'Nunito', sans-serif;
}

.col {
  font-family: 'Nunito', sans-serif;
}

a {
  font-family: 'Nunito', sans-serif;
}
</style>