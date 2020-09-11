<template>
  <div>
    <NavBar 
    @toAddTaskPage="changePage('addTaskPage')"
    @logoutFunction="logoutUser()">
    </NavBar>
    <div v-if="currentPage == 'dashboardPage'" class="container border border-dark rounded-lg mt-5" id="list-todo">
      <h3>My Todo List</h3>
      <div  class="row justify-content-md-center">
        <Category  
        v-for="(category, index) in categories" :key="index" 
        :category=category 
        :tasksData=tasksData
        @toEditTaskPage="changePage('editTaskPage')"></Category>
      </div>
    </div>
    <AddTask 
    v-else-if="currentPage == 'addTaskPage'"
    @addTaskSubmit="addTaskParent">
    </AddTask>
    <EditTask v-else-if="currentPage == 'editTaskPage'"
    :taskData=taskData
    @editTaskSubmit="editTaskParent"></EditTask>
  </div>
</template>

<script>
import axios from '../config/axios'
import Category from './components/Category'
import NavBar from './NavBar'
import AddTask from './components/componentsNavBar/AddTask'
import EditTask from './components/componentsNavBar/EditTask'
export default {
  name: "dashboardPage",
  data () { return {
    categories: ['Back Log', 'Feature', 'Development', 'Ready to Deploy'],
    currentPage: 'dashboardPage'
    }
  },
  components: {
    Category,
    NavBar,
    AddTask,
    EditTask
  },
  methods: {
    changePage(pageName) {
            this.currentPage = pageName
        },
    
    logoutUser() {
      this.$emit('logoutUser')
    },
    
    addTaskParent(payload) {
      console.log(payload, 'ini dari dashboard')
      axios({
        url: '/tasks',
        method: 'POST',
        data: payload,
        headers: {access_token: localStorage.access_token}
      })
      .then(({data}) => {
        this.currentPage = 'dashboardPage'
        this.$emit('fetchTask')
        console.log(data)
      })
      .catch(err => console.log(err))
    }
  },

  editTaskForm() {
    this.currentPage = 'editTaskPage'
  },

  editTaskParent(payload) {
      console.log(payload, 'ini dari dashboard')
      axios({
        url: '/tasks',
        method: 'PUT',
        data: payload,
        headers: {access_token: localStorage.access_token}
      })
      .then(({data}) => {
        this.currentPage = 'dashboardPage'
        this.$emit('fetchTask')
        console.log(data)
      })
      .catch(err => console.log(err))
    },
  props: ["tasksData"]
};
</script>

<style>
</style>