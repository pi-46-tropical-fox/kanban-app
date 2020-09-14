<template>
  <div>
    <div class="kanban-card-edit" v-show="isAdd">
      <div class="kanban-content">
        <input type="text" v-model="title" >
      </div>
      <div class = "kanban-content-button">
        <button type="button" class="btn btn-primary btn-sm" v-on:click.prevent="addTask" >Submit</button>  
      </div>
    </div>

    
    <div class="category-button" >
      <button type="button" class="btn btn-primary" v-on:click.prevent="isAdd=true">
          Add Task
      </button>
      <button type="button" class="btn btn-primary" v-on:click.prevent="deleteCategory">
          Delete Category     
      </button>
      <button type="button" class="btn btn-primary" v-on:click.prevent="" 
          @dragover.prevent 
          @dragenter.prevent >
          Drop Here 
      </button>
    </div>


  </div>


</template>

<script>
export default {
  name:"KanbanAddTaskForm",
  data(){
    return{
      title:"",
      isAdd:false
    }
  },
  props:["categoryId"],
  methods:{
    addTask(){
      let payload={
        // CategoryId : this.$attrs.categoryId,
        CategoryId: this.categoryId,
        title: this.title
      }
      // console.log(payload);
      this.$emit("submitAddTask", payload)
      this.title=""
      this.isAdd=false
    },
    deleteCategory(){
      let payload={
        categoryId: this.categoryId
      }
      // console.log(payload);
      this.$emit("submitDeleteCategory", payload)

    },

  }
}
</script>

<style>

</style>