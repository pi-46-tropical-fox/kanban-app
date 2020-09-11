<template>
    <div class="container-fluid mt-4 pt-4">
        <div class="row justify-content-around">
            <div class="col-sm">
                <div class="card">
                    <div class="card-body">
                        <RegisterForm @submitRegister='submitRegister'></RegisterForm>
                    </div>
                </div>
            </div>
            <div class="col-sm">
                <div class="card">
                    <div class="card-body">
                        <LoginForm @submitLogin='submitLogin' @submitGoogleLogin='submitGoogleLogin'></LoginForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
    name : 'Auth',
    methods : {
        submitGoogleLogin(data){
            this.$emit('submitGoogleLogin', data)
        },
        submitRegister(data){
            this.$emit('submitRegister', data)
        },
        submitLogin(data){
            this.$emit('submitLogin', data)
        }
    },
    components : {
        LoginForm,
        RegisterForm
    }
}
</script>
