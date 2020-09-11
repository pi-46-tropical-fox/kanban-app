<template>
    <div>
        <Navbar :page="page" @logout="logout"></Navbar>
        <div class="mx-auto container mt-8">
            <Auth v-if="page == 'auth'" @submitLogin='login' @submitRegister='register'></Auth>
            <Dashboard v-else-if="page == 'dashboard'"></Dashboard>
        </div>
    </div>
</template>
<script>
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.css'

import axios from './config/axios'

export default {
    name : 'App',
    methods : {
        checkAuth(){
            if(localStorage.getItem('access_token')){
                this.page = 'dashboard'
            } else {
                this.page = 'auth'
            }
        },
        logout(){
            this.page = 'auth'
            localStorage.clear()
        },
        register(data){
            axios.post('/user/register', data).then(res => {
                console.log(res)
            })
        },
        login(data){
            axios.post('/user/login', data).then(res => {
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('email', res.data.email)
                this.page = 'dashboard'
            })
        }
    },
    data() {
        return{
            page : 'auth',
        }
    },
    components : {
        Auth,
        Dashboard,
        Navbar
    },
    created() {
        this.checkAuth()
    }
}
</script>
