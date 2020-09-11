<template>
    <div class="items border border-light">
        <div class="card draggable shadow-sm" id="cd1" draggable="true" ondragstart="drag(event)">
            <div class="card-body p-2">
                <div class="card-title">
                    <img :src="task.User.pictureUrl" class="rounded-circle float-right card-img2">
                    <span class="lead font-weight-light text-dark">{{task.task}}</span>
                </div>
                <p class="text-darkGrey">
                    {{task.description}}
                </p>
                <button class="btn btn-primary btn-sm" @click.prevent="updateTask(task.id)">Update</button>
                <button class="btn btn-2ndprimary btn-sm" @click.prevent="deleteTask(task.id)">Delete</button>
                <span class="float-right text-darkGrey font-weight-light" style="font-size: small;">{{task.User.name}}</span>
            </div>
        </div>
        <div class="dropzone rounded" ondrop="drop(event)" ondragover="allowDrop(event)" ondragleave="clearDrop(event)"> &nbsp; </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: [ 'task' ],
    methods: {
        deleteTask(id) {
            console.log(id)
            axios({
                method: 'DELETE',
                url: `http://localhost:3000/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.$emit('refresh')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        },
        updateTask(id) {    
            this.$emit('emitUpdate', id)
        }
    }
}
</script>

<style>

</style>