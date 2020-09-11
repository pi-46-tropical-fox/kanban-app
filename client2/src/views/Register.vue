<template>
    <div>
        <section id="login-page">
            <div class="login-page-left">
                <h1>Kanban</h1>
            </div>
            <div class="login-page-right">
                <h1>Sign in</h1>
                <form @submit.prevent="submitRegister">
                    <label style="font-family: 'Ubuntu Condensed', sans-serif;">Email</label>
                    <input type="email" id="email-login" placeholder="email" v-model="email" required>
                    <label style="font-family: 'Ubuntu Condensed', sans-serif;">Password</label>
                    <input type="password" v-model="password" placeholder="password" required>
                    <button class="register-btn" id="pass-login" type="submit">Sign Up</button>
                </form>
                <hr>
                <br>
            </div>
        </section>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'RegisterPage',
    data() {
        return{
            email: '',
            password: ''
        }
    },
    methods: {
        submitRegister() {
            axios({
                method: 'POST',
                url: '/register',
                data: {
                    email: this.email,
                    password: this.password,
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.$emit('emitToPage', 'Login')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>
</style> 
