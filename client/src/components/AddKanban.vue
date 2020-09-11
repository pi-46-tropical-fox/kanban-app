<template>
    <div class="container">
        <form id="form-add" style="max-width: 60%;" class="mx-auto" @submit.prevent="addTask">
            <h1 class="display-1">Add</h1>
            <div class="form-group">
                <label for="task-title">Title</label>
                <input type="text" class="form-control" id="task-title" v-model="title">
            </div>
            <div class="form-group">
                <label for="task-category">Category</label>
                <select class="custom-select" id="task-category" v-model="category">
                    <option selected>-- Select Option --</option>   
                    <option value="backlog">Backlog</option>
                    <option value="todo">To-Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            category: ''
        }
    },
    methods: {
        addTask() {
            axios({
                method: "POST",
                url: "https://kanban-app-rizkygustianto.herokuapp.com/tasks",
                data: {
                    title: this.title,
                    category: this.category
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                console.log('axios post');
                console.log(data);
                this.$emit('addedData')
            })
            // this.$emit('addedData')
        }
    }
}
</script>
