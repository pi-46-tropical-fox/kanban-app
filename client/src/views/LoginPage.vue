<template>
    <div id="login-page">
        <div class="container">
        <div class="image-container"></div>
        <div class="form-container">
            <div class="heading">
                <div class="msg" v-html="message"></div>
                <h1>Login into your account</h1>
            </div>
            <div class="form-box">
                <form @submit.prevent="login">
                    <div class="form-input">
                        <span><i class="fa fa-envelope"></i></span>
                        <input type="email" placeholder="Email Address" v-model="email" >
                    </div>
                    <div class="form-input">
                        <span><i class="fa fa-lock"></i></span>
                        <input type="password" placeholder="Password" v-model="password" >
                    </div>
                    <div style="text-align: left;">
                        <button type="submit" class="btn">Login</button>
                        <!-- <p>or login with :</p>
                        <div style="text-align: center;" class="g-signin2" data-onsuccess="onSignIn"></div> -->
                    </div>
                    <div style="color: #fff">Don't have an account?
                        <a href="" @click.prevent="showRegisterForm" class="register-link">Register here</a>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',   
    props: ['message'],
    data(){
        return{
            email: '',
            password: '',
            alerthtml: ''
        }
    },
    methods: {
        clearField(){
            this.email = ''
            this.password = ''
        },
        login(){
            let user = {
                email: this.email,
                password: this.password
            }
            this.$emit('login', user)
            this.clearField()
        },
        showRegisterForm(){
            this.$emit('showRegisterForm')
            this.clearField()
        }
    }

}
</script>

<style>

</style>