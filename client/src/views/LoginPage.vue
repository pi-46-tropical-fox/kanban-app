<template>

    <LoginForm 
      v-on:loginSubmitFromComponent = "login"
      v-on:changeToRegisterFromComponent = "changePage"
      :loginAlert = "loginAlert">

    </LoginForm>

</template>

<script>
import LoginForm from "../components/LoginForm"

export default {
  name: "LoginPage",
  data(){
    return{
      // loginError: ""
    }
  },
  props:[
    "loginAlert"
  ],
  components:{
    LoginForm
  },

  methods:{
    login(payload){
      // console.log(payload);
      this.$emit("loginSubmitFromView", payload)
    },
    changePage(){
      this.$emit("changeToRegisterFromView",{})
    }
  }
}
</script>

<style>

</style>