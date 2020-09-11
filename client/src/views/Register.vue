<template>
    <div class="d-flex align-items-center min-vh-100">
    <div class="container">
        <form id="form-login" style="max-width: 60%;" class="mx-auto card" @submit.prevent="register">
            <div class="card-body">
                <h1 class="display-1 card-title p-2">Register</h1>
                <br>
                <div class="form-group">
                    <label for="login-email">Email address</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
        </form>
        <div style="max-width: 60%;" class="mx-auto mt-5" >
            <button class="btn btn-outline-primary btn-block" @click="login">Have an Account? Login here!</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            axios({
                method: "POST",
                url: "http://localhost:3000/register",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                console.log('axios post register')
                // console.log(data);
                // localStorage.setItem('access_token', data.access_token)
                this.$emit('moveToLogin')
            })
        },
        login() {
            this.$emit('moveToLogin')
        }
    }
}
</script>