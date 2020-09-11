<template>
  <div>
    <navbar @logOut="logOut"></navbar>
    <cardBody
      v-for="task in taskData"
      :task="task"
      :category="category"
      :key="task.id"
      @getId="getId"
      @getTaskId="getTaskId"

    ></cardBody>
    <addTask @addTask="addTask"> </addTask>
    <editTask @editTask="editTask"></editTask>
  </div>
</template>

<script>
import axios from "../axios/axiosInstance";
import navbar from "../components/navbarCmp";
import addTask from "../components/addTask";
import cardBody from "../components/cardBody";
import editTask from "../components/editTask";
export default {
  name: "DashboardPage",
  components: {
    navbar,
    addTask,
    cardBody,
    editTask
  },
  data() {
    return {
      id: null,
      task: null,
      taskId: null,
    };
  },
  props: ["taskData","catData"],
  methods: {
    logOut(payload) {
      localStorage.clear();
      this.$emit("logOut", payload);
    },
    editTask(payload){
        axios
            .put(`/task/${this.taskId}`,payload,
            {
                headers:{
                    access_token : localStorage.getItem("access_token")
                }
            })
            .then(({data}) =>{
                this.$bvModal.hide("modal-2")
                this.$emit('refetch')
            })
            .catch(err =>{
                console.log(err)
            })
    },
    addTask(payload) {
      console.log(payload);
      axios
        .post(
          `/task/${this.id}`,payload,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        )
        .then(({ data }) => {
          // this.$emit('')
          console.log(data)
          this.$bvModal.hide("modal-1");
          this.$emit('refetch')
        })
        .catch(err =>{
            console.log(err)
        })
    },
    getId(id) {
      this.id = id;
    },
    getTaskId(id) {
      this.taskId = id
    },
  },
};
</script>

<style></style>
