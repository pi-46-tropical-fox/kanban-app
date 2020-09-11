<template>
  <div class="mb-2 p-2 bg-blue-100 shadow hover:shadow-md">
      <div class="card-header">{{ task.name }}</div>
      <div class="card-body">{{ task.description }}</div>
      <div class="card-footer">
          <!-- Add assignee(s) -->
          <!-- View comment(s) -->
          <!-- Move to -->
          <a href="#" class="bg-white rounded p-1 " @click="showMoveForm">Move to</a>
          <!-- Delete -->
          <a href="#" class="" @click="confirmDelete('task', task.id)">Delete</a>
      </div>
  </div>
</template>

<script>
import Move from './partials/Move'
import Delete from './partials/Delete'

export default {
  name: "Task",
  props: {
    task: Object
  },

  methods: {
    showMoveForm() {
      //
    },

    confirmDelete(part, id) {
      this.$emit('confirmDelete', {part, id})
    }
  }
}
</script>

<style>

</style>