<template>
    <div class="col-3">
    <div class="card">
        <div class="card-header">
            <div>{{category.name}}</div>
            <button v-on:click="addTask" class="btn btn-primary">Add</button>
        </div>
        <div class="container overflow-auto card-body" style="height: 40em;">
            <CardTask @moveTask="moveTask" @deleteTask="deleteTask" v-for="task in computedTasks" :key="task.id" :task="task" :categories="categories"></CardTask>
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
    props : ['category', 'tasks', 'categories'],
    methods : {
        moveTask(data){
            this.$emit('moveTask', data)
        },
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
