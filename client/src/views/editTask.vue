<template>
  <div>
    <!-- Update TASK -->
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Update Task</h5>
                <form @submit.prevent="submitEditTask" class="form-updateTask">

                    <div class="form-label-group">
                        <input type="text" v-model="task" class="form-control" required autofocus>
                        <label for="updateTaskName">Task Name</label>
                    </div>

                    <div class="form-label-group">
                        <input type="text" v-model="description" class="form-control" required autofocus>
                        <label for="updateDescription">Description</label>
                    </div><br>

                    <span class="text-darkGrey">Default options: Backlog / Todo / Doing / Done</span>
                    <div class="form-label-group">
                        <input type="text" v-model="category" class="form-control" required>
                        <label for="updateCategory">Category</label>
                    </div><br>
                
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Update Task</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'EditTaskPage',
    props: [ 'taskId' ],
    data() {
        return {
            task: '',
            description: '',
            category: ''
        }
    },
    methods: {
        getData() {
            axios({
                method: 'GET',
                url: `http://localhost:3000/tasks/${this.taskId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.task = data.task
                    this.description = data.description
                    this.category = data.category
                })
                .catch(({err}) => {
                    console.log(err)
                })
        },
        submitEditTask() {
            axios({
                method: 'PUT',
                url: `http://localhost:3000/tasks/${this.taskId}`,
                data: {
                    task: this.task,
                    description: this.description,
                    category: this.category
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.task = ''
                    this.description = ''
                    this.category = ''
                    this.$emit('emitToPage', 'Dashboard')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style>

</style>