<template>
    <div class="container"> 
      <div class="row">
        <form  @submit.prevent ="register">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-model="username">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" v-model="email"  aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            let payload = {
                username : this.username,
                email: this.email,
                password : this.password
            }
			axios({
			    url: '/register',
				method: "POST",
				data: payload
			})
			.then(({data})=> {
				this.$emit('changePage', 'loginPage')
			})
            this.username = '',
            this.email = '',
            this.password = ''
        }
    }
}
</script>

<style>

</style>