<template>
	<div class="card col-3">
	  	<div class="card-body">
	    	<h5 class="card-title">{{ categoryName }}</h5>
	    	<div v-if="categoryName === 'Backlog'">
	    		<Task @emitShowEditTask="showEditTask" v-for="(task, index) in filterBacklog" :key="index" :task="task" @fetchEmitTask="fetchTask"></Task>
	    	</div>
	    	<div v-else-if="categoryName === 'To Do'">
	    		<Task @emitShowEditTask="showEditTask" v-for="(task, index) in filterTodo" :key="index" :task="task" @fetchEmitTask="fetchTask"></Task>
	    	</div>
	    	<div v-else-if="categoryName === 'Doing'">
	    		<Task @emitShowEditTask="showEditTask" v-for="(task, index) in filterDoing" :key="index" :task="task" @fetchEmitTask="fetchTask"></Task>
	    	</div>
	    	<div v-else-if="categoryName === 'Done'">
	    		<Task @emitShowEditTask="showEditTask" v-for="(task, index) in filterDone" :key="index" :task="task" @fetchEmitTask="fetchTask"></Task>
	    	</div>
	  	</div>
	</div>
</template>

<script>
	import Task from "./Task.vue";
	export default {
		components: {
			Task
		},
		props: ["categoryName", "dataTask"],
		methods: {
			fetchTask() {
				this.$emit("fetchEmitTask2");
			},
			showEditTask(task) {
				this.$emit("emitShowEditTask", task);
			}
		},
		computed: {
			filterBacklog() {
				const arr = [];
				this.dataTask.forEach(task => {
					if (task.category === "Backlog") {
						arr.push(task);
					}
				});
				return arr;
			},
			filterTodo() {
				const arr = [];
				this.dataTask.forEach(task => {
					if (task.category === "To Do") {
						arr.push(task);
					}
				});
				return arr;
			},
			filterDoing() {
				const arr = [];
				this.dataTask.forEach(task => {
					if (task.category === "Doing") {
						arr.push(task);
					}
				});
				return arr;
			},
			filterDone() {
				const arr = [];
				this.dataTask.forEach(task => {
					if (task.category === "Done") {
						arr.push(task);
					}
				});
				return arr;
			}
		}
	}
</script>