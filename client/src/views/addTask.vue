<template>
  <div>
    <!-- ADD TASK -->
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Add Task</h5>
                <form @submit.prevent="submitAddTask" class="form-addTask">

                    <div class="form-label-group">
                        <input type="text" v-model="task" class="form-control" placeholder="Task Name" required autofocus>
                        <label for="addTaskName">Task Name</label>
                    </div>

                    <div class="form-label-group">
                        <input type="text" v-model="description" class="form-control" placeholder="Description" required autofocus>
                        <label for="addDescription">Description</label>
                    </div><br>

                    <span class="text-darkGrey">Default options: Backlog / Todo / Doing / Done</span>
                    <div class="form-label-group">
                        <input type="text" v-model="category" class="form-control" placeholder="Category" required>
                        <label for="addCategory">Category</label>
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
export default {
    name: 'AddTaskPage',
    data() {
        return {
            task: '',
            description: '',
            category: ''
        }
    },
    methods: {
        submitAddTask() {
            console.log('mashook')
            axios({
                method: 'POST',
                url: `http://localhost:3000/tasks`,
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    task: this.task,
                    description: this.description,
                    category: this.category
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.task = ''
                    this.description = ''
                    this.category = ''
                    this.$emit('emitToPage', 'Dashboard')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        }
    }

}
</script>

<style>

</style>