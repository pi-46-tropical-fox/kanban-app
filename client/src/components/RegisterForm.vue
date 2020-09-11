<template>
    <form @submit.prevent="register">
        <h1>Register</h1>
        <div class="form-group">
            <label>Name</label>
            <input type="text" placeholder="Name" v-model="name">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="password">
        </div>
        <input class="btn btn-primary" type="submit">
    </form>
</template>

<script>
export default {
    name : 'RegisterForm',
    methods : {
        register(){
            this.$emit('submitRegister', {email : this.email, password : this.password, name : this.name})
        }
    },
    data() {
        return {
            name : '',
            email : '',
            password : ''
        }
    }
}
</script>
