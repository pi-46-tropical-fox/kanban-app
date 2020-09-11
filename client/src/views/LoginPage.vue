<template>
  <div class="container"> 
      <div class="row">
        <form  @submit.prevent ="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-model="username">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
            <button v-google-signin-button="clientId" class="g-signin2"> Continue with Google</button>
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
          console.log('masuk');
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
                console.log('login success');					
                this.$emit('changePage', 'dashBoardPage')
                localStorage.setItem('access_token',data.access_token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('UserId', data.id)
                this.$emit('changePage', 'dashBoardPage')
              })
            this.username = '',
            this.password = ''
        },
        OnGoogleAuthSuccess (idToken) {
          var google_id_token = idToken;
          axios({
            method: 'POST',
            url: '/googleLogin',
            headers: {google_id_token}
          })
          .then(({data})=> {
            console.log('yang ini ya',data);
                localStorage.setItem('access_token',data.access_token)
                localStorage.setItem('username', data.username)
                localStorage.setItem('UserId', data.id)
                this.$emit('changePage', 'dashBoardPage')
          })
        },
        OnGoogleAuthFail (error) {
          console.log(error)
      }
    }

}
</script>

<style>
/* .google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
} */
</style>