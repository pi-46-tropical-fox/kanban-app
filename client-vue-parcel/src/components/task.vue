<template>
    <div>
        <div class="container">
            <div class="card" style="width: 100%;">
                <div class="card-body">
                    <!-- {{task}} -->
                    <h5 class="card-title">{{task.title}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">By: <span>{{task.User.name}}</span></h6>
                    <hr>
                    <p class="card-text">{{task.description}}.</p>
                    <br>
                    <a href="#" class="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Delete" @click.prevent="deleteTask(task.id)"><i class="fas fa-trash-alt"></i></a>
                        <span class="action" v-if="task.category === 'backlog'">
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Edit" @click.prevent="edittask(task.id)"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Move to Todo" @click.prevent="moveTodo(task.id)"><i class="fas fa-check"></i></a>
                        </span>
                        <span class="action" v-else-if="task.category === 'todo'">
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Back to Backlog" @click.prevent="moveBacklog(task.id)"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Edit" @click.prevent="edittask(task.id)"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Move to Doing" @click.prevent="moveDoing(task.id)"><i class="fas fa-check"></i></a>
                        </span>
                        <span class="action" v-else-if="task.category === 'doing'">
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Back to Todo" @click.prevent="moveTodo(task.id)"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></a>
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Edit" @click.prevent="edittask(task.id)"><i class="fas fa-edit"></i></a>
                            <a href="#" class="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Move to Done" @click.prevent="moveDone(task.id)"><i class="fas fa-check"></i></a>
                        </span>
                        <span class="action" v-else></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['task'],
    methods: {
        deleteTask(id){this.$emit('delete',id)},
        edittask(id){this.$emit('edit',id)},
        moveTodo(id){this.$emit('moveTodo',id)},
        moveBacklog(id){this.$emit('moveBacklog',id)},
        moveDoing(id){this.$emit('moveDoing',id)},
        moveDone(id){this.$emit('moveDone',id)}
    },
}
</script>