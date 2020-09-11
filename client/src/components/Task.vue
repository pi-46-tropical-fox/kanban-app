<template>
    <li class="list-group-item task">
        <!-- Move button -->
        <div class="arrow p-1">
            <a v-on:click="moveBack"  href="#" v-show="task.category !== 'Backlog'">
                <i class="fas fa-arrow-alt-circle-left"></i>
            </a>
            <a v-on:click="moveForward" href="#" v-if="task.category !== 'Completed'">
                <i class="fas fa-arrow-alt-circle-right"></i>
            </a>
        </div>
        <!-- Content -->
        <div class="mx-auto p-3">
            <p v-if="!editToggle" class="card-text">{{task.description}}</p>
            <editForm v-else></editForm>
            <small class="card-username text-muted">Created by: <span>{{task.User.email}}</span>
            <br>
            from: <span>{{task.User.organization}}</span>
            <br>
            <small v-text="createdTime"></small>
                <a v-on:click="deleteTask" href="#">
                <span>Delete</span>
            </a>
            <a v-on:click="editTask" href="#">
                <span>Edit</span>
            </a>
            </small>
        </div>      
    </li>
</template>
<script>
import editForm from '../components/editForm'
export default {
name: 'Task',
props:['task'],
data: function(){
    return {
        editToggle: false,
        createdTime : this.task.createdAt.toISOString().substring(0, 10)
    }
},
components:{
    editForm
},
methods:{
    deleteTask() {
        const {id} = this.task
        this.$parent.$parent.$parent.deleteTask(id)

    },
    editTask(payload){
        const userEmail = localStorage.getItem('userEmail')
        if(userEmail === this.task.User.email){
            this.editToggle = !this.editToggle
            const {id} = this.task
            this.$parent.$parent.$parent.editCurrentTask(payload, id)
        } else {
            alertify.error('User is not authorized')
        }

    },
    moveForward(){
        const userEmail = localStorage.getItem('userEmail')
        if(userEmail === this.task.User.email){
        const payload = {
            category: this.task.category,
            id: this.task.id,
            action: 'forward'
        }
        this.$parent.$parent.$parent.move(payload)
        } else {
            alertify.error('User is not authorized')
        }
    },
    moveBack(){
        const userEmail = localStorage.getItem('userEmail')
        if(userEmail === this.task.User.email){
        const payload = {
            category: this.task.category,
            id: this.task.id,
            action: 'backward'
        }
        this.$parent.$parent.$parent.move(payload)
        } else {
            alertify.error('User is not authorized')
        }
    }
 }
}
</script>

<style>

</style>