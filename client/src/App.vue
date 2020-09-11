<template>
<div>
    <NavBar :page="page" @logout="logout" ></NavBar>
    <div class="pt-5"></div>
    <LoginPage v-if="page === 'loginPage'" @changePage="changePage" :baseUrl="baseUrl"></LoginPage>
    <RegisterPage v-if="page === 'registerPage'" @changePage="changePage" :baseUrl="baseUrl"></RegisterPage>
    <Dashboard v-if="page === 'dashboard'" :tasks="tasks" :baseUrl="baseUrl" @fetchTasks="fetchTasks"></Dashboard>
</div>
</template>

<script>
import LoginPage from './components/LoginPage.vue'
import NavBar from './components/Navbar.vue'
import RegisterPage from './components/RegisterPage.vue'
import Dashboard from './components/Dashboard.vue'
import axios from 'axios'
export default {
    name:'App',
    data(){
        return {
            page:'loginPage',
            baseUrl:"https://thawing-bastion-24284.herokuapp.com/"
            //baseUrl: 'http://localhost:3000',
            tasks:[]
        }
    },
    components:{
        LoginPage,
        NavBar,
        RegisterPage,
        Dashboard
    },
    methods:{
        changePage(page){
            this.page = page
            if(page==='dashboard'){
                this.fetchTasks()
            }
        },
        logout(){
            this.page = 'loginPage'
            localStorage.clear()
        },
        fetchTasks(){
            axios({
                method :'GET',
                url : this.baseUrl +'/tasks',
                headers : {
                    access_token:localStorage.token
                }
            })
            .then(res=>{
              this.tasks = res.data
            })
            .catch(err=>{
                console.log(err.response);
            })
       },
    },
    created(){
        if(localStorage.getItem('access_token')){
            this.page = 'dashboard'
            this.fetchTasks()
        } else{
            this.page= 'loginPage'
        }
    }
}
</script>

<style>

</style>