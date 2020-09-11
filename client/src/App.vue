<template>
    <div>
        <Navbar :page="page" @logout="logout"></Navbar>
        <div class="mx-auto mt-8">
            <Auth v-if="page == 'auth'" @submitLogin='login' @submitRegister='register' @submitGoogleLogin='googleLogin'></Auth>
            <Dashboard v-else-if="page == 'dashboard'"></Dashboard>
        </div>
    </div>
</template>
<script>
import Auth from './views/Auth'
import Dashboard from './views/Dashboard'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import Vue from 'vue'
import axios from './config/axios'
import swal from 'sweetalert2'


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
            Vue.GoogleAuth.then(auth2 => {
                auth2.signOut()
            })
            localStorage.clear()
        },
        googleLogin(data){
            axios.post('/user/googlelogin', data).then(res => {
                console.log(res)
                localStorage.setItem('access_token', res.data.access_token)
                localStorage.setItem('email', res.data.email)
                this.page = 'dashboard'
            })
        },
        register(data){
            axios.post('/user/register', data).then(res => {
                swal.fire({
                    icon : 'success',
                    title : 'Successfully registered'
                })
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
