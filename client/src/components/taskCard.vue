<template>
    <div class="p-3">
        <div class="card p-2 shadow-sm">
            <button type="button" class="close text-black ml-auto" aria-label="Close">
                <span @click="deleteTask" aria-hidden="true">x</span>
            </button>
            <h6>{{task.title}}</h6>
            <p class="text-muted">User ID:{{task.UserId}}</p>
            <button @click="toEdit" type="button" class="btn btn-success">Edit</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: ['task'],
    methods: {
        toEdit() {
            this.$emit('toEdit', this.task.id)
        },
        deleteTask() {
            this.$emit('deleteTask',this.task.id)
        }
    }
}
</script>

<style>

</style>