<template>
  <div>
    <Navbar
      :page="page"
      :name="name"
      @showLoader="showLoader"
      @createTask="createTask"
      @changePage="changePage"
      @reset="reset"
    >
    </Navbar>

    <ErrorMessage
      :message="message"
      :error="error"
      @closeError="closeError"
    >
    </ErrorMessage>
    <Authentication
      :page="page"
      :waiting="waiting"
      @changePage="changePage"
      @showError="showError"
      @showLoader="showLoader"
      @getTasks="getTasks"
    >
    </Authentication>

    <Home
      :page="page"
      :backlogTasks="backlogTasks"
      :todoTasks="todoTasks"
      :doneTasks="doneTasks"
      :completedTasks="completedTasks"
      @deleteTask="deleteTask"
      @updateTask="updateTask"
    >
    </Home>

    <Loader
      :waiting="waiting"
    >
    </Loader>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Authentication from "./views/Authentication";
import Home from "./views/Home";
import ErrorMessage from "./components/ErrorMessage";
import Navbar from "./components/Navbar"
import Loader from "./components/Loader"

const ToastSuccess = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export default {
  components: {
    Authentication,
    Home,
    ErrorMessage,
    Navbar,
    Loader,
  },
  data() {
    return {
      name: localStorage.getItem('username'),
      page: 'login',
      error: false,
      message: '',
      waiting: false,
      backlogTasks: [],
      todoTasks: [],
      doneTasks: [],
      completedTasks: [],
    };
  },
  methods: {
    getName() {
      this.name = localStorage.getItem('username');
    },
    changePage(nextPage) {
      this.page = nextPage;
      this.closeError()
    },
    showError(message){
      this.message = message;
      this.error = true;
    },
    showLoader(status) {
      this.waiting = status
    },
    closeError() {
      this.error = false;
      this.message = null;
    },
    createTask(data) {
      axios({
        method: 'POST',
        url: '/tasks',
        headers: {'access_token': localStorage.getItem('access_token')},
        data: data,
      })
      .then(result => {
        let data = {
          id: result.data.id,
          title: result.data.title,
          description: result.data.description,
          category: result.data.category,
          Creator: localStorage.getItem('username')
        }
        this.showLoader(false)
        this.pushTask(data)
      })
      .catch(err => {
        this.showLoader(false)
      });
    },
    getTasks() {
      this.getName()
      axios.defaults.baseURL = 'https://glacial-ocean-84777.herokuapp.com';
      // axios.defaults.baseURL = 'http://localhost:3000';
      if(localStorage.getItem('access_token')){
        axios({
          method: 'GET',
          url: '/tasks',
          headers: {
            'content-type': 'application/json',
            'access_token':  localStorage.getItem('access_token'),
          },
        })
        .then((result) => {
          result.data.forEach(task => {
            this.pushTask(task)
          })
          this.page = 'home';
        })
        .catch((err) => {
          if(err.response.status === 401) {
            localStorage.removeItem('access_token');
            this.message = err.response.data.message;
            this.error = true;
          }else{
            this.message = err.response.data.message;
            this.error = true;
          }
          this.page = 'login';
        });
      }else {
        this.page = 'login';
      }
    },
    pushTask(task) {
      if(task.category === 'Backlog') {
        this.backlogTasks.push(task)
      }else if(task.category === 'Todo') {
        this.todoTasks.push(task)
      }else if(task.category === 'Done') {
        this.doneTasks.push(task)
      }else if(task.category === 'Completed') {
        this.completedTasks.push(task)
      }
    },
    updateTask(id, data, category) {
      axios({
        method: 'put',
        url: `/tasks/${id}`,
        headers: {
          'access_token':  localStorage.getItem('access_token'),
        },
        data: data,
      })
      .then(result => {
        if(category === 'Backlog') {
            let oldData = this.backlogTasks;
            this.backlogTasks = []
            oldData.forEach(task => {
              if(task.id !== id) {
                this.backlogTasks.push(task)
              }else{
                this.pushTask(data)
              }
            })
          }else if(category === 'Todo') {
            let oldData = this.todoTasks;
            this.todoTasks = []
            oldData.forEach(task => {
              if(task.id !== id) {
                this.todoTasks.push(task)
              }else{
                this.pushTask(data)
              }
            })
          }else if(category === 'Done') {
            let oldData = this.doneTasks;
            this.doneTasks = []
            oldData.forEach(task => {
              if(task.id !== id) {
                this.doneTasks.push(task)
              }else{
                this.pushTask(data)
              }
            })
          }else if(category === 'Completed') {
            let oldData = this.completedTasks;
            this.completedTasks = []
            oldData.forEach(task => {
              if(task.id !== id) {
                this.completedTasks.push(task)
              }else{
                this.pushTask(data)
              }
            })
          }
          data.Creator = localStorage.getItem('username')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
         title: 'Your work has been saved',
         showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'failed Update data!',
          footer: '<a href>You don\'t have authorize for this task</a>'
        })
      })
    },
    deleteTask(id, category) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'delete',
            url: `/tasks/${id}`,
            headers: {'access_token': localStorage.getItem('access_token')},
          })
          .then(() => {
            if(category == 'Backlog') {
              let oldData = this.backlogTasks;
              this.backlogTasks = []
              oldData.forEach(task => {
                if(task.id !== id) {
                  this.backlogTasks.push(task)
                }
              })
            }else if(category === 'Todo') {
              let oldData = this.todoTasks;
              this.todoTasks = []
              oldData.forEach(task => {
                if(task.id !== id) {
                  this.todoTasks.push(task)
                }
              })
            }else if(category === 'Done') {
              let oldData = this.doneTasks;
              this.doneTasks = []
              oldData.forEach(task => {
                if(task.id !== id) {
                  this.doneTasks.push(task)
                }
              })
            }else if(category === 'Completed') {
              let oldData = this.completedTasks;
              this.completedTasks = []
              oldData.forEach(task => {
                if(task.id !== id) {
                  this.completedTasks.push(task)
                }
              })
            }
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'failed Update data!',
              footer: '<a href>You don\'t have authorize for this task</a>'
            })
          })
        }
      })
    },
    reset() {
      this.name = null;
      this.backlogTasks = [];
      this.todoTasks = [];
      this.doneTasks = [];
      this.completedTasks = [];
    },
  },
  created() {
    this.getTasks()
  },
  mounted() {
  },
  computed: {

  },
  watch: {
  },
};
</script>
