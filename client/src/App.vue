<template>
    <div class="container">
        <h1 class= "text-center mt-5 " v-if="currentPage === 'loginPage' || currentPage === 'registerPage' ">{{ message }}</h1>
        <p class= "text-center "  v-if="currentPage === 'loginPage' || currentPage === 'registerPage' ">{{ message2 }}</p>
        <AuthPage
            v-if="currentPage === 'loginPage'"
        >
        </AuthPage>
        <DashboardPage
            v-if="currentPage === 'dashboardPage'"
            v-bind:tasksData="tasks"
            v-bind:statusesData="statuses"
        >
        </DashboardPage>
    </div>
  
</template>

<script>
import axios from './config/axios.js'
import AuthPage from './views/Auth'
import DashboardPage from './views/Dashboard'
export default {
    name: 'App',
    data() {
        return {
            message: 'Kanban Board App',
            message2: 'Manage your project easily',
            // currentPage: 'loginPage',
            currentPage: 'registerPage',
            tasks: [],
            statuses: [
                {   
                    id: 1,
                    status: "BackLog",
                    backgroundColor: 'bg-primary'
                },
                {   
                    id: 2,
                    status: "To Do",
                    backgroundColor: 'bg-primary'
                },
                {   
                    id: 3,
                    status: "Doing",
                    backgroundColor: 'bg-primary'
                },
                {   
                    id: 5,
                    status: "Done",
                    backgroundColor: 'bg-primary'
                },

            ]
        };
    },
    components: {
        AuthPage,
        DashboardPage,
    },
    methods: {
        
        fetchTasks () {
            axios ({
              url: "/tasks",
              method: 'GET',
              headers: {
                  access_token: localStorage.access_token
                }
            })

            .then (({data}) => {
                console.log (data)
                this.tasks = data

            })
            .catch  (err => {
                console.log (err)
            })

        },

        
    },

    created () {
        if (localStorage.access_token) {
              this.currentPage = 'dashboardPage'
              this.fetchTasks ()
              
            } else {
              this.currentPage = 'loginPage'
            }
    }
    
};
</script>

<style>

</style>