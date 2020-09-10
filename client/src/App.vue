<template>
    <div id="app">
        <div class="container">
            <Auth @submitLogin='login' @submitRegister='register'>


        </div>
    </div>
</template>
<script>
import Auth from './views/Auth'
import axios from './config/axios'

export default {
    name : 'App',
    methods : {
        register(data){
            console.log(data)
            // axios.post('/user/register', )
            console.log('register dipanggil')
        },
        login(data){
            console.log('login dipanggil')
        }
    },
    data() {
        return{
            
        }
    },
    components : {
        Auth
    }
}
</script>
