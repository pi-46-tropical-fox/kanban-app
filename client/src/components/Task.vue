<template>
	<div class="card col-12">
	  	<div class="card-body">
	  		<img src="https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png" class="card-img-top" style="width: 30%;" alt="profile_picture">
	    	<h5 class="card-title">{{ task.title }}</h5>
	    	<p class="card-text">{{ task.description }}</p>
	    	<a @click.prevent="showEditTask(task.id)" class="btn btn-info">Edit</a>
	    	<a class="btn btn-danger" @click.prevent="deleteTask(task.id)">Delete</a>
	  	</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		props: ["task"],
		methods: {
			deleteTask(id) {
				axios({
					url: `https://kanban-app-alftirta.herokuapp.com/tasks/${id}`,
					method: "DELETE",
					headers: {
						access_token: localStorage.access_token
					}
				})
					.then(({ data }) => {
						this.$emit("fetchEmitTask");
					})
					.catch(err => {
						console.log(err);
					});
			},
			showEditTask() {
				this.$emit("emitShowEditTask", this.task);
			}
		}
	}
</script>