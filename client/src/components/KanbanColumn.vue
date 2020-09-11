<template>
    <div class="col-sm">
    <div class="card">
        <div class="p-4 flex justify-between ">
            <div>{{category.name}}</div>
            <button v-on:click="addTask" class="btn btn-primary">Add</button>
        </div>
        <div class="container">
            <CardTask @deleteTask="deleteTask" v-for="task in computedTasks" :key="task.id" :task="task"></CardTask>
            <p v-if="computedTasks.length == 0">No tasks here...</p>
        </div>
    </div>
    </div>
</template>

<script>
import CardTask from './CardTask'
import _ from 'lodash'

export default {
    name : 'KanbanColumn',
    props : ['category', 'tasks'],
    methods : {
        addTask(){
            this.$emit('addTask', this.category)
        },
        deleteTask(data){
            this.$emit('deleteTask', data)
        }
    },
    components : {
        CardTask
    },
    computed : {
        computedTasks: function(){
            return _.sortBy(this.tasks.filter(e => e.TaskCategory.id === this.category.id), ['createdAt']) 
        }
    }
}
</script>
