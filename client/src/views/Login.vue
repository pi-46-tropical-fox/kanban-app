<template>
    <div>
      <div class="container-form">
            <form class="box-form"  @submit.prevent="login">
                <div class="tabs">
                    <ul>
                      <li class="is-active"><a>Login</a></li>
                      <li v-on:click="switchRegister"><a>Register</a></li>
                    </ul>
                  </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email"  v-model="email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password">
                    </div>
                </div>
                <button class="button is-info" type="submit">Login</button>
                <GoogleLogin :params="params" :onSuccess="onSuccess" style="padding: 0; border: none">
                    <img src="https://raw.githubusercontent.com/rmartide/vue-google-login/master/images/ui.png" style="width: auto; height: auto">
                </GoogleLogin>
            </form>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            params: {
                    client_id: "49894177923-1bd80rp3j1v4s7l6gkloobtn7psq8ivk.apps.googleusercontent.com"
            }, 
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    // mounted() {
    // gapi.signin2.render('google-signin-button', {
    //   onsuccess: this.onSignIn
    // })
    // },
    methods: {
        login() {
            let payload = {
                email : this.email,
                password : this.password
            }
            this.$emit('loginSubmit', payload)
        },
        onSuccess(googleUser) {
            console.log(googleUser);
            this.$emit('googleLogin', googleUser)
        },
        switchRegister() {
            this.$emit('switchRegister')
        }
    },
    components: {
        GoogleLogin
    }
}
</script>

<style>

</style>