<template>
    <div>
        <!-- <h1>{{ message }}</h1> -->
        <!-- <p>{{ tasks }}</p> -->
        <div class="container-fluid">
                <div class="row flex-row flex-sm-nowrap py-3">
                    <KanbanCategory v-for="(category,i) in categories" :key="i" :categoryName="category" :tasksData="tasks" @fetchTasks="getTasks" @editTask="editTask"></KanbanCategory>
                </div>
        </div>

    </div>
</template>

<script>
import KanbanCategory from "../components/KanbanCategory";
import KanbanAdd from '../components/AddKanban'
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            // message: 'Test'
            tasks: [],
            categories: ['backlog','todo','doing','done']
        }
    },
    components: {
        KanbanCategory
    },
    methods: {
        getTasks() {
            axios({
                method: "GET",
                url: "https://kanban-app-rizkygustianto.herokuapp.com/tasks",
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                console.log('axios get');
                console.log(data);
                this.tasks = data
            })
        },
        editTask(id) {
            this.$emit('editTask',id)
        }
    },
    created() {
        this.getTasks()
    }
}
</script>