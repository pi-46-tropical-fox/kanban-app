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
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
            password: ''
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
              })
              .catch(err=> {
                console.log(err);
              })
            this.username = '',
            this.password = ''
        }
    }

}
</script>

<style>

</style>