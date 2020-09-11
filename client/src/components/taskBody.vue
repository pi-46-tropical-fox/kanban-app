<template>
  <div class="col-3">
    <div class="card-header" style="text-align: center;color:#fff;">
      <h4>{{ category.name }}</h4>
    </div>
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
      <div class="card-header" style="text-align: center;">
        <b-button v-b-modal.modal-3 @click="getId">Add</b-button>
      </div>
    </div>
    
    <!-- task -->
    <task v-for="task in category.Tasks" :task="task" :key="task.id" @paramsId="paramsId" @fetchTask="fetchTask"></task>

  </div>
</template>

<script>
import task from "../components/task";
import addTask from "../components/addTask";
import editTask from '../components/editform'
export default {
  name: "taskBody",
  props: ["category"],
  components: {
    task,
    addTask,
    editTask
  },
  methods: {
    getId(){
        this.$emit('catId', this.category.id)
    },
    paramsId(task){
      this.$emit('paramsId',task)
    },
    fetchTask(){
      this.$emit('fetchTask')
    }
  },
};
</script>

<style></style>
