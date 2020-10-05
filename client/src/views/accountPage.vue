<template>
  <div>
    <Login v-if="currentForm === 'login'" @isLogin="isLogin" @openRegister="openRegister" @getTask = "getTask"></Login>
    <Register v-else @openLogin = "openLogin"></Register>
    <Google ></Google>
  </div>
</template>

<script>
import Login from '../components/loginCmp'
import Register from '../components/registerCmp'
import Google from '../components/googleSigin'
export default {
    name : 'Authpage',
    components : {
        Login,
        Register,
        Google
    },
    data(){
        return{
            currentForm : 'login'
        }
    },
    methods :{
        isLogin(payload){
            this.$emit('isLogin', payload )
        },
        openRegister(payload){
            console.log('masuk open register');
            
            this.currentForm = payload
        },
        openLogin(payload){
            console.log('masuk open login');
            
            this.currentForm = payload
        },
        getTask(){
            console.log('succes')
            this.$emit('getTask')
        }
    }
}
</script>

<style>

</style>


