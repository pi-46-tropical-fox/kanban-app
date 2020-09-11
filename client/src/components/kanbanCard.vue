<template>
  <div >
    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 font-extrabold">
      {{type}}
    </div>
    <div class="flex-col bg-blue-100 overflow-auto container-tasks ">
      <kanbanList @fetchTasks="fetchTasks" v-for="task in taskLists" :key="task.id" :task="task" :baseUrl="baseUrl" :type="type"></kanbanList>
    </div>
    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2">
      <div class=" flex-1 text-center px-20 m-2 container-row ">
        <button @click.prevent="addTaskOpen" v-if="!addTask"
          class="bg-blue-200 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Add
        </button>
        <form @submit.prevent="addTaskToDb" v-if="addTask">
          <textarea id="card-add" v-model="newTask" placeholder="Enter task"
            class="list-card-composer-textarea js-card-title form-control container"
            style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 80px;"></textarea>
          <div>
            <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Task</button>
          <button @click.prevent="addTaskOpen"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import kanbanList from './kanbanList.vue'
import swal from 'sweetalert'
export default {
  name: 'kanbanCard',
  props: ['taskLists', 'type', 'baseUrl'],
  components: {
    kanbanList
  },
  data () {
    return {
      addTask: false,
      newTask: ''
    }
  },
  methods: {
    addTaskOpen(){
      this.addTask = !this.addTask
      this.newTask = ''
    },
    addTaskToDb(){
      axios({
          method:'POST',
          url: this.baseUrl +'/tasks',
          data:{
              category: this.type,
              title:this.newTask
          },
          headers : {
              access_token:localStorage.access_token
          }
      })
        .then(res=>{
            this.$emit('fetchTasks')
            this.addTaskOpen()
        })
        .catch(err=>{
            console.log(err);
        })
    },
    fetchTasks () {
      this.$emit('fetchTasks')
    }
  }
}
</script>

<style scoped>

</style>