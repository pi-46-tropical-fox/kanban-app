<template>
  <div class="login-page">
    <center>
      <img class="responsive-img" style="width: 250px;" src="" />
      <div class="section"></div>
      <h5 class="sub-title">Login to your account</h5>
      <div class="section"></div>
      <div class="container">
        <div class="z-depth-1 grey lighten-4 row"
          style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">

          <form class="col s12" @submit.prevent="login">
            <div class="row">
              <div class="input-field col s12">
                <input id="email" class="validate" type="email" name="email" v-model="email" />
                <label for='email'>Enter your email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input id="password" class="validate" type="password" name="password" v-model="password" />
                <label for='password'>Enter your password</label>
              </div>
              <label style='float: right;'>
              </label>
            </div>

            <br />
            <center>
              <div class="row">
                <button type='submit' name='btn_login' class='button col s12 btn btn-large blue darken-4'>Login</button>
              </div>
            </center>
          </form>
          <!-- <p>or</p>
          <center>
            <div class='row'>
              <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <a href="#" onclick="googleSignOut();">Sign out</a>
          </center> -->
        </div>
      </div>
      <a @click.prevent="movePageRegister" href="#">Create account</a>
    </center>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit('loginSubmit', payload)
    },
    movePageRegister() {
      console.log('masuk ke register yang di login');
      this.$emit('emitMovePageRegister')
    }
  }
}
</script>

<style scoped>

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



