<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <Sidebar v-if="currentPage === 'homePage'"></Sidebar>
    <LoginPage 
      v-if="currentPage === 'loginPage'"
      @emitRegister="register"
      @loginSubmit="login">
    </LoginPage>
    <RegisterPage 
      v-else-if="currentPage === 'registerPage'"
      @emitRegister="registerUser">
    </RegisterPage>
    <HomePage
      v-else-if="currentPage === 'homePage'"
      :tasks="tasks"
      :categories="categories"
      @emitAddTask="addTask"
      @emitDelete="deleteTask"
    >
    </HomePage>
  </div>
</template>

<script>
// import component
import draggable from 'vuedraggable'
import axios from './config/axios'
import LoginPage from './views/Login'
import RegisterPage from './views/Register'
import HomePage from './views/Home'
import Sidebar from './components/Sidebar'
export default {
  name: 'Kanban',
  data() {
    return {
      message: 'Hello world',
      currentPage: 'loginPage',
      tasks: [],
      categories: [
        {
          title: 'backlog'
        },
        {
          title: 'todo'
        },
        {
          title: 'doing'
        },
        {
          title: 'completed'
        }
      ]
    };
  },
  //register component
  components: {
    LoginPage,
    RegisterPage,
    HomePage,
    Sidebar,
    draggable
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.currentPage = 'homePage'
        this.fetchTasks()
      } else {
        this.currentPage = 'loginPage'
      }
    },
    login(payload) {
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
      .then(({data}) => {
        this.currentPage = 'homePage'
        localStorage.setItem('access_token', data.access_token)
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err);
      })
    },
    register() {
      console.log('masuk ke app.vue register');
      this.currentPage = 'registerPage'
    },
    registerUser(value) {
      console.log(value, 'masuk ke registerUser app.vue');
      this.currentPage = value
    },
    logout(){
    },
    fetchTasks() {
      axios({
        url: '/kanbans',
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        this.tasks = data
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    addTask() {
      console.log('masuk ke app');
      this.fetchTasks()
    },
    deleteTask() {
      console.log('ini delete masuk ke app');
      this.fetchTasks()
    }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style>
body {
  margin: 0;
  scroll-behavior: smooth;
}

p {
  font-family: 'Nunito', sans-serif;
}

.sidebar-container{
  height: 100vh;
  width: 15%;
  background-color: #ffffff;
  position: fixed;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0px 5px 5px #e0dada;
  font-family: 'Karla', sans-serif;
}

.logo-container{
  text-align: center;
  margin-bottom: 100px;
}

.sidebar-menu{
  padding-left: 0;
  margin-top: 80px;
}

.sidebar-menu a{
  font-weight: lighter;
  margin: 40px 0px;
  display: block;
  font-size: 16px;
  text-decoration: none;
  color: #1e2223;
}

.sidebar-menu a:hover{
  font-weight: lighter;
  margin: 40px 0px;
  display: block;
  font-size: 20px;
  text-shadow: 0px 0px 4px #303778;
  color: #303778;
}

.sidebar-footer {
  position: fixed;
  left: 6%;
  bottom: 0;
}

.main-container{
  background-image: url('https://i.imgur.com/sIRVPzA.jpg');
  height: 100vh;
  margin-left: 15%; 
}

.board {
  padding: 10px 0 0 30px;
  display: flex;
  justify-content: space-evenly;
}

.category {
  width: 25%;
  margin: 0 15px 0 15px;
  /* border: 1px solid #303778; */
  /* overflow: scroll; */
}

.card-board-header {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.header-icon {
  padding-right: 20px;
}

.card-body {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 0px 5px 5px #e9ebf0;
  border-radius: 10px;
  
}
</style>