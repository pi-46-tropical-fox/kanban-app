<template>
  <div class="container"> 
      <div class="row">
        <form  @submit.prevent ="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-model="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
             <button v-google-signin-button="clientId" class="ml-3 google-signin-button g-signin2"></button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
            clientId: '20286266958-b0t0r7502651bmvrvl98dfab8gkq97l1.apps.googleusercontent.com'
        }
    },
    methods: {
        login() {
            let payload = {
                username : this.username,
                password : this.password
            }
            axios({
                url: '/login',
                method: "POST",
                data: payload
              })
              .then(({data})=> {	
                localStorage.setItem('access_token',data.access_token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('UserId', data.id)
                this.$emit('changePage', 'dashBoardPage')
              })
            this.username = '',
            this.password = ''
        },
        OnGoogleAuthSuccess (idToken) {
          var google_id_token = idToken
          
          axios({
            method: 'POST',
            url: '/googleLogin',
            headers: {google_id_token}
          })
          .then(({data})=> {
            localStorage.setItem('access_token',data.access_token)
            localStorage.setItem('username', data.username)
            localStorage.setItem('UserId', data.id)
            this.$emit('changePage', 'dashBoardPage')
          })
        },
      OnGoogleAuthFail (error) {
          console.log(error)
      }
    },
    created() {
    }

}
</script>

<style>
.google-signin-button {
  color: transparent !important;
  background-color: transparent !important;
  height: 50px;
  font-size: 16px;
  border-color: #f8f9fa!important;
  padding: 10px 20px 25px 20px;
}
</style>