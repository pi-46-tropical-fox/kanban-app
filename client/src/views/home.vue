<template>
  <div
    class="container-fluid d-flex justify-content-between"
    style="width: 100vw;background-color: black;"
  >
    <div class="col-2" style="height: 100vh;background-color: black">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-column"
        style="height: 100vh;"
      >
        <a class="navbar-brand" href="#" id="kanBan">KanBan</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div class="navbar-nav d-flex flex-column">
            <a class="nav-link active" href="#"
              >Home<span class="sr-only">(current)</span></a
            >
            <a class="nav-link" href="#">Logout</a>
          </div>
        </div>
      </nav>
    </div>
    <div class="container-fluid d-flex justify-content-between col-9">
      <!-- card task -->
      <taskBody
        v-for="category in categories"
        :category="category"
        :key="category.id"
        @catId="catId"
        @paramsId="paramsId"
        @fetchTask="fetchTask"
      ></taskBody>
    </div>
    <addTask @add="add"></addTask>
    <editTask :task="task" @edit="edit"></editTask>
  </div>
</template>

<script>
import taskBody from "../components/taskBody";
import addTask from '../components/addTask'
import editTask from '../components/editform'
import Axios from 'axios';
export default {
  name: "home",
  props: ["categories"],
  components: {
    taskBody,
    addTask,
    editTask
  },
  data() {
    return {
      id: null,
      taskId:null,
      task:null
    };
  },
  methods: {
    catId(value){
      this.id = value
    },

      add(payload){
          Axios({
              url:`http://localhost:3000/tasks/${this.id}`,
              method:'POST',
              data:{
                title:payload
              },
              headers:{
                access_token:localStorage.getItem('access_token')
              }
          })
          .then(data=>{
            this.$bvModal.hide("modal-3")
            this.$emit('fetch')
          })
          .catch(err=>{
            console.log(err)
          })

      },

      paramsId(task){
        this.taskId = task.id
        this.task = task
      },
      
      edit(task){
        console.log(task)
        Axios({
          url:`http://localhost:3000/tasks/${this.taskId}`,
          method:'PUT',
          data:{title : task},
          headers:{
            access_token:localStorage.getItem('access_token')
          }
        })
        .then(data=>{
          this.$bvModal.hide("modal-2")
            this.$emit('fetch')
        })
        .catch(err=>{
          console.log(err)
        })
      },
      fetchTask(){
        this.$emit('fetchTask')
      }
  },
};
</script>

<style scoped></style>
