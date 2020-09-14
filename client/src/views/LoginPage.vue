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
        <!-- LOGIN -->            
        <h4>Login</h4>
          <div id="errorLogin"></div>
          <div id="emailLogin">
            <form @submit.prevent="doLogin" id="login-submit">
              <div id="form-login" class="form-group">
                <label for="login-email">Email:</label>
                <input type="email" required v-model="form.email"
                  class="form-control" style="max-width:65%;" 
                  id="login-email" placeholder="Enter email" name="email"
                />
              </div>                
              <div class="form-group">
                <label for="login-password">Password:</label>
                <input type="password" required v-model="form.password"
                  class="form-control" style="max-width:65%;" 
                  id="login-password" placeholder="Enter password" 
                  name="password"
                />
              </div>

            <!-- ERROR HANDLER -->

              <p> 
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </p>
            </form>
          </div> 
          
            
              <button v-google-signin-button="clientId" 
              class="google-signin-button"> 
                Continue with Google
              </button>
            
          
          <p>
            Don't have an account? Click here to 
            <a href="#" @click.prevent="redirectToRegister" 
              id="register-not-have-button">
              register.
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
  name: "LoginPage",
  props: ['page'],
  components: {
    Navbar
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      clientId: '458646890960-stb8cuanu3geoqa3o1s38pitm1p4utad.apps.googleusercontent.com'
    }
  },
  methods: {
    
    doLogin() {
      // console.log('HIT');
      const clearField = () => {
        this.form.email = ''
        this.form.password = ''
      }
      this.$emit('login', {...this.form, clearField})
    },
    redirectToRegister() {
      this.$parent.redirectAuthPage()
    },
    OnGoogleAuthSuccess (idToken) {
    // console.log(idToken)
    // console.log('HIT');
    // Receive the idToken and make your 
    // magic with the backend
      const id_token = idToken
    // console.log(id_token, 'id_token client');

      axios ({
        url: `/googleLogin`,
        method: 'POST',
        headers: {
          id_token: id_token
        }
      })
        .then(response => {
          console.log(response);
          // console.log(response.data);
          console.log(response.data.name)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('access_token', response.data.access_token)
          console.log('User successfully signed in')
          // this.$emit('redirectToHomePage',localStorage.getItem.access_token)
          this.$parent.redirectToHomePage(localStorage.name)
        })

    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
    redirectToHome() {
      this.$parent.redirectToHomePage()
    },
  }
}
</script>

<style scoped>
  .google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

