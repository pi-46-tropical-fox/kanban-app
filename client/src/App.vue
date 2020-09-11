<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" @click.prevent="currentPage = 'home'"><b>KanBan</b></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-if="!(currentPage == 'kanban')" @click.prevent="currentPage = 'register'">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" v-if="!(currentPage == 'kanban')" @click.prevent="currentPage = 'login'">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal" v-if="(currentPage == 'kanban')">Add</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"  v-if="(currentPage == 'kanban')" @click.prevent="logoutUser">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container-fluid">
            <Home
                v-if="currentPage === 'home'"
            ></Home>
            <Register
                v-else-if="currentPage === 'register'"
                @register="registerUser"
            ></Register>
            <Login
                v-else-if="currentPage === 'login'"
                @login="loginUser"
            ></Login>
            <Kanban
                v-else-if="currentPage === 'kanban'"
                :tasks="tasks"
                :statuses="statuses"
                @changed="changed"
            ></Kanban>
        </div>
    </div>
</template>

<script>
import axios from './config/axios'
import Home from './views/home'
import Login from './views/login'
import Register from './views/register'
import Kanban from './views/kanban'
import Add from './components/addtask'
export default {
    name: 'App',
    data() {
        return {
            message: 'Hello world',
            currentPage: 'home',
            tasks: {},
            statuses: []
        };
    },
    components: {
        Home,
        Register,
        Login,
        Kanban,
        Add
    },
    methods: {
        checkAuth () {
            if (localStorage.getItem('access_token')) {
                this.currentPage = 'kanban'
                this.getStatuses()
                this.getTasks()
            } else {
                this.currentPage = 'login'
            }
        },
        registerUser (user) {
            console.log(user);
            axios ({
                url: '/register',
                method: 'POST',
                data: user
            }).then (data => {
                this.currentPage = 'login'
            }).catch (err => {
                console.log(err);
            })
        },
        loginUser (user) {
            axios({
                url: '/login',
                method: 'POST',
                data: user
            }).then (data => {
                localStorage.setItem('access_token', data.data.access_token)
                this.currentPage = 'kanban'
            }).catch (err => {
                console.log(err);
            })
        },
        getTasks () {
            axios ({
                url: '/tasks',
                method: 'GET',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then (res => {
                this.tasks = res.data
            }).catch (err => {
                console.log(err);
            })
        },
        getStatuses () {
            axios ({
                url: '/statuses',
                method: 'GET'
            }).then (res => {
                res.data.forEach(status => {
                    this.statuses.push(status.name)
                })
            })
        },
        logoutUser () {
            localStorage.clear()
            this.currentPage = 'home'
        },
        changed () {
            this.currentPage = ''
            this.currentPage = 'kanban'
        }
    },
    created () {
        this.checkAuth()
    }
};
</script>

<style scoped>
</style>