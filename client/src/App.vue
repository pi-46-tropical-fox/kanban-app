<template>
  <div>
    <LoginPage 
    v-if="currentPage === 'loginPage'" 
    @loginSubmit="login"
    @switchRegister="register"
    @googleLogin="onSignIn">
    </LoginPage>

    <RegisterPage 
    v-if="currentPage === 'registerPage'"
    @switchLogin="login" 
    @registerSubmit="register">
    </RegisterPage>

    <Navbar 
    @logoutButton="logout"
    v-if="currentPage === 'dashboardTask'
    "></Navbar>

    <DashboardTask
    v-if="currentPage === 'dashboardTask'"
    :tasksData="tasks"
    :categoryData="categories"
    @addTask="addTask"
    @updateTask="update"
    @switchCategory="switchCategory"
    @deleteTask="deleteTask"
    ></DashboardTask>
  </div>
</template>

<script>
import axios from './config/axios'
import Navbar from './views/Navbar.vue'
import LoginPage from './views/Login.vue'
import RegisterPage from './views/Register'
import DashboardTask from './views/DashboardTask'
export default {
  name: 'App', 
  data() {
    return {
      message: 'Hello world',
      currentPage: 'loginPage',
      tasks: [],
      categories: []
    };
  },
  components: {
      Navbar,
      LoginPage,
      RegisterPage,
      DashboardTask
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
          this.currentPage = 'dashboardTask'
          this.getTask()
          this.getCategories()
      } else {
          this.currentPage = 'loginPage'
      }
    },
    login(payload) {
      this.currentPage="loginPage"
      axios({
        url: `/login`,
        method: 'POST',
        data: payload
      })
      .then(({data})=> {
        this.currentPage = 'dashboardTask'
        localStorage.setItem('access_token', data.access_token)
        this.getTask()
        this.getCategories()
      })
      .catch(err => {
        console.log(err)
      })
    },
    register(payload) {
      this.currentPage="registerPage"
      axios({
        url: `/register`,
        method: 'POST',
        data: payload
      })
      .then(({data})=> {
        console.log(payload)
        this.currentPage = 'loginPage'
      })
      .catch(err => {
        console.log(err)
      })
    },
    onSignIn(googleUser) {
      var google_access_token = googleUser.getAuthResponse().id_token;
      axios({
          method: 'POST',
          url: 'http://localhost:3000/googlelogin',
          headers: {google_access_token}
      })
        .then (({data}) => {
          localStorage.setItem('access_token', data.access_token)
          this.currentPage='loginPage'
          this.checkAuth()
        })
        .catch((err) => {
            console.log(err)
        })
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
    logout() {
      this.signOut()
      localStorage.clear()
      localStorage.removeItem('access_token')
      this.currentPage='loginPage'
      this.enterTask = false;
    },
    getTask(id) { 
      axios({
        url: `/task`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data})=> {
        this.tasks = data
        this.currentPage = 'dashboardTask'
      })
      .catch(err => {
        console.log(err)
      })
    },
    addTask(data) {
      axios({
        url: `/task`,
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: data
      })
      .then(({data})=> {
        console.log(data);
        this.getTask()
      })
      .catch(err => {
        console.log(err)
      })
    },
    update(data) {
      axios({
        url: `/task/${data.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: data.title
        }
      })
      .then(data => {
        this.getTask()
      })
      .catch(err=> {
        console.log(err)
      })
    },
    deleteTask(id) {
      axios({
        url: `/task/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(data => {
        this.getTask()
      })
      .catch(err=> {
        console.log(err)
      })
    },
    getCategories() {
      axios({
        url: `/category`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        console.log(data)
        this.categories = data
      })
      .catch(err=> {
        console.log(err)
      })
    },
    switchCategory(data) {
        axios({
        url: `/category/${data.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          number: data.number
        }
      })
      .then(({data}) => {
        this.getTask()
      })
      .catch(err=> {
        console.log(err)
      })
    }
  },
  created() {
    this.checkAuth()
  },
  computed: {
    setCategories() {
      return this.getCategories()
    },
    setTask() {
      return this.getTask()
    }
  }
};
</script>

<style scoped>
</style>