<template>
   <div class="container mt-5 justify-content-center" id="form-AddTask">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Form Add Task</div>
                        <form @submit.prevent="addTask" id="AddTaskForm">
                            <div class="form-group row">
                                <label for="AddTaskTitle" class="col-sm-4 col-form-label">Title</label>
                                <div class="col-sm-8">
                                    <input v-model="title" type="text" name="" id="AddTaskTitle" class="form-control">
                                </div>                                
                            </div>
                            <div class="form-group row">
                                <label for="AddTaskCategory" class="col-sm-4 col-form-label">Category</label>
                                <div class="col-sm-8">
                                    <select v-model="category" name="" id="AddTaskCategory" class="form-control">
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">Todo</option>
                                        <option value="doing">Doing</option>
                                        <option value="done">Done</option>
                                    </select>                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <input type="submit" value="Add Task" class="form-control btn btn-success">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'AddForm',
    data() {
        return {
           title : '',
           category : '' 
        }
    },
    methods: {
        addTask() {
            const payload = {
                title:this.title,
                category:this.category
                }
            this.$emit('addTask', payload)
        }
    },
    props: ['selectedCategory'],
    created() {
        // console.log(this.selectedCategory);
        this.category = this.selectedCategory
    }

}
</script>

<style>

</style>