<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Cras justo odio</li>
    <li class="list-group-item">Dapibus ac facilisis in</li>
    <li class="list-group-item">Morbi leo risus</li>
    <li class="list-group-item">Porta ac consectetur ac</li>
    <li class="list-group-item">Vestibulum at eros</li>
		<li 
			v-for="(todo,index) in todosData"
			:key="index" 
			class="list-group-item" 
			:class="todo.textClass">
  	{{todo.title}}
		</li>
	</ul>

</template>

<script>
export default {
    name: 'ListTodo',
    props: ['todosData']

}
</script>

<style>

</style>