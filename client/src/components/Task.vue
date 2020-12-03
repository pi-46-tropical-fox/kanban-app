<template>
    <li class="list-group-item task">
        <!-- Move button -->
        <div class="arrow p-1">
            <a v-on:click="moveBack"  href="#" v-show="task.category !== 'Backlog'">
                <i class="fas fa-arrow-alt-circle-left"></i>
            </a>
            <a v-on:click="moveForward" href="#" v-show="task.category !== 'Completed'">
                <i class="fas fa-arrow-alt-circle-right"></i>
            </a>
        </div>
        <!-- Content -->
        <div class="mx-auto p-2">
            <p class="card-text">{{task.description}}</p>
            <small class="card-content">Created by: <span>{{task.User.email}}</span>
                <br>
                from: <span class="card-content">{{task.User.organization}}</span>
                <br>
                <small>{{task.createdAt}}</small>
            </small>
            <div class="action">
                <a  href="#">
                    <i v-on:click="deleteTask"  class="fas fa-trash-alt"></i>
                </a>
                <a  href="#">
                    <i v-on:click="editTask"  class="fas fa-user-edit"></i>
                </a>
            </div>
        </div>      
    </li>
</template>
<script>
export default {
name: 'Task',
props:['task'],
data: function(){
    return {
        editToggle: false
    }
},
methods:{
    deleteTask() {
        const {id} = this.task
        this.$parent.$parent.$parent.deleteTask(id)

    },
    editTask(payload){
        const userEmail = localStorage.getItem('userEmail')
        if(userEmail === this.task.User.email){
            let task = this;
            const text =  alertify.prompt('Have a change in mind?').set({title: 'KANBAN'}, {modal: 'true'})
            .setting({
                'onok': function(){
                    alertify.success('Sucessfully edited task')
                    const payload = {description: text.settings.value}
                    const {id} = task.task
                    task.$parent.$parent.$parent.editCurrentTask(payload, id)
                }
                })
        }else {
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