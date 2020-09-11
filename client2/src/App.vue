<template>
<div>
    <Navbar  @emitToPage="toPage"> </Navbar>
    <LoginPage v-if="currentPage ==='loginPage'" @loginSubmit="login"></LoginPage>
    <DashboardPage v-else-if="currentPage === 'dashboardPage'"></DashboardPage>
</div>
</template>

<script>
import NavBar from './components/navbar'
import axios from 'axios'
import LoginPage from './views/Login'
import DashboardPage from './views/Dashboard'
export default {
    components: {
        LoginPage,
        DashboardPage
    },
    data() {
        return {
            message: 'Hello world',
        };
    },
    data() {
        return {
            message: "halo",
            currentPage: "loginPage",
            tasks: []
        }
    },
    methods:{
        login(payload){
            axios({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data: payload
            })
            //axios.post("/login", payload)

            .then(({data}) => {
                console.log(data.access_token, '<<<<<<<<<< data')
                this.currentPage = 'dashboardPage'
                //localStorage.setItem('access_token', data.access_token)
                localStorage.token = data.access_token
            })
            .catch(err =>{
                console.log(err)
            })
        },
        toPage(value) {
            logout()
        },
        logout(){
            localStorage.clear()
            this.currentPage = 'loginPage'
        }
    },
    created() {
        if (localStorage.access_token) {
            this.currentPage = 'dashboardPage'
        }
        else{
            this.currentPage = 'loginPage'
        }
    }
};
</script>

<style scoped>
</style>