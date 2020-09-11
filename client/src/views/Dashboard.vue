<template>
<div>
    <h1 class= "text-center mt-5 " v-if="currentPage === 'dashboardPage' ">{{ message }}</h1>
    <p class= "text-center "  v-if="currentPage === 'dashboardPage' ">{{ message2 }}</p>
    {{tasksData}}
</div>
  
</template>

<script>
import axios from '../config/axios.js'
export default {
    name: 'Dashboard',
    data () {
        return {
            message: 'Kanban Board',
            message2: 'Dashboard View',
            currentPage: 'dashboardPage',
            
        };
    },
    props: ['tasksData'],
    components : {

    },
    methods : {
        fetchTasks () {
            axios ({
              url: "/tasks",
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
    }

}
</script>

<style scoped>

</style>