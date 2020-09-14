<template>
  <div>
  <LoginPage 
    v-if="currentPage === 'login'"
    v-on:loginSubmitFromView="login"
    v-on:changeToRegisterFromView="changePageToRegister"
    :loginAlert = "loginAlert"
    >
  </LoginPage>


  <RegisterPage 
    v-else-if="currentPage === 'register'"
    v-on:registerSubmitFromView = "register"
    v-on:changeToLoginFromView = "changePageToLogin"
    :registerAlert = "registerAlert"
    >
  </RegisterPage>


  <KanbanPage 
    v-else-if="currentPage === 'kanban'"
    :categoriesData = "categoriesData"
    :tasksData = "tasksData"
    :kanbanPageAlert = "kanbanPageAlert"

    v-on:editTaskTitle="editTaskTitle"
    v-on:submitAddTask="addTask"
    v-on:submitDeleteTask="deleteTask"
    v-on:submitEditTaskCategory="editTaskCategory"


    v-on:submitDeleteCategory="deleteCategory"
    v-on:submitAddCategory="addCategory"

    @logout="logout"
    >
    

  </KanbanPage>
  </div>
</template>

<script>
import axios from "./config/axios"
import LoginPage from "./views/LoginPage"
import KanbanPage from "./views/KanbanPage"
import RegisterPage from "./views/RegisterPage"

export default {
  name: "App",
  data() {
    return {
      // name: "App",
      // message: 'Hello world',
      currentPage: "kanban",
      loginAlert: "",
      registerAlert:"",
      kanbanPageAlert:"",

      categoriesData:[],
      tasksData: []
    };
  },

  components:{
    LoginPage,
    KanbanPage,
    RegisterPage
  },

  methods:{
    tokenCheck(){
      if(localStorage.access_token){
        this.currentPage = "kanban"
        this.getCategories()
        this.getTasks()
      }else{
        this.currentPage = "register"
      }
    },

    logout(){
      localStorage.clear()
      this.currentPage="login"
    },
    //LOGIN PAGE
    login(payload){
      axios({
        method: "POST",
        url: "./users/login",
        data:payload
      })
        .then(({data}) =>{
          // console.log(data);
          localStorage.access_token = data.access_token
          this.currentPage="kanban"
          this.getCategories()
          this.getTasks()
          this.loginAlert = ""
          this.registerAlert =""
        })
        .catch(err => {
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.loginAlert = errors

          // console.log(this.loginError);
        })
    },

    changePageToRegister(){
      this.currentPage = "register"
    },



    //REGISTER PAGE
    register(payload){
      axios({
        method: "POST",
        url: "./users/register",
        data:payload
      })
        .then(({data}) => {
          // console.log(data);

          this.currentPage = "login"
          this.loginAlert = "You're account successfully created, Cheers!"
        })
        .catch(err => {
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")

          this.registerAlert = errors
       

        })
    },

    changePageToLogin(){
      this.currentPage = "login"
    },



    //KANBAN
    addCategory(payload){
      axios({
        method: "POST",
        url: "./categories/",
        data:payload,
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          // console.log(data)

          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          // this.loginAlert = err.response.data.msg;
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors
        })
        
    },

    getCategories(){
      axios({
        method:"GET",
        url: "/categories",
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) =>{
          // console.log(data.categoryData[0]);
          this.categoriesData = data.categoryData
          this.kanbanPageAlert= ""

        })
        .catch((err) => {
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors          
        })
    },
    
    deleteCategory(payload){
      let id = payload.categoryId
      axios({
        method:"DELETE",
        url:`./categories/${id}`,
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors        })


    },


    getTasks(){
    axios({
        method:"GET",
        url: "/tasks",
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) =>{
          // console.log(data.tasksData);
          this.tasksData = data.tasksData
          this.kanbanPageAlert= ""

        })
        .catch((err) => {
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors        })
    },

    addTask(payload){
      let {CategoryId, title}= payload
      console.log(payload);
      axios({
        method: "POST",
        url: "./tasks/",
        data:payload,
        headers:{
          access_token : localStorage.access_token
        }
      })
        .then(({data}) => {
          // console.log(data)

          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          // this.loginAlert = err.response.data.msg;
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors        })
        
    },

    deleteTask(payload){
      let {id, title} = payload
      axios({
        method: "DELETE",
        url: `./tasks/${id}`,
        data:{
          title
        },
        headers:{
          access_token : localStorage.access_token
        }

      })
        .then(({data}) =>{
          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          // this.loginAlert = err.response.data.msg;\
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors        })
    },

    editTaskTitle(payload){ 
      let {id, title} = payload
      axios({
        method: "PATCH",
        url: `./tasks/${id}/title`,
        data:{
          title
        },
        headers:{
          access_token : localStorage.access_token
        }

      })
        .then(({data}) =>{
          // console.log(data);

          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          // this.loginAlert = err.response.data.msg;
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors
          console.log(kanbanPageAlert);        
        })
    },

    editTaskCategory(payload){
      let {id, CategoryId} = payload
      console.log(payload, "dari app");
      axios({
        method: "PATCH",
        url: `./tasks/${id}/category`,
        data:payload,
        headers:{
          access_token : localStorage.access_token
        }

      })
        .then(({data}) =>{
          // console.log(data);

          this.getCategories()
          this.getTasks()
          this.kanbanPageAlert= ""

        })
        .catch(err => {
          // this.loginAlert = err.response.data.msg;
          console.log(err.response.data.errors);
          let errors = err.response.data.errors.join("\r\n")
          this.kanbanPageAlert = errors

        })
    }
  },


  created(){
    this.tokenCheck()

  }

  
};
</script>

<style scoped>
</style>