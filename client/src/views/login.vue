<template>
  <div>
    <!-- LOGIN -->
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Sign In</h5>
                <form @submit.prevent="submitLogin" class="form-signin">
                    <div class="form-label-group">
                        <input type="email" v-model="email" class="form-control" placeholder="Email address" required autofocus>
                        <label for="inputEmail">Email address</label>
                    </div>
                
                    <div class="form-label-group">
                        <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                        <label for="inputPassword">Password</label>
                    </div><br>
                
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <hr class="my-4">
                    <button v-google-signin-button="clientId" class="btn btn-lg btn-google btn-block text-uppercase"><i class="fab fa-google mr-2"></i> Continue with Google</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            clientId: '1060904979716-u2oc8jq86mdh8dmpi8sn234jb0lk9jqk.apps.googleusercontent.com'
        }
    },
    methods: {
        submitLogin() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem('access_token', data.access_token)
                    this.$emit('emitToPage', 'Dashboard')
                    this.$emit('emitIsLogin')
                })
                .catch((err) => {
                    console.log({err})
                    this.$emit('emitErrorHandler', {err})
                })
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken)
            // Receive the idToken and make your magic with the backend
            axios({
                method: "POST",
                url: 'http://localhost:3000/googleLogin',
                headers: {
                    google_access_token: idToken
                }
            })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem('access_token', data.access_token)
                    this.$emit('emitToPage', 'Dashboard')
                    this.$emit('emitIsLogin')
                })
                .catch(({err}) => {
                    this.$emit('emitErrorHandler', err)
                })

        },
        OnGoogleAuthFail (error) {
            console.log(error)
        }
    }
}
</script>

<style>
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