<template>
<div>
    <LoginForm @login='login'  v-if="currentPage == 'login'"></LoginForm>
    <RegisterForm v-else-if="currentPage == 'register'"></RegisterForm>
</div>
  
</template>

<script>
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm'
export default {
name: 'AuthPage',
components: {
    LoginForm,
    RegisterForm
},
props:['currentPage'],
methods:{
 login(payload){
    this.$emit('login', payload);
 }
}
}
</script>


<style>

</style>