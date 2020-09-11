<template>
<div id="container">
    <!-- <div class="row">  -->
        <h1 class= "text-center mt-5 " v-if="currentPage === 'dashboardPage' ">{{ message }}</h1>
    <p class= "text-center "  v-if="currentPage === 'dashboardPage' ">{{ message2 }}</p>
    <!-- {{tasksData}} -->
    <!-- <CardTask 
    v-for="task in tasksData" 
    :task="task"
    :key="task.id"
    >
    </CardTask> -->
    <!-- </div> -->
    
    <div class="row">
        <CardStatus 
        v-for="(status,i) in statusesData" 
        :status="status"
        :tasksData="tasksData"        
        :key="i"
        ></CardStatus>
    </div>

</div>
 
</template>

<script>
import axios from '../config/axios.js'
import CardTask from '../components/CardTask'
import CardStatus from '../components/CardStatus'
export default {
    name: 'Dashboard',
    data () {
        return {
            message: 'Kanban Board',
            message2: 'Dashboard View',
            currentPage: 'dashboardPage',            
        };
    },
    props: ['tasksData', 'statusesData'],
    components : {
        CardTask,
        CardStatus
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
#card-text {
    font-size: 14px;
}

#container {
    overflow-x:auto
}


</style>