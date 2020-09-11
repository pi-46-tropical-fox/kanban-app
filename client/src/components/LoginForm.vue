<template>
    <section >
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
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
                <br>
                <div class="g-signin2" @click="onSignIn"></div>
                <br>
                <a href="#" @click="signOut;">Sign out</a>
                <br>
                <p>Don't have an account? <a href="#" @click="register">Click here</a> to register.</p>
        </div>
    </section>
</template>
<script>
export default {
name: 'LoginForm',
data: function(){
    return{
        email: '',
        password: ''
    }
},
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
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.   }
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