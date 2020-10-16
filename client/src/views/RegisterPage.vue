<template>
  <div >
    <Navbar></Navbar>
    <div class="login-body">
      <div class="col-md-6">
        <img
          src="../../assets/undraw_Scrum_board_re_wk7v.png"
          class="img-fluid animated fadeInLeftBig picture"
          alt
        />
      </div>

      <div  class="col right col-md-6">
        <!-- REGISTER -->
        <form  @submit.prevent="doRegister" id="register-submit">
          <h4>Register</h4>
          <div class="form-group">
            <label for="register-name">Name:</label>
            <input type="text" required v-model="register_data.form.name" 
              class="form-control" id="register-name" 
              style="max-width: 65%;" placeholder="Enter name" name="name"
            />              
          </div>

          <div class="form-group">
            <label for="register-email">Email:</label>
            <input type="email" required v-model="register_data.form.email" 
              class="form-control" id="register-email" 
              style="max-width: 65%;" placeholder="Enter email" name="email"
            />
          </div>
          <div class="form-group">
            <label for="register-password">
              Password:
            </label>
            <input type="password" v-model="register_data.form.password" 
              class="form-control" id="register-password" 
              style="max-width: 65%;" placeholder="Enter password" 
              name="password"
            />
          </div>

          <button  type="submit" class="btn btn-primary mb-2">Register</button>
        </form>

          <p>Already have an account? Click here to 
            <a href="#" id="login-have-button" 
              @click.prevent="redirectToLogin">
              login.
            </a>
          </p>
        
      </div>

    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import axios from "../config/axios"

export default {
  name: "RegisterPage",
  props: ['register_data', 'page'],
  components: {
    Navbar
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    doRegister() {
      this.$parent.doRegister()
    },
    redirectToLogin() {
      this.$parent.redirectAuthPage()
    }
  }
    
}
</script>

<style scoped>
  
</style>

