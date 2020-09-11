<template>
    <div class="card mx-auto mt-5" style="width: 28rem;">
    <div class="card-body">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="login">
            <div class="form-group row justify-content-center">
                <label class="col-4">Email:</label>
                <input v-model="email" type="email" class="col-4 form-control" placeholder="Email">
            </div>
            <div class="form-group row justify-content-center">
                <label class="col-4">Password:</label>
                <input v-model="password" type="password" class="col-4 form-control" placeholder="Password">
            </div>
            <div class="row justify-content-center">
                <button type="submit" class="btn btn-primary col-3">Login</button>
                <div class="g-signin2 col-3" data-onsuccess="onSignIn"></div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'login',
    data: function () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login () {
            let user = {
                email: this.email,
                password: this.password
            }

            this.$emit('login', user)
            this.email = ''
            this.password = ''
        },
        onSignIn(googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            
        }
    }
}
</script>

<style>

</style>