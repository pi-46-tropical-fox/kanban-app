<template>
  <div>
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Update Task</h5>
                <form @submit.prevent="submitEditTask" class="form-updateTask">

                    <div class="form-label-group">
                        <label for="updateTaskTitle">Task Title</label>
                        <input type="text" v-model="title" class="form-control">
                    </div>

                    <div class="form-label-group">
                        <label for="updateCategory">Category</label>
                        <input type="text" v-model="category" class="form-control">
                    <span class="text-muted" style="font-size: 12px">Default options: Backlog / Todo / Doing / Completed</span>
                    </div><br>

                    <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Update Task</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'EditTaskPage',
    props: ['taskId'],
    data() {
        return {
            title: '',
            category: ''
        }
    },
    methods: {
        getTask() {
            axios({
                method: 'GET',
                url: `/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
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
        submitEditTask() {
            axios({
                method: 'PUT',
                url: `/tasks/${this.taskId}`,
                data: {
                    title: this.title,
                    category: this.category
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({data}) => {
                console.log(data);
                this.title = ''
                this.category = ''
                this.$emit('toPage', 'homePage')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>