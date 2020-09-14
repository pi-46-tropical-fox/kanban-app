<template>

    <RegisterForm
      v-on:registerSubmitFromComponent = "register"
      v-on:changeToLoginFromComponent = "changePage"
      :registerAlert = "registerAlert"> 
      
    </RegisterForm>


</template>

<script>
import RegisterForm from "../components/RegisterForm"

export default {
  name: "RegisterPage",

  data(){
    return {}
  },
  props:[
    "registerAlert"
  ],
  components:{
    RegisterForm
  },

  methods:{
    register(payload){
      this.$emit("registerSubmitFromView",payload)
    },

    changePage(){
      this.$emit("changeToLoginFromView",{})
    }
  }
}
</script>

<style>

</style>