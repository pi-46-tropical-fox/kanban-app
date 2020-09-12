<template>
  <div id="register-page">
    <div class="container">
      <div class="image-container"></div>
      <div class="form-container">
          <div class="heading">
              <div class="msg" v-html="message"></div>
              <h1>Create your account</h1>
          </div>
          <div class="form-box">
              <form @submit.prevent="register">
                  <div class="form-input">
                      <span><i class="fa fa-envelope"></i></span>
                      <input type="email" placeholder="Email Address" v-model="email">
                  </div>
                  <div class="form-input">
                      <span><i class="fa fa-lock"></i></span>
                      <input type="password" placeholder="Password" v-model="password">
                  </div>
                  <div class="form-input">
                      <span><i class="fas fa-users"></i></span>
                      <input type="text" placeholder="Organization" v-model="organization">
                  </div>
                  <div style="text-align: left;">
                      <button type="submit" class="btn">Register</button>
                  </div>
                  <div style="color: #fff">Have an account?
                      <a href="" @click.prevent="showLoginForm" class="register-link">Login here</a>
                  </div>
              </form>
          </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'RegisterPage',
    props: ['message'],
    data(){
        return{
            email: '',
            password: '',
            organization: 'Hacktiv8'
        }
    },
    methods: {
        clearField(){
            this.email = ''
            this.password = ''
        },
        register(){
            let user = {
                email: this.email,
                password: this.password,
                organization: this.organization
            }
            console.log(user);
            this.$emit('register', user)
            this.clearField()
        },
        showLoginForm(){
            this.$emit('showLoginForm')
            this.clearField()
        }
    }
}
</script>

<style>

</style>