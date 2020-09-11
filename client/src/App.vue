<template>
  <div>
    <LoginPage 
    v-if="currentPage === 'loginPage'" 
    @loginSubmit="login">
    </LoginPage>
    <RegisterPage v-if="currentPage === 'registerPage'" @registerSubmit="register"></RegisterPage>
    <DashboardTask 
    v-if="currentPage === 'dashboardTask'"
    :tasksData="tasks"
    ></DashboardTask>
  </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './views/Login.vue'
import RegisterPage from './views/Register'
import DashboardTask from './views/DashboardTask'
export default {
  name: 'App', 
  data() {
    return {
      message: 'Hello world',
      currentPage: 'loginPage',
      tasks: [],
      category: [
        {
          name: 'Backlog'
        },
        {
          name: 'Todo' 
        },
        {
          name: 'Doing' 
        },
        {
          name: 'Done' 
        }
      ]
    };
  },
  components: {
      LoginPage,
      RegisterPage,
      DashboardTask
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.currentPage = 'dashboardTask'
        this.getTask()
      } else {
        this.currentPage = 'loginPage'
      }
    },
    login(payload) {
      axios({
        url: `/login`,
        method: 'POST',
        data: payload
      })
      .then(({data})=> {
        this.currentPage = 'dashboardTask'
        localStorage.setItem('access_token', data.access_token)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getTask() { 
      axios({
        url: `/1/task`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data})=> {
        console.log(data.task)
        this.tasks = data.tasks
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style scoped>
</style>