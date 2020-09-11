<template>
    <div>
        <LoginPage 
            v-if="currentPage === 'login'"
            @showRegisterForm="showRegisterForm"
            @login="login"
            :message="message">
        </LoginPage>
        <RegisterPage
            v-else-if="currentPage === 'register'"
            @showLoginForm="showLoginForm"
            @register="register"
            :message="message">
        </RegisterPage>
        <MainPage
            v-else-if="currentPage === 'main'"
            @logout="logout"
            :categories="categories"
            :tasks="tasks"
            :message="message"
            @successCreated="successCreated"
            @failCreated="failCreated"
            @successDeleted="successDeleted"
            @forbiddenAccess="forbiddenAccess"
            @successMoved="successMoved"
            @successEdited="successEdited"
            @failEdit="failEdit">
        </MainPage>
    </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import MainPage from './views/MainPage'
export default {
  data() {
    return {
      currentPage: 'login',
      message: '',
      categories: '',
      tasks: ''
    };
  },
  components: {
      LoginPage,
      RegisterPage,
      MainPage
  },
  methods: {
      clearField(){
          this.message = ''
          this.categories = ''
          this.tasks = ''
      },
      showRegisterForm(){
          this.currentPage = 'register'
          this.clearField()
      },
      showLoginForm(){
          this.currentPage = 'login'
          this.clearField()
      },
      login(user){
          axios({
              url: `/login`,
              method: 'POST',
              data: user
          })
          .then(({data}) => {
              localStorage.setItem('access_token', data.access_token)
              this.message = `<p style="background-color: #2ed574b4;">You've logged in successfully!</p>`
              this.currentPage = 'main'
              this.showAllTaskCategory()
              this.showAllTask()
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.message = notif
          })
      },
      register(user){
          axios({
              url: `/register`,
              method: 'POST',
              data: user
          })
          .then(({data}) => {
              localStorage.setItem('access_token', data.access_token)
              this.message = `<p style="background-color: #2ed574b4;">Account created successfully!</p>`
              this.currentPage = 'main' 
              this.showAllTaskCategory()
              this.showAllTask()             
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.message = notif
          })
      },
      logout(){
          localStorage.clear()
          this.currentPage = 'login'
          this.clearField()
      },
      showAllTaskCategory(){
          axios({
              url: `/categories`,
              method: 'GET',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.categories = data
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.message = notif
          })
      },
      showAllTask(){
          axios({
              url: `/tasks`,
              method: 'GET',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.tasks = data
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.message = notif
          })
      },
      fetchData(){
          this.showAllTaskCategory()
          this.showAllTask()
      },
      successCreated(){
          this.message = `<p style="background-color: #2ed574b4;">Task created successfully!</p>`
          this.fetchData()
      },
      failCreated(notif){
          this.message = notif
      },
      successDeleted(){
          this.message = `<p style="background-color: #2ed574b4;">Task deleted successfully!</p>`
          this.fetchData() 
      },
      forbiddenAccess(notif){
          this.message = notif
      },
      successMoved(){
          this.message = `<p style="background-color: #2ed574b4;">Task moved successfully!</p>`
          this.fetchData() 
      },
      successEdited(){
          this.message = `<p style="background-color: #2ed574b4;">Task edited successfully!</p>`
          this.fetchData() 
      },
      failEdit(notif){
          this.message = notif
      }
  },
  created(){
      if(localStorage.getItem('access_token')){
          this.currentPage = 'main'
          this.fetchData()      
      }else{
          this.currentPage = 'login'
      }
  }
};
</script>

<style>
</style>