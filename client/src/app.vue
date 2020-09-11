<template>
  <div class="container">
      <loginPage 
        v-if="currentPage ==='loginPage'"
        @loginSubmit='login'
        @register='theRegister'
        @signin='theSignin'
      ></loginPage>
      <registerPage 
        v-else-if="currentPage ==='registerPage'"
        @registerSubmit='theSignin'
        @register='theRegister'
        @signin='theSignin'
      ></registerPage>
      <mainPage 
        v-else-if="currentPage ==='mainPage'"
        :categories='categories'
        :todos='todos'
        @logout="theSignin"
        @todo='login'
      ></mainPage>
  </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './views/loginPage'
import MainPage from './views/mainPage'
import RegisterPage from './views/registerPage'

export default {
    name: 'app',
    data () {
        return {
            currentPage: 'loginPage',
            categories: [],
            todos: []

        }

    },
    components: {
        LoginPage,
        RegisterPage,
        MainPage,
        
    },
    methods : {
        checkAuth () {
            if (localStorage.access_token) {
                this.login()

            } else {
                this.currentPage = 'loginPage'
                
            }
        },
       login () {
           this.currentPage = 'mainPage'
           this.fetchCategory()
           
           
       },
       theRegister () {
           this.currentPage = 'registerPage'
       },
       theSignin () {
           this.currentPage = 'loginPage'

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

                console.log(this.categories, '<<<< category')
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
                console.log(data)
                this.todos = data
            })
            .catch ( err => {
                console.log(err)
            })
        }
    },
    created () {
        this.checkAuth()
    }
}
</script>

<style>

</style>