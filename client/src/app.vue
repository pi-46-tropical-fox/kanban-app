<template>
  <div class="container">
    <Accountpage v-if="currentPage === 'Loginpage'" @isLogin='isLogin' @getTask="getTask">
    </Accountpage>
    <Dashboard v-else-if ="currentPage === 'Dashboardpage'" @logOut='logOut'>
      
    </Dashboard>
  </div>
</template>

<script>
import axios from "./axios/axiosInstance";
import Accountpage from "./views/accountPage";
import Dashboard from "./views/dashboardPage";
export default {
  name: "App",
  components: {
    Accountpage,
    Dashboard,
  },
  data() {
    return {
      currentPage: "Loginpage",
      tasks : [],
    };
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.currentPage = "Dashboardpage"
      this.getTask()
    }else{
      this.currentPage = "Loginpage"
    }
  },
  methods: {
    isLogin(payload){
      this.currentPage = payload
    },
    getTask(){
      console.log('berhasil get data');
      
      axios
        .get('/task',{
          headers:{
            access_token : localStorage.getItem('access_token')
          }
        })
        .then(({data}) =>{
          this.tasks = data
          console.log(data)
        })
        .catch(err =>{
          console.log(err)
        })
        
    },
    logOut(payload){
      this.currentPage = payload
      this.tasks = []
    }
  },
};
</script>

<style></style>
