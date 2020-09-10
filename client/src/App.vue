<template>
  <div>
    <NavBar :isLogin="isLogin"  @emitToPage="toPage"></NavBar>
    <header class="masthead"> 
      <WelcomePage v-if="currentPage == 'Welcome'"></WelcomePage>
      <LoginPage v-else-if="currentPage == 'Login'" @emitToPage="toPage" @emitIsLogin="login"></LoginPage>
      <RegisterPage v-else-if="currentPage == 'Register'" @emitToPage="toPage"></RegisterPage>
      <AddTaskPage v-else-if="currentPage == 'AddTask'" @emitToPage="toPage"></AddTaskPage>
      <EditTaskPage v-else-if="currentPage == 'EditTask'" :taskId="taskId" @emitToPage="toPage"></EditTaskPage>
      <DashboardPage v-else-if="currentPage == 'Dashboard'" @emitToPage="toPage" @emitUpdateTask="updateTask"></DashboardPage>
    </header>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from './components/navbar'
import Footer from './components/footer'
import WelcomePage from './views/welcome'
import LoginPage from './views/login'
import RegisterPage from './views/register'
import AddTaskPage from './views/addTask'
import EditTaskPage from './views/editTask'
import DashboardPage from './views/dashboard'

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      currentPage: 'Welcome',
      taskId : 0
    };
  },
  components: {
    NavBar,
    Footer,
    WelcomePage,
    LoginPage,
    RegisterPage,
    AddTaskPage,
    EditTaskPage,
    DashboardPage
  },
  methods: {
    login() {
      this.isLogin = true
    },
    toPage(value) {
      if(value == 'Logout') {
        this.logout()
      }else {
        this.currentPage = value
      }
    },
    logout() {
      localStorage.clear()
      this.isLogin = false
      this.currentPage = 'Welcome'
    },
    updateTask(id) {
      this.taskId = id
      this.currentPage = 'EditTask'
    }
  },
  created() {
    if(localStorage.access_token) {
      this.currentPage = 'Dashboard'
      this.isLogin = true
    } else {
      this.currentPage = 'Welcome'
      this.isLogin = false
    }
  }
};
</script>

<style>
</style>