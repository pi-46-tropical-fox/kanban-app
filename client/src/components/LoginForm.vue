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
        //Emit to parent
        const payload = {
            email: this.email,
            password: this.password
        }
        this.$emit('login', payload);
        this.email ='';
        this.password='';
    }
}
}
</script>

<style>

</style>