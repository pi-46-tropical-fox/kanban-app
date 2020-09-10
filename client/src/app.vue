<template>
  <div>
    <AuthPage @login='submitLoginData' :currentPage="current"></AuthPage>
    <MainPage v-if="current != 'login' && current != 'register'"></MainPage>
  
  </div>
</template>

<script>
import axios from 'axios'
import AuthPage from './views/AuthPage'
import MainPage from './views/MainPage'
export default {
    name: 'App',
    data: function() {
        return {
          message: 'Hello world',
          current: 'login'
     };
    },
    components: {
      AuthPage,
      MainPage
  },
  methods:{
      submitLoginData (payload){
          this.current = 'dashboard';
          console.log(payload, '<<< ini dari parent')
          axios({
            url:'http://localhost:3000/login',
            method: 'POST',
            data:payload
          })
          .then(response => {
            localStorage.setItem('access_token', response.data.access_token)
          })
          .catch(err => {
            console.log('langsung error azioss')
            console.log(err)
          })
      }
  }
};
</script>

<style scoped>
</style>