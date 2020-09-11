<template>
  <div>
      <!-- Login Page -->
      <LoginPage 
        v-if="currentPage === 'LoginPage'"
        @changePage="changePage"
      ></LoginPage>

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
import axios from './config/axios'
export default {
  data() {
    return {
      currentPage: 'LoginPage',
    };
  },
  components: {
      LoginPage,
      DashboardPage
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
          this.currentPage = 'LoginPage'
      }
  },
};
</script>

<style scoped>
</style>