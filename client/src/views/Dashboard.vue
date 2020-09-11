<template>
  <div>
    <Navbar @signOut="signOut"></Navbar>
    <div class="container">
      <div class="row mt-5">
        <CardBody
          v-for="tasks in tasksData"
          :tasks="tasks"
          :key="tasks.id"
          @getId="getId"
          @getTaskId='getTaskId'
          @fetchTasks='fetchTasks'
        />
      </div>
    </div>
    <AddTask @tasksSubmit="tasksSubmit"></AddTask>
    <EditTask @tasksEdit="tasksEdit" :task="task"></EditTask>
  </div>
</template>

<script>
import CardBody from "../components/CardBody";
import Navbar from "../components/Navbar";
import AddTask from "../components/AddTask";
import axios from "../config/axios";
import EditTask from "../components/EditTask"
export default {
  name: "Dashboard",
  props: ["tasksData"],
  components: {
    CardBody,
    Navbar,
    AddTask,
    EditTask
  },
  data() {
    return {
      id: null,
      task: null,
      taskId: null
    }
  },
  methods: {
    tasksSubmit(payload) {
      axios({
        method: "POST",
        url: `/tasks/${this.id}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload,
      }).then((data) => {
        this.$emit("fetchTasks");
        this.$bvModal.hide("modal-1");
      });
    },
    getId(id) {
      this.id = id;
    },
    getTaskId(task) {
      this.task = task
      this.taskId = task.id
    },
    tasksEdit(payload) {
      axios({
        method: "PUT",
        url: `/tasks/${this.taskId}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload,
      })
      .then(data => {
        this.$emit('fetchTasks')
        this.$bvModal.hide('modal-2')
      })
    },
    fetchTasks() {
      this.$emit('fetchTasks')
    },
    signOut() {
      localStorage.clear()
    }
  },
};
</script>

<style></style>
