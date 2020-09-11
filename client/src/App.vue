<template>
    <div>
        <Navbar :isLogin="isLogin" @toPage="page"></Navbar>
        <div>
            <LoginPage 
                v-if="currentPage === 'loginPage'"
                @loginSubmit='login'
                @toPage='page'
            ></LoginPage>
            <RegisterPage
                v-else-if="currentPage === 'registerPage'"
                @toPage='page'
            ></RegisterPage>
            <DashboardPage 
                v-else-if="currentPage === 'homePage'"
                :tasksData="tasks"
                :categoryData='category'
                @toPage='page'
                @delete="deleteTask"
                @emitUpdateTask="updateTask"
            ></DashboardPage>
            <AddTaskPage 
                v-else-if="currentPage === 'addTaskPage'"
                @toPage="page"
            ></AddTaskPage>
            <EditTaskPage 
                v-else-if="currentPage === 'editTaskPage'"
                :taskId="taskId"
                @toPage="page"
            ></EditTaskPage>
        </div>
    </div>
</template>

<script>
import axios from './config/axios'
import LoginPage from './views/Login'
import RegisterPage from './views/Register'
import DashboardPage from './views/Dashboard'
import Navbar from './components/Navbar'
import AddTaskPage from './components/AddNewTask'
import EditTaskPage from './views/EditTaskPage'

export default {
    name: 'KanbanApp',
    data() {
        return {
            isLogin: false,
            taskId: 0,
            currentPage: 'loginPage',
            tasks: [],
            category: [{
                name: 'Backlog',
                backgroundColor: 'bg-light'
            },
            {
                name: 'Todo',
                backgroundColor: 'bg-light'
            },
            {
                name: 'Doing',
                backgroundColor: 'bg-light'
            },
            {
                name: 'Completed',
                backgroundColor: 'bg-light'
            }]
        };
    },
    // daftar components
    components: {
        LoginPage,
        DashboardPage,
        Navbar,
        AddTaskPage,
        RegisterPage,
        EditTaskPage
    },
    methods: {
        checkAuth() {
            if (localStorage.access_token) {
                this.currentPage = 'homePage'
                this.isLogin = true
                this.getTask()
            } else {
                this.currentPage = 'loginPage'
                this.isLogin = false
            }
        },
        login(payload) {
            axios.post('/login', payload)
            .then(({data}) => {
                console.log(data);
                localStorage.setItem('access_token', data.access_token)
                this.currentPage = 'homePage'
            })
            .catch(err => {
                console.log(err);
            })
        },
        getTask() {
            axios.get('/tasks', {headers: {access_token: localStorage.access_token}})
            .then(({data}) => {
                console.log(data);
                this.tasks = data
            })
            .catch(err => {
                console.log(err);
            })
        },
        page(value) {
            if (value == 'logout') {
                this.logout()
            } else {
                this.currentPage = value
                this.getTask()
            }
        },
        logout() {
            localStorage.clear()
            this.isLogin = false
            this.currentPage = 'loginPage'
        },
        deleteTask() {
            this.getTask()
        },
        updateTask(id) {
            // console.log(id);
            this.taskId = id
            this.currentPage = 'editTaskPage'
        }
    },
    created() {
        this.checkAuth()
    }
};
</script>

<style scoped>
</style>