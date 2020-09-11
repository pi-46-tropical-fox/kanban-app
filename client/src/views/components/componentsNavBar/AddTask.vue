<template>
  <form @submit.prevent="addTaskChild()">
  <div class="form-group">
    <label for="task-title">Title</label>
    <input type="text" v-model="title" class="form-control" id="task-title">
  </div>
  <div class="form-group">
    <label for="task-description">Description</label>
    <input type="text" v-model="description" class="form-control" id="task-description">
  </div>
  <button class="add-task-submit">Submit</button>
</form>
</template>

<script>
export default {
    name: "addTaskPage",
    data() {
        return {
            title: '',
            description: '',
            category: 'Back Log'
        }
    },
    methods: {
        addTaskChild() {
          let payload = {
            title: this.title,
            description: this.description,
            category: this.category
          }
          this.$emit("addTaskSubmit", payload)
        }
    }
}
</script>

<style>

</style>