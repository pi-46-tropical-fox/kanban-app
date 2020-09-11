<template>
    <form @submit.prevent="login">
        <h1>Login</h1>
        <div class="form-group">
            <label>Email</label>
            <input class="form-control" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input class="form-control" type="password"  placeholder="Password" v-model="password">
        </div>
         <GoogleLogin :params="googleParams" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
        <input class="btn btn-primary" type="submit">
    </form>
</template>

<script>
import GoogleLogin from 'vue-google-login'
import Vue from 'vue'
import googleParams from '../config/googleParams'

export default {
    name : 'LoginForm',
    data () {
        return {
            email : '',
            password : '',
            googleParams,
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    methods : {
        onSuccess(googleUser){
            const google_access_token = googleUser.wc.id_token
            this.$emit('submitGoogleLogin', { google_access_token })
        },
        onFailure(){},
        login(){
            this.$emit('submitLogin', { email : this.email, password : this.password })
        }
    },
    components : { 
        GoogleLogin
    }
}
</script>