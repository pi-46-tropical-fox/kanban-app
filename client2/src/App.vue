<template>
  <div class="mainPage">
    <div class="navbar">
        <div>
          <a ><h3 class="ml-5">KANBANKU</h3></a>
        </div>

        <div class="d-flex justify-content-around btn-navigate">
          <a class="btn btn-info mr-5" @click.prevent="login" v-show="!isLogin">Login</a>
          <a class="btn btn-warning mr-5" @click.prevent="register" v-show="!isLogin">Register</a>
          <a variant="secondary" class="btn btn-warning mr-5" @click.prevent="logout" v-show="isLogin">Logout</a>
        </div>
    </div>
    <div class="menu">
        <Login
          class="login"
          v-if="currentPage ==='login'"
          @signIn="signIn"
          @googleLogin='google'
        ></Login>
        <Register
          class="register"
          v-else-if="currentPage ==='register'"
          @registerSubmit="login"
        ></Register>
        <Dashboard
        class="dashboard"
          v-else-if="currentPage ==='dashboard'"
          :categories='categories'
          :todos='todos'
          @deleteTask= 'fetchCategory'
          @addTask='signIn'
          @editTask='signIn'
          
        ></Dashboard>
    </div>
  </div>
</template>

<script>
import axios from './config/axios'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'
export default {
    name: 'App',
    data () {
        return {
            currentPage: 'login',
            categories: [],
            todos: [],
            isLogin: false
        }
    },
    components: {
        Dashboard,
        Login,
        Register
    },
    methods : {
        checkAuth () {
            if (localStorage.access_token) {
                this.signIn()

            } else {
                this.currentPage = 'login'
                
            }
        },
        signIn () {
            this.currentPage = 'dashboard'
            this.isLogin = true
            this.fetchCategory()      
        },
        google(data) {
          localStorage.setItem('access_token', data.access_token)
          this.currentPage = "dashboard"
          this.isLogin = true
          this.fetchCategory()
          console.log('ini dr google login')
        },
        register () {
            this.currentPage = 'register'
        },
        login () {
            this.currentPage = 'login'
        },
        logout () {
            this.currentPage = 'login'
            this.isLogin = false
            localStorage.removeItem('access_token')
        },
    
        fetchCategory () {
            console.log('ini Fetch Category')
            axios ({
                url : '/categories',
                method: "GET",
                headers: { 'access_token': localStorage.getItem('access_token')}
            })
            .then( ({ data }) => {
                console.log(data)
                this.categories = data

                console.log(this.categories, '<<<<---- ini category')
                this.fetchTodo()
            })
            .catch ( err => {
                console.log(err)
            })
        },
        fetchTodo () {
            console.log('ini fetch todo')
            axios ({
                url : '/todos',
                method: "GET",
                headers: { 'access_token': localStorage.getItem('access_token')}
            })
            .then( ({ data }) => {
                this.todos = data
                console.log(this.todos, '<<<---- ini todos')
            })
            .catch ( err => {
                console.log(err)
            })
        },
        
    },
    created () {
        this.checkAuth()
    }
}
</script>

<style>
.mainPage {
    width: 100%;
}
.navbar {
    display: flex;
    justify-content: space-between;
    height: 70px;
    background-color: cadetblue;
    position: fixed;
}
.login  {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
.register {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>