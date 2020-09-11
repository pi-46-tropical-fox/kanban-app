<template>
  <div>
    <div class="card mx-auto mt-5" style="width: 28rem;">
        <div class="card-body">
            <h5 class="card-title">Register</h5>
            <form @submit.prevent="register">
                <div class="form-group row justify-content-center">
                <label class="col-4">Username:</label>
                <input v-model="username" type="text" class="col-4 form-control" placeholder="Username" required>
            </div>
            <div class="form-group row justify-content-center">
                <label class="col-4">Email:</label>
                <input v-model="email" type="email" class="col-4 form-control" placeholder="Email" required>
            </div>
            <div class="form-group row justify-content-center">
                <label class="col-4">Password:</label>
                <input v-model="password" type="password" class="col-4 form-control" placeholder="Password" required>
            </div>
            <div class="row justify-content-center">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
            </form>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Register',
    data: function () {
        return {
            username: '',
            email: '',
            password: ''
            }
    },
    methods: {
        register () {
            let user = {
                username: this.username,
                email: this.email,
                password:this.password
            }

            this.$emit('register', user)
            this.username = '',
            this.email = '',
            this.password = ''
        }
    }
}
</script>

<style>

</style>