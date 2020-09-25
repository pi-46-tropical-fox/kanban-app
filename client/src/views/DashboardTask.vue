<template>
<div>
    <div class="container-kanban">
        <Category class="category"
        v-for="(category, i) in categoryData"
        :category="category"
        :tasksData="tasksData"
        :key="i"
        @addTask="addTask"
        @updateTask="update"
        @switchCategory="switchCategory"
        @deleteTask="deleteTask"
        >
        </Category>
    </div> 
</div>
</template>

<script>
import Category from '../components/Category'
export default {
  name: 'Dashboard Task',
  props: ['tasksData', 'categoryData'],
  components : {
    Category
  },
  methods: {
    addTask(data, id) {
      this.$emit('addTask', data, id)
    },
    update(data) {
      this.$emit('updateTask', data)
    },
    deleteTask(id) {
      this.$emit('deleteTask', id)
    },
    switchCategory(data) {
        this.$emit('switchCategory', data)
    }
  }
}
</script>

<style>

</style>