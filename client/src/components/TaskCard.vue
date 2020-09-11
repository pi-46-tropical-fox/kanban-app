<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
               <div class="content">
                    <p>{{task.title}}</p>
                    <small>{{task.UserId}}</small> <small>{{task.updatedAt}}</small><br>
                    <a class="delete" v-on:click="deleteTask(task.id)"></a>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'Tasks',
    props: ['task', 'userEmail'],
    methods: {
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }
}
</script>

<style>

</style>