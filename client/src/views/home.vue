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
            <a class="nav-link" href="#" @click="logout">Logout</a>
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
    <editforward :task="task" @editforward="forward"></editforward>
    <editback :task="task" @editBack="back"></editback>
  </div> 
</template>

<script>
import taskBody from "../components/taskBody";
import addTask from '../components/addTask'
import editTask from '../components/editform'
import editback from '../components/editBack'
import editforward from '../components/editForward'
import Axios from '../config/axios';
export default {
  name: "home",
  props: ["categories"],
  components: {
    taskBody,
    addTask,
    editTask,
    editback,
    editforward
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
              url:`/tasks/${this.id}`,
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
            this.fetchTask()
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
          url:`/tasks/${this.taskId}`,
          method:'PUT',
          data:{title : task},
          headers:{
            access_token:localStorage.getItem('access_token')
          }
        })
        .then(data=>{
          this.$bvModal.hide("modal-2")
            this.fetchTask()
        })
        .catch(err=>{
          console.log(err)
        })
      },
      fetchTask(){
        this.$emit('fetchTask')
      },
      logout(){
        this.$emit('logout')
      },
      back(task){
        if (task.CategoryId === 1){
          this.$bvModal.hide("modal-9")
        }else{
          Axios({
          url:`/tasks/${task.id}`,
          method:'PATCH',
          data:{
            CategoryId:task.CategoryId - 1
          },
          headers:{
            access_token:localStorage.getItem('access_token')
          }
        })
        .then(data=>{
          console.log(data)
          this.fetchTask()
          this.$bvModal.hide("modal-9")
        })
        .catch(err=>{
          console.log(err)
        })
        }
        
      },
      forward(task){
        if (task.CategoryId === 4){
          this.$bvModal.hide("modal-10")
        }else{
          Axios({
          url:`/tasks/${task.id}`,
          method:'PATCH',
          data:{
            CategoryId:task.CategoryId + 1
          },
          headers:{
            access_token:localStorage.getItem('access_token')
          }
        })
        .then(data=>{
          console.log(data)
          this.fetchTask()
          this.$bvModal.hide("modal-10")
        })
        .catch(err=>{
          console.log(err)
        })
        }
        
      }
  },
};
</script>

<style scoped></style>
