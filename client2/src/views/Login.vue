<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=41" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="Login Form" class="mt-3">
              <div v-if="notification">{{notification}}</div>        
              <b-form  class="mt-2" @submit.prevent='loginSubmit'>
                <b-form-group label="Email address:" label-for="input-1" >
                  <b-form-input
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password:" label-for="input-2">
                  <b-form-input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter Password"
                  ></b-form-input>
                </b-form-group>
              <b-button type="submit" variant="primary">Login</b-button>
            </b-form>
            <div class="mt-3">
                <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
            </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from '../config/axios'
import GoogleSignInButton from 'vue-google-signin-button-directive'
export default {
    name : "login",
    directives: {
      GoogleSignInButton
    },
    data() {
        return {
            email : '',
            password : '',
            clientId: '960867991566-hn9pgba0rtsi09vvr30hq69fk2van0v9.apps.googleusercontent.com',
            notification: ''
            
        }
    },
    methods: {
        loginSubmit () {
            let payload = {
                email : this.email,
                password : this.password
            }

            axios({
                url: '/login',
                method: "POST",
                data : payload
            })
            .then( ({data}) => {
                // console.log(data.access_token)
                console.log(data)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('id', data.id)
                localStorage.setItem('name', data.name)
                localStorage.setItem( 'organization', data.organization)
                this.$emit('signIn') 
            })
            .catch( ({response}) => {
                console.log(response.data.errors)
                this.notification = response.data.errors.join(',')
            })
        },
        OnGoogleAuthSuccess (idToken) {
          console.log(idToken, 'token <<<<<<')
          axios({
            method: "POST",
            url: "/googleLogin",
            headers: {
            google_token: idToken
            }
        })
        .then(({data}) => {
            this.$emit('googleLogin', data)
        })
        
        },
        OnGoogleAuthFail (error) {
          console.log(error, 'error <<<<<<')
        },
        register () {
            this.$emit('register')
        },
        signIn () {
            this.$emit('signin')
        }
    }
}
</script>


<style>

</style>