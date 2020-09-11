<template>
    <section id="auth">
        <Logo :settings="settings"></Logo>
        <!--  -->
        <AuthForm @login="login" @register="register" @googleLogin="googleLogin"></AuthForm>
    </section>
</template>

<script>
import Logo from '../components/Logo'
import AuthForm from '../components/auth/AuthForm'

export default {
    name: "AuthPage",

    props: ['settings'],

    components: {
        Logo,
        AuthForm
    },

    data: function() {
        return {}
    },

    methods: {
        login(payload){
            this.$emit('login', payload)
        },
        register(payload){
            this.$emit('register', payload)
        },
        googleLogin(googleUser){
            this.$emit('googleLogin', googleUser)
        },
    }
}
</script>

<style>

</style>