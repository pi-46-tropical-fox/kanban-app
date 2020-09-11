<template>
<div class="container">
  <Loginpage 
  v-if="currentPage ==='Loginpage'" @loginSubmit = 'Login'>
  </Loginpage>
</div>

</template>

<script>
import axios from "axios";
import Loginpage from "./components/loginCmp";
export default {
  name: "accountForm",
  components: {
    Loginpage,
  },
  data() {
    return {
      currentPage : "Loginpage",
    };
  },
  
  methods: {
    Login(payload) {
      this.$emit('login', payload)
      console.log(this.currentPage)
      console.log(payload);
      axios({
        url: "http://localhost:4000/login",
        method: "POST",
        data: payload
      })
      .then(({data}) =>{
          console.log(data)
          localStorage.setItem("access_token", data.access_token)
          this.currentPage =  "Homepage"
      })
      .catch(err =>{
          console.log(err)
      })
    },
  },
};
</script>

<style></style>