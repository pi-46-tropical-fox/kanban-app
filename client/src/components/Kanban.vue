<template>
  <div class="container-fluid" id= "kanban-page">

  
  <nav class="navbar navbar-expand-lg navbar-light">
      <!-- <a class="navbar-brand" href="#"><img src="./assets/logo/23e0fcdb-3a67-4302-b1af-6f3792d53aa3_200x200.png" alt=""></a> -->
      <span class="navbar-brand mb-0 h1">KanBran</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">


          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>

      </div>
      

  </nav>
  <div class="kanban-erorr" v-if="kanbanPageAlert">{{kanbanPageAlert}}</div>
  <div class = "container-fluid" id="kanban-container">
    
    <div id="left-menu-bar">
      <button type="button" class="btn btn-primary btn-lg" v-on:click.prevent="addCategoryToggle">+</button>
    </div>
    <div class = "category-container" v-show="isAddCategory">
      <div class="category-container-header">
        <input type="text" v-model="categoryName">
        <button type="button" class="btn btn-primary btn-sl" v-on:click.prevent="addCategory">Add</button>
      </div>
      <div class= "category-container-body">
      </div>
    </div>


    
    <div class = "category-container" 
      v-for="(category) in categoriesData" 
      :key="category.id"
      :category_id = "category.id"
      @dragover.prevent 
      @dragenter.prevent 
      @drop.prevent="dropEvent">

      <div class="category-container-header">
        <h2>{{category.name}}</h2>
      </div>
      <div class= "category-container-body" >
        <KanbanBody
          v-on:editTaskTitle="edit"
          v-for="task in tasksData.filter((el) => el.CategoryId == category.id)"
          :key="task.id"
          :task_id="task.id"
          :task="task"
      
          v-on:submitDeleteTask= "deleteTask"

          @dragover.prevent @dragenter.prevent
          >
        </KanbanBody>


        <KanbanAddTaskForm 
          :key="category.id"
          :categoryId="category.id"
          v-on:submitAddTask="addTask"
          v-on:submitDeleteCategory="deleteCategory"
          >
        </KanbanAddTaskForm>
      </div>
    </div>


    
  </div>
</div>
</template>

<script>
import KanbanBody from "./KanbanBody"
import KanbanAddTaskForm from "./KanbanAddTaskForm"


export default {
  inheritAttrs: "false",
  name: "KanbanPage",
  data(){
    return {
      categoryName: "",
      isAddCategory : false
      
    }
  },
  props:[
    "categoriesData",
    "tasksData",
    "kanbanPageAlert"
  ],

  components:{
    KanbanBody,
    KanbanAddTaskForm
  },

  computed:{
    // filteredTasks(){
    //   // console.log(this.categoryId);
    //   return this.tasksData.filter((el) =>  el.CategoryId == this.category.id)

    // }
  },
  methods:{
    logout(){
      this.$emit("logout",{})
    },
    dropEvent(e){
      let taskId = e.dataTransfer.getData("task_id")
      let CategoryId = e.path[4].getAttribute("category_id");
      let payload ={
        id: taskId,
        CategoryId
      }
      // console.log(payload);
      if(CategoryId){
        this.$emit("submitEditTaskCategory", payload);
      }
    },
    addCategoryToggle(){
      if(this.isAddCategory){
        this.isAddCategory = false
      }
      else{
        this.isAddCategory = true
      }
    },
    addCategory(){
      let payload= {
        name: this.categoryName
      }
      // console.log(payload, "dari kanban");
      this.$emit("submitAddCategory", payload)
    },
    deleteCategory(payload){
      this.$emit("submitDeleteCategory", payload)

    },
    edit(payload){
      this.$emit("editTaskTitle", payload)
    },

    addTask(payload){
      this.$emit("submitAddTask", payload)
    },
    deleteTask(payload){
      this.$emit("submitDeleteTask", payload)
    },
  }
}
</script>

<style>

</style>