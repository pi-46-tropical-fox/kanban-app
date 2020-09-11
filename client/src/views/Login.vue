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
                <div class="g-signin2" :onsuccess="onSignIn" v-on:click="onSignIn"></div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
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
        onSignIn(user) {
            console.log(user, '<<<<<<<< user')
            this.$emit('googleLogin', user)
        },
        switchRegister() {
            this.$emit('switchRegister')
        }
    }
}
</script>

<style>

</style>