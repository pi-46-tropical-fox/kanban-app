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
        <input class="btn btn-primary" type="submit">
    </form>
</template>

<script>
export default {
    name : 'LoginForm',
    data () {
        return {
            email : '',
            password : ''
        }
    },
    methods : {
        login(){
            this.$emit('submitLogin', { email : this.email, password : this.password })
        }
    }
}
</script>