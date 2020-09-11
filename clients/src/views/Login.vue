<template>
    <div>
        <div class="d-flex justify-content-center align-items-center" id="login-form">
            <div class="card mb-3" style="max-width: 840px;">
            <div class="d-flex justify-content-center">
            <div class="col-md-8">
                <img src="/assests/img/kanban1.svg" class="card-img" alt="gambar-kanban">
            </div>
            <div class="col-md-4">
                <div class="card-body d-flex align-items-center" style="height: 100%;">
                <form @submit.prevent="login" >
                    <div class="form-group">
                    <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp" placeholder="Email">
                    </div>
                    <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
import GoogleLogin from 'vue-google-login';
export default {
    name: "LoginPage",
    data(){
        return{
            email: '',
            password: '',
            params: {
                    client_id: "592230043654-q2c602f8u4pvod1bphsok1l7cgc38urc.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
        }
    },
    methods: {
        login(){
            let payload = {
                email: this.email,
                password: this.password
            }
            this.email = ''
            this.password = ''

            axios.post('/login', payload)
            .then(({data}) => {
                localStorage.setItem("access_token", data.access_token)
                this.$emit("changePage", "DashboardPage")
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSuccess(googleUser){
            const google_access_token = googleUser.getAuthResponse().id_token;
            axios({
                url: '/google',
                method: 'POST',
                headers: {
                    google_access_token
                }
            })
            .then(({data}) => {
                localStorage.setItem("access_token", data.access_token)
                this.$emit("changePage", "DashboardPage")
            })
            .catch(err => {
                console.log(err)
            })
        },
        onFailure(){

        }
    },
    components: {
            GoogleLogin
    }
}
</script>

<style>

</style>