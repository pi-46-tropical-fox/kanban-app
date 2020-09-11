<template>
    <div>
        <AddTaskModal v-if="modal=='addTask'" :category="selectedCategory" @newTask="newTask"></AddTaskModal>
        <div class="row">
            <KanbanColumn @moveTask="moveTask" @deleteTask="deleteTask" @addTask="triggerAddTaskModal" v-for="category in categories" :key="category.id" :category="category" :categories="categories" :tasks="tasks">
        </div>
    </div>
</template>

<script>
import KanbanColumn from '../components/KanbanColumn'
import AddTaskModal from '../components/AddTaskModal'
import axios from '../config/axios'

export default {
    name : 'Dashboard',
    data () {
        return{
            selectedData : {},
            selectedCategory : {},
            modal : '',
            tasks : [],
            categories : []
        }
    },
    methods : {
        newTask(data){
            let access_token = localStorage.getItem('access_token')
            axios.post('/tasks', data, { headers : { access_token }}).then(res => {
                this.fetchTasks()
            })
        },
        moveTask(data){
            let access_token = localStorage.getItem('access_token')

            axios.put(`/tasks/${data.task.id}`, data, { headers : { access_token }}).then(res => {
                this.fetchTasks()
            })
        },
        fetchTasks(){
            let access_token = localStorage.getItem('access_token')

            axios.get('/tasks/categories', { headers : { access_token }}).then(categoriesRes => {
                this.categories = categoriesRes.data
                axios.get('/tasks', { headers : { access_token }}).then(tasksRes => {
                    this.tasks = tasksRes.data
                })
            })
        },
        deleteTask(data){
            let access_token = localStorage.getItem('access_token')
            axios.delete(`/tasks/${data.id}`,  { headers : { access_token }}).then(() => {
                this.fetchTasks()
            })
        },
        triggerAddTaskModal(category){
            this.modal = 'addTask'
            this.selectedCategory = category
        }
    },
    components : {
        KanbanColumn,
        AddTaskModal
    },
    mounted(){
        this.fetchTasks()
    },
    destroyed(){
        this.tasks = []
    }
}
</script>
