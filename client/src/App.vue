<template>
  <div>
    <NavBar :isLogin="isLogin"  @emitToPage="toPage"></NavBar>
    <header class="masthead"> 
      <!-- <Error :error='error' v-if="error"></Error> -->
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
import Error from './components/error'

export default {
  name: "App",
  data() {
    return {
      isLogin: false,
      currentPage: 'Welcome',
      taskId: 0,
      error: null
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
    DashboardPage,
    Error
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
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>