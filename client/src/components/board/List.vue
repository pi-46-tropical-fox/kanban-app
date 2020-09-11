<template>
  <div class="card">
    <div class="card-header">
      <h4>{{ board.name }}</h4>
    </div>

    <div class="card-body my-4">
      <Task v-for="task in board.Tasks" :task="task" :key="task.id"></Task>

      <div v-if="taskFormVisible">
        <input v-model="name" type="text" placeholder="Enter new task..."/>
        <a href="#" @click.prevent="createTask" class="px-2 py-1 bg-green-200 rounded-md">Submit</a>
        <a href="#" @click.prevent="toggleTaskForm" class="px-2 py-1 bg-blue-200 rounded-md">Cancel</a>
      </div>
    </div>

    <div class="card-footer flex justify-between">
      <a
        href="#"
        @click.prevent="toggleTaskForm"
        class="px-2 py-1 bg-blue-200 rounded-md"
      >+ New Task</a>
      <a
        href="#"
        @click.prevent="confirmDelete('board', board.id)"
        class="bg-red-700 text-white py-1 px-2 rounded-md"
      >Delete Category</a>
    </div>
  </div>
</template>

<script>
import Task from "../task/List";

export default {
  name: "Board",
  components: {
    Task
  },
  props: {
    board: Object,
  },
  data() {
    return {
      name: "",
      taskFormVisible: false,
    };
  },
  methods: {
    toggleTaskForm() {
        this.name = ''
      this.taskFormVisible = !this.taskFormVisible
    },

    createTask() {
        let payload = {
          data: {
            name: this.name,
            BoardId: this.board.id
          },
          projectId: this.board.ProjectId
        }

        console.log(payload);

        this.name = ''

        this.$emit('createTask', payload)
    },

    confirmDelete(part, id) {
      this.$emit('confirmDelete', {part, id})
    }
  },
};
</script>

<style>
</style>