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
    @dashboardOrganizationButton="getOrganization"
    v-if="currentPage === 'loginPage' || currentPage === 'dashboardTask' || currentPage === 'dashboardOrganizationPage' || currentPage === 'createOrganizationPage' || currentPage === 'joinOrganizationPage'
    "></Navbar>

    <DashboardOrganization
    :organizationData="organizations"
    @enterOrganization="getTask"
    @createOrganizationButton="createOrganization"
    @joinOrganizationButton="joinOrganization"
    v-if="currentPage === 'dashboardOrganizationPage'">
    </DashboardOrganization>

    <JoinOrganization 
    :organizationData="organizations"
    @dashboardOrganizationButton="getOrganization"
    @joinOrganization="joinOrganization"
    @createOrganizationButton="createOrganization"
    v-if="currentPage === 'joinOrganizationPage'">
    </JoinOrganization>

    <CreateOrganization 
    @dashboardOrganizationButton="getOrganization"
    @createOrganizationButton="createOrganization"
    @joinOrganizationButton="joinOrganization" 
    v-if="currentPage === 'createOrganizationPage'">
    </CreateOrganization>

    <DashboardTask
    v-if="currentPage === 'dashboardTask'"
    :tasksData="tasks"
    :categoryData="category"
    @addTask="addTask"
    @deleteTask="deleteTask"
    @userEmail="userEmail"
    ></DashboardTask>
  </div>
</template>

<script>
import axios from './config/axios'
import Navbar from './views/Navbar.vue'
import LoginPage from './views/Login.vue'
import RegisterPage from './views/Register'
import DashboardOrganization from './views/DasboardOrganization.vue'
import CreateOrganization from './views/CreateOrganizationPage.vue'
import JoinOrganization from './views/JoinOrganization'
import DashboardTask from './views/DashboardTask'
export default {
  name: 'App', 
  data() {
    return {
      message: 'Hello world',
      currentPage: 'loginPage',
      enterTask: false,
      tasks: [],
      organizations: [],
      category: [
        { 
          id: 1,
          name: 'Backlog'
        },
        {
          id: 2,
          name: 'Todo' 
        },
        {
          id: 3,
          name: 'Doing' 
        },
        {
          id: 4,
          name: 'Done' 
        }
      ]
    };
  },
  components: {
      Navbar,
      LoginPage,
      RegisterPage,
      DashboardOrganization,
      JoinOrganization,
      CreateOrganization,
      DashboardTask
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
          this.currentPage = 'dashboardOrganizationPage'
          this.getOrganization()
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
        console.log(payload)
        this.currentPage = 'dashboardOrganizationPage',
        this.enterTask = false;
        localStorage.setItem('access_token', data.access_token)
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
      console.log(googleUser);
      var google_access_token = googleUser.getAuthResponse().id_token;
      $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/googlelogin',
          headers: {google_access_token}
      })
        .done ((response) => {
            localStorage.setItem('access_token', response.access_token)
            this.currentPage='loginPage'
            this.checkAuth()
        })
        .fail((err) => {
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
      localStorage.clear()
      localStorage.removeItem('access_token')
      // this.signOut()
      this.currentPage='loginPage'
      this.enterTask = false;
    },
    getTask(id) { 
      console.log(id)
      axios({
        url: `/${id}/task`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data})=> {
        this.tasks = data.tasks
        this.currentPage = 'dashboardTask'
        this.enterTask = true;
      })
      .catch(err => {
        console.log(err)
      })
    },
    addTask(data) {
      axios({
        url: `/1/task`,
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: data
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask(id) {
      axios({
        url: `/1/task/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .catch(err=> {
        console.log(err)
      })
    },
    getOrganization() {
      this.currentPage = 'dashboardOrganizationPage'
      axios({
        url: `/organization`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data})=> {
        console.log(data)
        this.organizations = data
        this.enterTask = true
      })
      .catch(err => {
        console.log(err)
      })
    },
    joinOrganization(id) {
      this.currentPage = 'joinOrganizationPage'
      axios({
        url: `/organization/${id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data})=> {
        console.log(data)
        this.organizations = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    createOrganization(data) {
      this.currentPage = 'createOrganizationPage'
      axios({
        url: `/organization`,
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: data
      })
      .then(({data})=> {
        console.log(data)
        this.currentPage = 'dashboardOrganizationPage'
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style scoped>
</style>