<template>
  <div>
        <!---->
        <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
            <div class="card-header"  style="text-align: center;">
                <b-button v-b-modal.modal-2 @click="taskId">Edit</b-button>
                <b-button v-b-modal.modal-1 @click="deleteId">Delete</b-button>
            </div>
                <div class="card-body" style="text-align: center;">
                    <h5 class="card-title">{{task.title}}</h5>
                    <p class="card-text">{{task.User.email.split('@')[0]}}</p>
                    
                </div>
            </div>
        <!---->
        </div>
</template>

<script>
import Axios from 'axios'
export default {
    name:'task',
    props:[
        'task'
    ],
    methods:{
        taskId(){
            console.log(this.task.id," <<<<task ID")
            this.$emit("paramsId",this.task)
        },
        deleteId(){
            Axios({
                url:`http://localhost:3000/tasks/${this.task.id}`,
                method:'DELETE',
                headers:{
                    access_token:localStorage.getItem('access_token')
                }
            })
            .then(data=>{
                console.log('success')
                this.fetchTask()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        fetchTask(){
            this.$emit('fetchTask')
        }
    }
}
</script>

<style>

</style>