<template>
  <div @click="getTaskId(task.id)">
		<h5 class="card-title">{{task.title}}</h5>
		<p class="card-text ">{{task.description}}</p>
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
			console.log('masuk get id', id);
            this.$emit('getTaskId', id)
            }
            // this.title = '',
            // this.description = '',
            // this.due_date = ''
        }

}
</script>

<style>

</style>