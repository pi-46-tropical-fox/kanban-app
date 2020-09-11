<template>
  <div>
    <div class="col-md-12 p-2 bg-board">
      <a href="" @click.prevent='organizationList' 
        class="btn btn-sm trello-btn-bg text-light">
        <i class="fa fa-folder" aria-hidden="true"></i>
        List Organization
      </a>&nbsp;
      <!-- <a class="btn btn-sm trello-btn-bg text-light" data-toggle="modal"
        data-target="#createTask"><i class="fa fa-plus" 
        aria-hidden="true"></i>
        Create New Task
      </a> -->
    </div>
    <div class="col-md-12 card-wrapper">
      <div class="row">
        <div class="card ml-2 mb-2 mt-2 mx-auto" :key="i" v-for="(board, i) in boardList" style="width: 20.5rem;">
          <div class="card-title">
            <p class="text-dark"> <b>{{ board.category_name }}</b></p>
            <p><a href="#"><i class="fa fa-cog text-dark"
            aria-hidden="true"></i></a></p>
          </div>
          <div class="card-content">
            <CardContent 
              :tasks="board.Tasks" :host="host" :keys="i" :boardList="boardList">
            </CardContent>
          </div>
          <div v-if="form_category == board.id" class="card-form">
            <CreateTask :host="host" :category_id="board.id"
            :keys="i" :boardList="boardList">
            </CreateTask>
          </div>
          <div class="card-footer">
            <p><b><a href="#" @click.prevent="formToggle(board.id)" 
            class="text-dark"><i class="fa fa-plus text-dark" aria-hidden="true">
            </i>Add Task</a></b></p>
          </div>
        </div>
      </div>
    </div>
    <CreateNewTask :host="host" :boardList="boardList"></CreateNewTask>
  </div>
</template>

<script>
import CardContent from './CardContent'
import CreateNewTask from './CreateNewTask'
import CreateTask from './CreateTaskCategory'

export default {
  name: 'Board',
  props: ['boardList', 'host'],
  components: {
    CardContent,
    CreateNewTask,
    CreateTask
  },
  data() {
    return {
      form_category: ''
    }
  },
  methods: {
    organizationList() {
      this.$parent.organizationList()
    },
    formToggle(id) {
      this.form_category = id
    },
    removeElement(keys, id) {
      this.$parent.removeElement(keys, id)
    }
     
  }

}
</script>

<style scoped>
  .bg-board {
    background-color: rgb(75, 191, 107) ;
  }
  .trello-btn-bg {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .card-wrapper {
    min-height: 95vh;
    background-color: rgb(75, 191, 107);
  }

</style>