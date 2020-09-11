<template>
  <div class="container-fluid d-flex justify-content-sbetween col-12">
    <div class="col-3">
      <h3>{{ task.name }}</h3>
      <b-button v-b-modal.modal-1 @click="getId">Add Task</b-button>
      <cardTask v-for="datum in task.Tasks" :datum='datum' :key='datum.id' @getTaskId='getTaskId' :category="category"></cardTask>
    </div>
  </div>
</template>

<script>
import Dashboard from "../views/dashboardPage";
import cardTask from "../components/cardTask";


export default {
  name: "CardBody",
  props: ["task"],
  components: {
    cardTask,
  },
  methods:{
      getId(){
          this.$emit('getId', this.task.id)
      },
      getTaskId(id){
          console.log(id,"dari card body")
          this.$emit('getTaskId',id)
      }
  }
};
</script>

<style></style>
