<template>
  <div class="col-3">
    <div class="card rounded shadow">
      <div class="card-header text-white" id="header-card">
        <b-button v-b-modal.modal-1 @click="getId">Add</b-button>
        <h4>{{ tasks.name }}</h4>
      </div>
      <CardTask v-for="value in tasks.Tasks" :value="value" :key="value.id" @getTaskId="getTaskId" @fetchTasks='fetchTasks'>
      </CardTask>
    </div>
  </div>

</template>

<script>
import CardTask from "./CardTask";
export default {
  name: "CardBody",
  props: ["tasks"],
  components: {
    CardTask,
  },
  methods: {
    getId() {
      this.$emit('getId', this.tasks.id)
    },
    getTaskId(task) {
      this.$emit('getTaskId', task)
    },
    fetchTasks() {
      this.$emit('fetchTasks')
    }
  }
};
</script>

<style>
#header-card {
  background: #5800d1;
}
</style>
