<template>
<div class="mt-5" v-if="currentPage == 'login' || currentPage == 'register'">
    <div>
        <h1 class="front-tag mx-auto font-weight-bolder" style="color: wheat">= == == ==KANBAN== == == =</h1>
    </div>
    <div class="container front-container">
        <div class="row front-page" >
            <lottie-player src="https://assets4.lottiefiles.com/private_files/lf30_g4ft9Z.json"  background="transparent"  speed="1"  style="width: 500px; height: 500px;"  loop  autoplay></lottie-player>
              <LoginForm @login='login'  v-if="currentPage == 'login'"></LoginForm>
              <RegisterForm v-else-if="currentPage == 'register'"></RegisterForm>
        </div>
    </div>
    <div>
        <h1 class="front-tag mx-auto font-weight-bolder" style="color: wheat">= == == ==KANBAN== == == =</h1>
    </div>
  
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