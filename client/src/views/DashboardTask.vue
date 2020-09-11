<template>
<div>
    <div class="container-kanban">
        <Category class="category"
        v-for="(category, i) in categoryData"
        :category="category"
        :tasksData="tasksData"
        :key="i"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @userEmail="userEmail"
        >
        </Category>
    </div> 
</div>
</template>

<script>
import Category from '../components/Category'
export default {
  name: 'Dashboard Task',
  props: ['tasksData', 'categoryData', 'userEmail'],
  components : {
    Category
  },
  methods: {
    addTask(data, id) {
      this.$emit('addTask', data, id)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    }
  }
}
</script>

<style>

</style>