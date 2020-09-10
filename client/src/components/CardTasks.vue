<template>
  <div >
		<h5 class="card-title">{{task.title}}</h5>
		<p class="card-text ">{{task.description}}</p>
  </div>
</template>

<script>
export default {
	name: 'CardTasks',
	props: ['task']
}
</script>

<style>

</style>