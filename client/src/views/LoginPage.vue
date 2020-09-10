<template>
  <div class="container"> 
      <div class="row">
        <form  @submit.prevent ="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" v-model="username" id="exampleInputEmail1" aria-describedby="emailHelp">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
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
            let payload = {
                username : this.username,
                password : this.password
            }

            this.$emit('loginSubmit',payload)
        }
    }

}
</script>

<style>

</style>