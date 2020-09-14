<template>
  
  <div draggable="true" @dragstart="dragStart" @dragover.stop @dragend="dragEnd" >
    
      <!-- <transition-group> -->
        <div class="kanban-card" v-show="isNotEdit" >
          <div class="kanban-content">
            <h5>{{task.title}}</h5>
          </div>
          <div class = "kanban-content-button">
            <button type="button" class="btn btn-primary btn-sm" v-on:click.prevent="editContent" >Edit</button>  
            <button type="button" class="btn btn-primary btn-sm" v-on:click.prevent="deleteTask">Delete</button>
          </div>
        </div>

        <div class="kanban-card-edit" v-show="!isNotEdit">
          <div class="kanban-content">
            <input type="text" v-model="title" >
          </div>
          <div class = "kanban-content-button">
            <button type="button" class="btn btn-primary btn-sm" v-on:click.prevent="edit" >Ok</button>  
          </div>
        </div>
      <!-- </transition-group> -->
  </div>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  
  inheritAttrs: "false",
  name:"KanbanBody",
  data(){
    return {
      isNotEdit : true,
      title:"",
      // preValue: task.title
    }
  },
  props:[
    "task",
    // 
  ],
  components:{
    draggable
  },
  computed: {

  },

  methods:{
    dragEnd(e){
      // console.log(e.target);
    },
    dragStart(e){
      const target = e.target
      let id= target.getAttribute("task_id")
      // console.log(id)
      e.dataTransfer.setData("task_id", id)
      // setTimeout(() =>{
      //   target.style.display = "none"
      // }, 0)
    },
    deleteTask(){
      let payload = {
        id: this.task.id
      }
      this.$emit("submitDeleteTask", payload)
    },
    editContent(){        
      // console.log(event.path[2]);
      // console.log(key);
      this.isNotEdit = false;
    },

    edit(){ //axios patch title
      let payload = {
        title : this.title,
        id: this.task.id
      }
      this.$emit("editTaskTitle", payload)
      this.isNotEdit = true;


      
    }
  }
}
</script>

<style>

</style>