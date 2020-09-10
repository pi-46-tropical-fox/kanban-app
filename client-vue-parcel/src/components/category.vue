<template>
    <div class="col-sm" :id="category.toLowerCase()">
        <div class="category-title">
            <h3>{{category}}</h3>
        </div>
        <div class="category-task">
            <Task @delete="deleteTask" 
            @edit="edittask" 
            @moveTodo="moveTodo" 
            @moveBacklog="moveBacklog" 
            @moveDoing="moveDoing" 
            @moveDone="moveDone" 
            v-for="task in taskFilter" :key="task.id" :task="task">
            </Task>
        </div>
    </div>
</template>
<script>
import Task from './task'
export default {
    props: ['category', 'tasks'],
    components:{
        Task
    },
    computed: {
        taskFilter(){
            return this.tasks.filter(el => el.category === this.category.toLowerCase())
        }
    },
    methods: {
        deleteTask(id){this.$emit('delete',id)},
        edittask(id){this.$emit('edit',id)},
        moveTodo(id){this.$emit('moveTodo',id)},
        moveBacklog(id){this.$emit('moveBacklog',id)},
        moveDoing(id){this.$emit('moveDoing',id)},
        moveDone(id){this.$emit('moveDone',id)}
    },
}
</script>