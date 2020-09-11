<template>
    <div class="container">
        <form id="form-add" style="max-width: 60%;" class="mx-auto" @submit.prevent="updateData">
            <h1 class="display-1">Edit</h1>
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
    props: ['taskId'],
    data() {
        return {
            title: '',
            category: ''
        }
    },
    methods: {
        getData() {
            console.log('in getData edit');
            console.log(this.taskId, '<< task id di edit');
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                console.log(data);
                this.title = data.title
                this.category = data.category
            })
            .catch(err => {
                console.log(err);
            })
        },
        updateData() {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(res => {
                console.log(res);
                this.$emit('updatedData')
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    created() {
        this.getData()
        // console.log(this.taskId);
    }
}
</script>