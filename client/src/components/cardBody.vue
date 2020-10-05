<template>
  <div class="container-body">
    <div class="col-3">
      <h3>{{ task.name }}</h3>
      <b-button v-b-modal.modal-1 @click.prevent="getId">Add Task</b-button>
      <cardTask
        v-for="datum in task.Tasks"
        :datum="datum"
        :key="datum.id"
        @getTaskId="getTaskId"
        @deleted="deleted"
      ></cardTask>
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
  methods: {
    getId() {
      this.$emit("getId", this.task.id);
    },
    getTaskId(id) {
      console.log(id, "dari card body");
      this.$emit("getTaskId", id);
    },
    deleted(id){
        this.$emit('deleted',id)
      }
  },
};
</script>

<style></style>
