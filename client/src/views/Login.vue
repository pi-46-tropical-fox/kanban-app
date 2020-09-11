<template>
<div class="d-flex align-items-center min-vh-100">
    <div class="container">
        <form id="form-login" style="max-width: 60%;" class="mx-auto card shadow rounded" @submit.prevent="login">
            <div class="card-body">
                <h1 class="display-1 card-title p-2">Login</h1>
                <br>
                <div class="form-group">
                    <label for="login-email">Email address</label>
                    <input type="email" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
                <hr>
                <!-- <p class="text-center">OR</p> -->
                <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure" class="btn btn-light btn-block"><i class="fab fa-google"></i>  Login with Google</GoogleLogin>
            </div>
        </form>
        <div style="max-width: 60%;" class="mx-auto mt-5" >
            <button class="btn btn-outline-primary btn-block" @click="register">Don't have an Account? Register here!</button>
        </div>
    </div>
</div>
    
</template>
<script>
import axios from 'axios'
import GoogleLogin from 'vue-google-login'
export default {
    components: {
        GoogleLogin
    },
    data() {
        return {
            email: '',
            password: '',
            // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
            params: {
                client_id: "347093637379-qou7qfuvmej3o7cshqtr75se61r0e930.apps.googleusercontent.com"
            },
            // only needed if you want to render the button with the google ui
            // renderParams: {
            //     width: 250,
            //     height: 50,
            //     longtitle: true
            // }
        }
    },
    methods: {
        login() {
            axios({
                method: "POST",
                url: "https://kanban-app-rizkygustianto.herokuapp.com/login",
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                console.log('axios post');
                // console.log(data);
                localStorage.setItem('access_token', data.access_token)
                this.$emit('loggedIn')
            })
        },
        register() {
            this.$emit('moveToRegister')
        },
        onSuccess(googleUser) {
            console.log(googleUser.wc.id_token);
            // console.log(auth2.isSignedIn.get());
            // console.log(auth2.currentUser.get())
            // This only gets the user information: id, name, imageUrl and email
            // console.log(googleUser.getBasicProfile());
            axios({
                method: "POST",
                url: "https://kanban-app-rizkygustianto.herokuapp.com/googlelogin",
                headers: {
                    google_access_token: googleUser.wc.id_token
                }
            })
            .then(({data}) => {
                console.log('axios post');
                // console.log(data);
                localStorage.setItem('access_token', data.accessToken)
                this.$emit('loggedIn')
            })
        },
        onFailure(err) {
            console.log(err);
        }
    }
}
</script>