<template>

  <!-- <login @reload-page="readData()"></login>
  <form-add @add-data="postData"></form-add>
  <form-edit :show="showedit" :selectdata="selectedData" @closeform="close" @edit-data="putData"></form-edit> -->
  
  <div class="kanban"> 
    <tasks-list 
    :datatasks="tasksBacklog" :cate="'Backlog'" 
    @move-data="moveData"
    @data-edit="sendedit" 
    @destroy-data="destroyData"
    ></tasks-list>
    <tasks-list 
    :datatasks="tasksTodo" :cate="'Todo'" 
    @move-data="moveData" 
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>
    <tasks-list 
    :datatasks="tasksDone" :cate="'Done'"
    @move-data="moveData"
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>
    <tasks-list 
    :datatasks="tasksComplete" :cate="'Complete'" 
    @move-data="moveData" 
    @data-edit="sendedit" 
    @destroy-data="destroyData">
    </tasks-list>

    </div>
</template>

<script> 

  import axios from 'axios'
  import tasks from './tasks'
  import form from './barcontrol'
  import edit from './formedit'
  import login from "./login"

export default {
  components:{
    'tasks-list' : tasks,
    'form-add' : form,
    // 'form-edit': edit,
  },
  props: ['addData','datakanban'],
  data(){
    return {
      baseUrl: ``,
      tasksBacklog : [],
      tasksTodo: [],
      tasksDone: [],
      tasksComplete: [],
      showedit: false,
      selectedData:null
    }
  },
  created(){
     
     this.loaddata()
  },

  watch:{
    datakanban : function(){
      this.loaddata()
    }
  },

  
  methods:{
    
    loaddata(){
      let allLoadedData = this.datakanban
      this.tasksBacklog = allLoadedData.backlog 
      this.tasksTodo = allLoadedData.todo  
      this.tasksDone = allLoadedData.done   
      this.tasksComplete = allLoadedData.complete
    },

    destroyData(data){
      this.$emit('toDelete',data)
    },

    moveData(data){
      
      this.$emit('movedata',data)
    },

    sendedit(selectedTask){
      this.SelectedData(selectedTask)
    },

    getEdited(newData){
      this.$parent.editData(newData)
    }
  }
}

</script>
<style scoped>

</style>