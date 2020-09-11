<template>
    <div class="container">
        <h1 class= "text-center" v-if="currentPage === 'loginPage' || currentPage === 'registerPage' ">{{ message }}</h1>
        <p class= "text-center"  v-if="currentPage === 'loginPage' || currentPage === 'registerPage' ">{{ message2 }}</p>
        <AuthPage
            v-if="currentPage === 'loginPage'"
        >
        </AuthPage>
        <DashboardPage
            v-if="currentPage === 'dashboardPage'"
            v-bind:tasksData="tasks"
        >
        </DashboardPage>
    </div>
  
</template>

<script>
import axios from './config/axios.js'
import AuthPage from './views/Auth'
import DashboardPage from './views/Dashboard'
export default {
  data() {
    return {
        message: 'Kanban Board App',
        message2: 'Manage your project easily',
        currentPage: 'loginPage',
        // currentPage: 'registerPage',
      tasks: []
    };
  },
  components: {
      AuthPage,
      DashboardPage,

  },
  methods: {
        
        fetchTasks () {
            axios ({
              url: "/tasks/",
              method: 'GET',
              headers: {
                  access_token: localStorage.access_token
                }
            })

            .then (({data}) => {
                console.log (data.tasks)
                this.tasks = data.tasks

            })
            .catch  (err => {
                console.log (err)
            })

        },

        created () {
            this.checkAuth ()
        }
    },
    
};
</script>

<style scoped>
</style>