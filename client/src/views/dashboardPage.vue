<template>
<div class="container-dashboard">
    <navbar @logOut="logOut"></navbar>
  <div class="container-inside">
    <!-- <addCategory @addCategory="addCategory"></addCategory> -->
    <cardBody
      v-for="task in taskData"
      :task="task"
      :key="task.id"
      @getId="getId"
      @getTaskId="getTaskId"
      @deleted="deleted"

    ></cardBody>
    <addTask @addTask="addTask"> </addTask>
    <editTask @editTask="editTask"></editTask>
  </div>
</div>
</template>

<script>
import axios from "../axios/axiosInstance";
import navbar from "../components/navbarCmp";
// import addCategory from "../components/addCat"
import addTask from "../components/addTask";
import cardBody from "../components/cardBody";
import editTask from "../components/editTask";
export default {
  name: "DashboardPage",
  components: {
    navbar,
    addTask,
    // addCategory,
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
    addCategory(payload){
      console.log(payload)
      axios
        .post(
          `/category`,payload,
          {
            headers:{
              access_token: localStorage.getItem("access_token"),
            }
          })
        .then(({ data }) => {
          // this.$emit('')
          console.log(data)
          this.$bvModal.hide("modal-3");
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
      deleted(id){
        this.$emit('deleted',id)
      }
  },
};
</script>

<style>
/* .container-dashboard{
  display: grid;
  grid-template-columns: repeat(4, 20%);
} */

.container-inside{
  display: grid;
  grid-template-columns: repeat(4, 20%);
  justify-content: space-evenly;
}
</style>
