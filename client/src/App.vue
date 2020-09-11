<template>
  <div class="container">
    <LoginPage 
    v-if="currentPage == 'loginPage'"
    @loginSubmit="loginParent"
    @toRegisterPage="changePage('registerPage')">
    </LoginPage>
    <RegisterPage
    v-else-if="currentPage == 'registerPage'"
    @registerSubmit="registerParent">
    </RegisterPage>
    <DashboardPage
    v-else-if="currentPage=='dashboardPage'"
    @fetchTask="checkAuth"
    :tasksData = tasks>
    </DashboardPage>
  </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from "./views/login";
import RegisterPage from "./views/Register"
import DashboardPage from "./views/Dashboard"
import NavBar from "./views/NavBar"
export default {
    name: 'app',
    data() {
        return {
            message: "Hello worlds",
            currentPage:'loginPage',
            tasks: []
    };
    },
    components: {
        LoginPage,
        RegisterPage,
        DashboardPage,
        NavBar
    },
    methods:{
        checkAuth() {
            if (localStorage.access_token) {
                this.currentPage = 'dashboardPage'
                this.fetchTasks()
            } else {
                this.currentPage = 'loginPage'
            }
        },
        loginParent(payload) {
            console.log(payload)

            axios({
                url: '/users/login',
                method: 'POST',
                data: payload
            })
            .then(({data}) => {
                this.currentPage= 'dashboardPage'
                localStorage.setItem('access_token', data.access_token)
            })
            .catch(err => {
                console.log(err, 'ini error login')
            })
        },

        fetchTasks() {
            axios({
                url: '/tasks',
                method: 'GET',
                headers: {
                        access_token: localStorage.access_token
                        }
            })
            .then(({data}) => {
                console.log(data)
                this.tasks = data
            })
            .catch(err => {
                console.log(err, 'ini error fetch')
            })
        },

        changePage(pageName) {
            this.currentPage= pageName
        },

        registerParent(payload) {
            console.log(payload)
            axios({
                url: '/users/register',
                method: 'POST',
                data: payload
            })
            .then(({data}) => {
                console.log(data)
            })
            .catch(err => {
                console.log(err, 'ini error register')
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