<template>
    <div>
        <div class="login" >
            <div class="buttonLogin">
                <a href="" class="signin" v-on:click.prevent='signIn'>Sign In</a>
                <a href="" class= "register" v-on:click.prevent='register'>Register</a>
            </div>
            <form class="loginForm" action="" method="post" @submit.prevent='login'>
                <div class="registerTitle">
                    <h2>Login Form</h2>
                </div>
                <div class="input-group">
                    <input type="text" v-model="email" placeholder="Email"/>
                </div>
                <div class="input-group">                        
                    <input type="password" v-model="password" placeholder="Password"/>
                </div>
                <div class="input-group">
                    <input type="submit" value="Login">
                </div>
            </form>
            <div class="googleLogin">
                <p>Sign in with your Google account</p>
            </div>
            <!-- <div class="g-signin2" data-onsuccess="onSignIn" ></div> -->
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name : "loginPage",
    data() {
        return {
            email : '',
            password : '',
            
        }
    },
    methods: {
        login () {
            let payload = {
                email : this.email,
                password : this.password
            }

            axios({
                url: '/login',
                method: "POST",
                data : payload
            })
            .then( ({data}) => {
                // console.log(data.access_token)
                console.log(data)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('id', data.id)
                localStorage.setItem('name', data.name)
                localStorage.setItem( 'organization', data.organization)
                this.$emit('loginSubmit') 
            })
            .catch( err => {
                console.log(err)
            })
        },
        register () {
            this.$emit('register')
        },
        signIn () {
            this.$emit('signin')
        }
    }
}
</script>

<style>

</style>
