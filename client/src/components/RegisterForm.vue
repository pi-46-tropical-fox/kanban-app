<template>
    <div class = "container-fluid" id="register-container">
    <div class="container" id="register-form-container">
      
      <form v-on:submit.prevent="register">
        <div class="form-group" id="#error-register-form">
          <h1>Hello, there</h1>
          <small v-if="registerAlert">{{registerAlert}}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="email-register" aria-describedby="emailHelp" v-model="email">
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name-register" aria-describedby="emailHelp" v-model="name">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="password-register" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <div class="form-group" id="register-check">
          <p>Already have an account?</p> 
          <a v-on:click.prevent = "changePage" href="">Click here</a>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data(){
    return{
      email: "",
      name: "",
      password: ""
    }
  },

    props:[
    "registerAlert"
  ],

  methods:{
    register(){
      let payload = {
        email: this.email,
        name: this.name,
        password:this.password
      }
      // console.log(payload);
      this.$emit("registerSubmitFromComponent", payload)
      this.email = ""
      this.name = ""
      this.password = ""
    },

    changePage(){
      this.$emit("changeToLoginFromComponent",{})
    }
  }
}
</script>

<style>

</style>