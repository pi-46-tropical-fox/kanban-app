<template>
<div class= mr-5>
  <b-card
    class="task-group"
    border-variant="primary"
    :header="category.category"
    header-bg-variant="primary"
    header-text-variant="white"
    align="center"
    >
    <Task
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      :categories='categories'
      @deleteTask='deleteTask'
      @editTask='editTask'
    ></Task>  
  </b-card>
</div>
</template>

<script>
import Task from './Task'

export default {
    name: 'TaskGroup',
    props: ['category','todos', 'categories'],
    components : {
        Task
        
    },
    computed : {
        filteredTodos() {
            return this.todos.filter(el => el.CategoryId === this.category.id )
        }
    },
    methods: {
        deleteTask () {
            this.$emit('deleteTask')
        },
        editTask(id) {
            this.$emit('editTask')
        }
    }
}
</script>
<style>
.task-group {
    overflow: auto;
    height: 700px;
}
</style>