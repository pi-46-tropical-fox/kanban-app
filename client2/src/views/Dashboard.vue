<template>
  <div>
      <div class="row mt-5 mb-5">
          <b-button v-b-modal.modal-prevent-closing>Add Task</b-button>
      </div>
      <div class="row">
        <TaskGroup
            class="col-2"
            v-for="category in categories"
            :category="category"
            :todos="todos"
            :categories='categories'
            :key="category.id"
            @deleteTask='deleteTask'
            @editTask='editTask'
        ></TaskGroup>
      </div>
      <addTask :categories="categories" @addTask='addTask'></addTask>
  </div>
</template>

<script>
import TaskGroup from '../components/TaskGroup'
import AddTask from '../components/AddTask'
export default {
    name: 'Dasboard', 
    props: ['categories' , 'todos'],
    components: {
        TaskGroup,
        AddTask
    },
    methods: {
        deleteTask () {
            this.$emit('deleteTask')
        },
        addTask () {
            this.$bvModal.hide('modal-prevent-closing')
            this.$emit('addTask')            
        },
        editTask(id) {
            this.$emit('editTask')
        }
    }    

}
</script>

<style>
.row {
    display: flex;
    justify-content: space-around;
}

</style>