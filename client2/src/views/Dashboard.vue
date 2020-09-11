<template>
    <div>
        <Navbar @emitToPage="toPage"> </Navbar>
        <div class="container-fluid d-flex justify-content-between col-9" >
            <div class="card-body col-sm-6">
            <!---->
            <CardBody v-for="(category, i) in categories" :key="i" :categoryName="category"
            :tasksData="tasks"><CardBody>
            <!---->
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import axios from 'axios'
import CardBody from '../components/CardBody'
import CardTask from '../components/CardTask'
export default {
    data(){
        return {
            tasks: [],
            categories: ['backlog', 'todo', 'doing', 'done']
        }
    },
    name: 'Dashboard',
    components: {
        CardBody,
        CardTask,
        Navbar
    },
    methods:{
        fetchTask(){
            console.log(localStorage.access_token)
            axios({
                url: 'http://localhost:3000/tasks',
                method: 'GET',
                headers: {access_token: localStorage.token}
                
            })
            //axios.post("/login", payload)

            .then(({data}) => {
                console.log(data)
                this.tasks =  data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        toPage(value) {
            this.$emit('emitToPage', value)
        }
    },
    created(){
        console.log('masuk created dashboard')
        this.fetchTask()
    }
}
</script>