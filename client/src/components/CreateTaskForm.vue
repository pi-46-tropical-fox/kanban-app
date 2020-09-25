<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content shadow-lg">
                <div class="col-12 form-input" style=" color:white;background-color: #797a7e;">
                    <form @submit.prevent="submitTask">
                        <h1>Create Your Task</h1>
                        <div class="form-group">
                          <input type="text" class="form-control" placeholder="Title" v-model="title">
                        </div>
                        <div class="form-group">
                          <input type="text" class="form-control"  placeholder="Description" v-model="description">
                        </div>
                        <div class="form-group">
                          <input type="date" class="form-control"  placeholder="Due_Date" v-model="due_date">
                        </div>
                        <button type="submit" class="btn mb-3" style="background-color: #89beb3; color:white;">Create Now!</button>
                    </form>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    name: 'CreateTaskForm',
    data() {
        return {
            title: '',
            description: '',
            due_date: '',
        }
    },
    methods: {
        submitTask() {
            let payload = {
                title: this.title,
                description: this.description,
                due_date: this.due_date,
            }
            this.$emit('createTask', payload)
            this.title = '',
            this.description = '',
            this.due_date = ''
        }
    }

}
</script>

<style>

</style>