<template>
  <div>
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">New Task</h5>
                <form @submit.prevent="submitAddTask" class="form-addTask">

                    <div class="form-label-group">
                        <label for="addTaskTitle">Task Title</label>
                        <input type="text" v-model="title" class="form-control">
                    </div>
                    <div class="form-label-group">
                        <label for="addCategory">Category</label>
                        <input type="text" v-model="category" class="form-control">
                    </div><br>

                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Add Task</button>
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
    name: 'AddTaskPage',
    data() {
        return {
            title: '',
            category: ''
        }
    },
    methods: {
        submitAddTask() {
            // axios.post('/tasks',  {
            //     headers: {
            //         access_token: localStorage.access_token},
            //     data: {
            //         title: this.title,
            //         category: this.category
            //     }
            // })
            axios({
                method: 'POST',
                url: '/tasks',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(({data}) => {
                console.log(data);
                this.title = '',
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