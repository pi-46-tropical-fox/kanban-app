<template>
    <div class="card col-3 mt-5" style="width: 15rem;" >
        <div>
            <nav class="navbar navbar-light category-title">
                <a class="navbar-brand" href="#">
                    <img src="../../assets/logo-kanban.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                    <h4 class="brand">{{category}}</h4>
                </a>
                <a href="#">
                <i @click='addTask' class="fas fa-plus-circle"></i>
                </a>
            </nav>
        </div>
        <div class="task-container">
            <Task 
            v-for="task in filteredTasks" 
            :key="task.id"
            :task="task">
            </Task>
        </div>
    </div>
</template>

<script>

import Task from '../components/Task'
export default {
name: 'TaskCategory',
data: function(){
    return {
        add:false
    }
},
components:{
    Task
},
methods:{
    addTask(){
        const text =  alertify.prompt('What are you up to?').set('modal', true)
                        .setting({
                            'onok': function(){
                                alertify.success('Sucessfully added task')
                            }
                        })
        const payload = {
            description: text.settings.value
        }
        const category = this.category;
        payload.category = category;
        this.$parent.$parent.addTask(payload)
    }
},
props:['category', 'tasks'],
computed: {
    filteredTasks(){
        return this.tasks.filter(el => el.category == this.category)
    }
}
}
</script>

<style>

</style>