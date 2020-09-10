<template>
    <div class="card col-3" style="width: 18rem;">
        <nav class="navbar navbar-light ">
            <a class="navbar-brand" href="#">
                <img src="../../assets/logo-kanban.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                <h4 class="brand">{{}}</h4>
            </a>
        </nav>
        <ul class="list-group list-group-flush">
         <Task></Task>
        </ul>
        <div class="card-footer mx-auto">
            <button type="button" class="btn btn-secondary btn-sm">Add Task</button>
        </div>
    </div>
</template>

<script>
import Task from '../components/Task'
export default {
name: 'TaskCategory',
components:{
    Task
}
}
</script>

<style>

</style>