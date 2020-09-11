<template>
    <div>
        <LoginPage
         v-if="currentPage === 'loginPage'"
         :currentPage="currentPage"
         @loginSubmit="login">
         </LoginPage>
        <DashboardPage
            v-else-if="currentPage === 'dashboardPage'"
            :tasksData="tasks"
            @fetchTasks="fetchTasks"

        >
        </DashboardPage>
    </div>
</template>

<script>
// import component
import axios from './config/axios'
import LoginPage from './views/Login'
import DashboardPage from './views/Dashboard'
export default {
    name: 'KanbanApp',
  data() {
    return {
      message: 'Hello everyone!',
      currentPage: 'loginPage',
      tasks: []
    };
  },
  // daftarkan component
  components: {
    LoginPage,
    DashboardPage,
  },
  methods: {
      checkAuth() {
          if (localStorage.access_token) {
            this.currentPage = 'dashboardPage'
            this.fetchTasks()
          } else {
              this.currentPage = 'loginPage'
          }
      },
      login (payload) {
          axios({
              url: '/login',
              method: 'POST',
              data: payload
          })

          .then(({data}) => {
              this.currentPage = 'dashboardPage'
              localStorage.setItem('access_token', data.access_token)
              this.fetchTasks()
              console.log(data);
          })
          .catch(err => {
              console.log(err);
          })
      },
      fetchTasks () {
          axios({
              url: '/tasks',
              method: 'GET',
              headers: {
                  access_token: localStorage.access_token
              }
          })
          .then(({data}) => {
              this.tasks = data
              this.$emit('fetchTaks')
          })
          .catch(err => {
              console.log(err);
          })
      },
      
  },
  created () {
      this.checkAuth()
  }
};
</script>

<style scoped>
</style>