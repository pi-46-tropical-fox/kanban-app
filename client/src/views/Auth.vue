<template>
    <div>
        <RegisterForm @submitRegister='submitRegister'></RegisterForm>
        <LoginForm @submitLogin='submitLogin'></LoginForm>
    </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

export default {
    name : 'Auth',
    methods : {
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
