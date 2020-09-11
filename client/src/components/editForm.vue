<template>
  <div class="container mt-5 justify-content-center" id="form-editTask">
        <div class="row">
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">Form Edit Task</div>
                        <form action="" id="editTaskForm">
                            <div class="form-group row">
                                <label for="editTaskTitle" class="col-sm-4 col-form-label">Title</label>
                                <div class="col-sm-8">
                                    <input type="text" name="" id="AddTaskTitle" class="form-control">
                                </div>                                
                            </div>
                            <div class="form-group row">
                                <label for="editTaskCategory" class="col-sm-4 col-form-label">Category</label>
                                <div class="col-sm-8">
                                    <select name="" id="editTaskCategory" class="form-control">
                                        <option value="backlog">Backlog</option>
                                        <option value="todo">Todo</option>
                                        <option value="doing">Doing</option>
                                        <option value="done">Done</option>
                                    </select>                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <input type="submit" value="Edit Task" class="form-control btn btn-success">
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
    name:'EditTask'

}
</script>

<style>

</style>