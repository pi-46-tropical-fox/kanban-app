<template>
<div>
  <AuthPage @login='submitLoginData' :currentPage="current"></AuthPage>
  <MainPage
  @logout="logout" 
  v-if="current != 'login' && current != 'register'"  
  :tasks="task">
  </MainPage>

</div>
</template>

<script>
import axios from './config/axios'
import AuthPage from './views/AuthPage'
import MainPage from './views/MainPage'
export default {
  name: 'App',
  data: function() {
      return {
        message: 'Hello world',
        current: 'login',
        task: []
  };
  },
  components: {
    AuthPage,
    MainPage
},
methods:{
  checkAuth(){
    if(localStorage.getItem('access_token')){
      this.current = 'dashboard';
      this.fetchTasks()
    } else {
      this.current='login'
    }
  },
  submitLoginData (payload){
        axios({
          url:'/login',
          method: 'POST',
          data:payload
        })
        .then(response => {
          this.current = 'dashboard'; 
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('userEmail', response.data.email)
          this.fetchTasks()
        })
        .catch(err => {
          console.log(err)
        })
    },
  fetchTasks(){
    axios({
      url:'/task',
      method: 'GET',
      headers:{
        access_token: localStorage.getItem('access_token')
      }
    })
    .then(response => {
      console.log(response)
      this.task = response.data.tasks
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteTask(id){
    axios({
      url:`/task/${id}`,
      method: 'DELETE',
      headers:{
        access_token: localStorage.getItem('access_token')
      }
    })
    .then(response => {
      console.log(response);
      this.fetchTasks()
    })
    .catch(err => {
      alertify.error('User is not authorized')
    })
  },
  logout(){
    localStorage.clear();
    this.checkAuth()
  },
  addTask(payload){
    console.log(payload, '<<< bentuk payload dari app.vue')
    axios({
      method: 'POST',
      url: '/task',
      data: payload,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
    })
    .then(response => {
      this.fetchTasks()
      console.log('Success')
    })
    .catch(err => {
      console.log(err)
    })
  },
  editCurrentTask(payload, id) {
    axios({
      method: 'PATCH',
      url: `/task/${id}`,
      data: payload,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
    })
    .then(response => {
      this.fetchTasks()
      console.log('Success')
    })
    .catch(err => {
      console.log(err)
    })
  },
  move(payload){
    const {id} = payload
    axios({
      method: 'PUT',
      url: `/task/${id}`,
      data: payload,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
    })
    .then(response => {
      console.log(response)
      this.fetchTasks()
      console.log('Success move data')
    })
    .catch(err => {
      console.log(err)
    })
  }

},
created(){
  this.checkAuth()
}
};
</script>

<style scoped>
</style>