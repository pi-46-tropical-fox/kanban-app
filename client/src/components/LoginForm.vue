<template>
  <div class = "container-fluid" id="login-container">
    <div class="container" id="login-form-container">

      <form v-on:submit.prevent="login">
        <div class="form-group">
          <h1>Hi, again</h1>
          <small v-if="loginAlert">{{ loginAlert }}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div id= "login-check">
          <p>Don't have an account?</p> 
          <a v-on:click.prevent="changePage" href="">Click here</a>
        </div>

      </form>

    </div>
  
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data(){
    return{
      email : "",
      password:  ""
    }
  },
  props: ["loginAlert"],
  methods:{
    login(){
      let payload = {
        email: this.email,
        password: this.password
      }
      // console.log(payload);
      this.$emit("loginSubmitFromComponent", payload)
      this.email = ""
      this.password = ""
    },
    changePage(){
      this.$emit("changeToRegisterFromComponent",{})
    }

  },
}
</script>

<style>

</style>