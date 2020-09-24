<template>
  <div>
      <!-- Login Page -->
      <LoginPage 
        v-if="currentPage === 'LoginPage'"
        @changePage="changePage"
      ></LoginPage>

      <!-- Register Page -->
      <Register 
        v-else-if="currentPage === 'RegisterPage'"
        @changePage="changePage"
      ></Register>

      <!-- Dashboard -->
      <DashboardPage 
      v-else-if="currentPage === 'DashboardPage'"
      @changePage="changePage"
      ></DashboardPage>
  </div>
</template>

<script>
import LoginPage from './views/Login'
import DashboardPage from './views/Dashboard'
import Register from './views/Register'
import axios from './config/axios'
export default {
  data() {
    return {
      currentPage: 'LoginPage',
    };
  },
  components: {
      LoginPage,
      DashboardPage,
      Register
  },
  methods: {
    changePage(page){
        this.currentPage = page
    }
  },
  created(){
      if(localStorage.getItem("access_token")){
          this.currentPage = 'DashboardPage'
      } else {
          if(localStorage.getItem("current_page") === "register"){
            this.currentPage = 'RegisterPage'
          } else {
            this.currentPage = 'LoginPage'
          }
      }
  },
};
</script>

<style scoped>
</style>