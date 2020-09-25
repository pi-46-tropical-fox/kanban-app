<template>
	<div>
		<div class="container mt-3" id="home-after-login">
		<h1 class="text-center">Kanban Board</h1>
		<div class="row">
			<div class="d-flex col-12">
				<Category @emitShowEditTask="showEditTask" v-for="(category, index) in categories" :key="index" :categoryName="category" :dataTask="tasks" @fetchEmitTask2="fetchTasks"></Category>
			</div>
		</div>
		<div v-if="isEdit" class="row">
			<div class="d-flex col-12">
				<Edit @fetchEmitTask="fetchTasks" :task="task"></Edit>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Category from "../components/Category.vue";
	import Edit from "./Edit.vue";
	export default {
		components: {
			Category,
			Edit
		},
		data() {
			return {
				categories: ["Backlog", "To Do", "Doing", "Done"],
				tasks: [],
				isEdit: false,
				task: null
			}
		},
		methods: {
			fetchTasks() {
				axios({
					url: "https://kanban-app-alftirta.herokuapp.com/tasks",
					method: "GET",
					headers: {
						access_token: localStorage.access_token
					}
				})
				.then(({ data }) => {
					this.tasks = data;
					this.isEdit = false;
				})
				.catch(err => {
					console.log(err);
				})
			},
			showEditTask(task) {
				console.log("task title : ", task.title);
				this.isEdit = false;
				this.task = task;
				this.isEdit = true;
			}
		},
		created() {
			this.fetchTasks();
		}
	}
</script>