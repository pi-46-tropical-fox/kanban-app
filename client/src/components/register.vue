<template>
  <div class="container mt-5 justify-content-center" id="form-register">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Form Register</div>
                        <form @submit.prevent="register" action="" id="registerForm">
                            <div class="form-group row">
                                <label for="registrasiEmail" class="col-sm-4 col-form-label">Email</label>
                                <div class="col-sm-8">
                                    <input v-model="email" type="text" name="" id="registerEmail" class="form-control">
                                </div>                                
                            </div>
                            <div class="form-group row">
                                <label for="registerPassword" class="col-sm-4 col-form-label">Password</label>
                                <div class="col-sm-8">
                                    <input v-model="password" type="password" name="" id="registerPassword" class="form-control">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <input type="submit" value="Register" class="form-control btn btn-success">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            const payload = {
                email: this.email,
                password: this.password
            }
            this.$emit('register', payload)
        }
    }

}
</script>

<style>

</style>