<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <div class="col-12 form-input">
                    <form @submit.prevent="submitEditTask">
                        <h1>Edit Your Task</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Title" v-model="title">
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control"  placeholder="Description" v-model="description">
                        </div>
                        <div class="form-group">
                          <input type="date" class="form-control"  placeholder="Due_Date" v-model="due_date">
                        </div>
                        <button type="submit" class="btn btn-success mb-3">Submit Edit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>  

</template>

<script>
export default {
    name:"EditTaskForm",
    props: ['taskData'],
    data() {
        return {
            title: '',
            description: '',
            due_date: '',
        }
    },    
    methods: {
        submitEditTask() {
 	        let payload = {
                id: this.taskData.id,
				title: this.newTodo,
                description: this.description,
                due_date : this.due_date
				}
			this.$emit('editTask', payload)
            this.newTodo = ''    
            this.description = ''
        }
    },
    created() {
        this.title = this.taskData.title
        this.description = this.taskData.description
        this.due_date = this.taskData.due_date
    }

}
</script>

<style>

</style>