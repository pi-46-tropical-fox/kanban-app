<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <Sidebar v-if="currentPage === 'homePage'"></Sidebar>
    <LoginPage 
      v-if="currentPage === 'loginPage'"
      @emitMovePageRegister="movePageRegister"
      @loginSubmit="login">
    </LoginPage>
    <RegisterPage 
      v-else-if="currentPage === 'registerPage'"
      @emitMovePageLogin="movePageLogin"
      @emitRegister="submitRegister">
    </RegisterPage>
    <HomePage
      v-else-if="currentPage === 'homePage'"
      :tasks="tasks"
      :categories="categories"
      @emitAddTask="addTask"
      @emitEditTask="refreshTask"
      @emitDelete="deleteTask">
    </HomePage>
  </div>
</template>

<script>
// import component
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
      isLogin: false,
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
    Sidebar
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
    movePageRegister() {
      console.log('masuk ke movePage di App.vue');
      this.currentPage = 'registerPage'
    },
    movePageLogin() {
      this.currentPage = 'loginPage'
    },
    submitRegister(value) {
      console.log(value, 'masuk ke app untuk register');
      this.currentPage = value
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
    },
    refreshTask() {
      console.log('ini edt di app.vue');
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
  font-family: 'Karla', sans-serif;
  -webkit-box-shadow: 10px 0px 47px -30px rgba(63,81,181,0.26);
  -moz-box-shadow: 10px 0px 47px -30px rgba(63,81,181,0.26);
  box-shadow: 10px 0px 47px -30px rgba(63,81,181,0.26);
}

.sidebar-menu a{
  font-weight: lighter;
  display: flex;
  justify-content: baseline;
  font-size: 16px;
  text-decoration: none;
  color: #1e2223;
}

.sidebar-menu a:hover{
  font-weight: lighter;
  font-size: 20px;
  text-shadow: 0px 0px 4px #303778;
  color: #303778;
}

.sidebar-footer {
  position: fixed;
  margin-bottom: 5%;
  left: 5%;
  bottom: 0;
}

.main-container {
  height: 100vh;
}

.board {
  padding: 10px 0 0 30px;
  display: flex;
  justify-content: space-evenly;
}

.category {
  width: 25%;
  margin: 0 1.5rem 0 0;
}

.card-board-header {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.header-icon {
  padding-right: 10px;

}

.card-body {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  
}
</style>