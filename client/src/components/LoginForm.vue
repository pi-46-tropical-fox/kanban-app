<template>
    <div class="container" id="login-page">
        <form id="login-form" @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="password">
            </div>
            <div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
             Or
            <br>
            <googleSignIn></googleSignIn>
        <br>
        <p>Don't have an account? <a style="text-decoration:none" href="#" @click="register">Click here</a> to register.</p>
    </div>
</template>
<script>
import googleSignIn from '../components/googleSignIn'
export default {
name: 'LoginForm',
data: function(){
    return{
        email: '',
        password: ''
    }
},
components:{googleSignIn},
methods: {
    login (){
        const payload = {
            email: this.email,
            password: this.password
        }
        this.$emit('login', payload);
        this.email ='';
        this.password='';
    },
    register(){
        const current = 'register'
        this.$parent.$parent.changeCurrent(current)
    },
    onSignIn(googleUser) {
        console.log('masuk ke login form')
        this.$parent.$parent.googleLogin(googleUser)
    },  
    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
    })}
}
}
</script>

<style>

</style>