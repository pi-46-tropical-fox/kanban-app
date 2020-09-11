<template>
  <div>
    <Login v-if="currentForm === 'login'" @isLogin="isLogin" @openRegister="openRegister" @getTask = "getTask"></Login>
    <Register v-else @openLogin = "openLogin"></Register>
  </div>
</template>

<script>
import Login from '../components/loginCmp'
import Register from '../components/registerCmp'
export default {
    name : 'Authpage',
    components : {
        Login,
        Register
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


