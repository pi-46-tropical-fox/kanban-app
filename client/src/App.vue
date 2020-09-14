<template>
  <div id="app">
    <div>
      <div class="col-md-3 pt-3 toaster" 
      :style="{ display: toaster != null ? 'block' : 'none'}">
        <div class="alert alert-info" role="alert">
          {{ toaster }}
        </div>
      </div>
    </div>
    <div v-if="page.login">
      <LoginPage v-on:login="login" :host="host"></LoginPage>
    </div>
    <div v-if="page.register">
      <RegisterPage :register_data = register></RegisterPage>
    </div>
    <div v-if="page.home">
      <HomePage
        @logout="logout"
        :email="email"
        :name="name"
        :host="host"
        :toaster="toaster">
      </HomePage>
    </div>
  </div>
</template>


<script>
import axios from "./config/axios";
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import HomePage from "./views/HomePage";


export default {
  name: 'app',
  components: {
    RegisterPage,
    LoginPage,
    HomePage
  },
  data () {
    return {
      // host: 'http://localhost:4000',
      // host: 'https://afternoon-brushlands-38586.herokuapp.com/',
      toaster: null,
      email: '',
      page: {
        login: true,
        register: false,
        home: false
      },
      register: {
        form: {
          name: '',
          email: '',
          password: ''
        }
      }
      
    }
  },
  methods: {
    login(form) {
      const data = {
        email: form.email,
        password: form.password
      }
      // console.log(data);
      axios
        .post(`/login`, data)
        .then(response => {
          console.log('HIT');
          this.page.login = false
          this.page.home = true
          this.toaster = 'Login Successfully!'
          localStorage.access_token = response.data.access_token
          localStorage.name = response.data.name
          localStorage.id = response.data.id
          form.clearField()
          setTimeout(() => {
            this.toaster = null
          }, 2000)
        })
        
    },
    doRegister() {
      const data = { 
        name: this.register.form.name,
        email: this.register.form.email,
        password: this.register.form.password
      }

      axios
        .post(`/register`, data)
        .then(response => {

          // this.page.login = true
          this.page.register = false 
          this.page.home = false
          this.toaster = 'You have registered successfully!'

          setTimeout(() => {
            this.toaster =null
          }, 2000)
        })
        .catch(err => {
          console.log(err);
        })
      
    },
    logout() {
      localStorage.clear()
      this.page.login = true
      this.page.home = false
      this.toaster = 'You have logged out successfully!'

      setTimeout(() => {
        this.toaster = null
      }, 2000)
    },
     redirectToHomePage() {
       console.log('HIT');
       if (access_token) {
        console.log(this.page);
        this.page.login = false
        this.page.register = false 
        this.page.home = true
        }
    },
    redirectAuthPage() {
      console.log(this.page);
      this.page.login = this.page.login ? false : true
      this.page.register = this.page.register ? false : true
    },
    clearValidation: function(objectValidation) {
      for(let key in objectValidation) {
        objectValidation[key] = ''
      }
    },
    clearField: function(field) {
      for(let key in field) {
        field[key] = ''
      }
    }
  }, 
  mounted() {
    if (localStorage.access_token) {
      this.page.register = false
      this.page.login = false
      this.page.home = true
      this.email = localStorage.email
      this.name = localStorage.name
    }
  }
}
</script>
<style>

</style>