<template>
  <div>
      <div class="registration">
            <div class="buttonRegister">
                <a href="" class="btnsignin" v-on:click.prevent='signIn'>Sign In</a>
                <a href="" class= "btnregister" v-on:click.prevent='register'>Register</a>
            </div>
            <form class="registerForm" action="" method="post" v-on:submit.prevent="registerSubmit">
                <div class="registerTitle">
                    <h2>Register Form</h2>
                </div>
                <div class="input-group">
                    <input type="text" v-model='name' placeholder="Name"/>
                </div>
                <div class="input-group">
                    <input type="text" v-model='email' placeholder="Email"/>
                </div>
                <div class="input-group">                        
                    <input type="password" v-model='password' placeholder="Password"/>
                </div>
                <div class="input-group">
                    <input type="submit" value="Register">
                </div>
            </form>
        </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'registerPage',
    data () {
        return {
            name: '',
            email: '',
            password:''
        }
    },
    methods : {
        registerSubmit () {
            let payload = {
                name: this.name,
                email: this.email,
                password:this.password
            }
            console.log(payload)
            axios ({
                url: '/register',
                method: "POST",
                data : payload
            })
            .then( ({response}) => {
                
                this.$emit('registerSubmit')
                this.name = ''
                this.email = ''
                this.password = ''
            })
            .catch( err => {
                console.log(err)
            })
        },
        register () {
            this.$emit('register')
        },
        signIn () {
            this.$emit('signin')
        
        }
    }
    

}
</script>

<style>

</style>