<template>
    <div class="card text-dark shadow mb-2 "  @click="getTaskId(task.id)">
  <h5 class="card-header">{{task.title}}</h5>
  <div class="card-body">
    <p class="card-text">{{task.description}}</p>
  </div>
</div>

</template>

<script>
export default {
	name: 'CardTasks',
	props: ['task'],
	data() {
        return {
            taskId: null,
        }
    },
    methods: {
        getTaskId(id) {
            this.$emit('getTaskId', id)
            }
        }

}
</script>

<style>

</style>