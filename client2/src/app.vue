<template>
    <div class="container">
        <LoginPage @loginSubmit='loginSubmit'></LoginPage>
    </div>

</template>

<script>
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
import MainPage from './views/MainPage'
export default {
    name : 'app',
    data () {
        currentPage: 'LoginPage'
    },
    components : {
        LoginPage,
        RegisterPage,
        MainPage
    },
    methods : {
        checkAuth() {
            if(localStorage.access_token) {
                this.loginSubmit()
            } else {
                this.currentPage = "LoginPage"
            }
        },


        loginSubmit () {
            this.currentPage = "MainPage"
        }
    },
    created () {
        this.checkAuth()
    }

    

}
</script>

<style>

</style>