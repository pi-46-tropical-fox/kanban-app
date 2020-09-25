<template>
	<div class="container mt-3" id="menu-edit-todo">
		<div class="row">
			<div class="col-6">
				<div class="card">
					<div class="card-body">
						<h1 class="card-title">Edit Todo</h1>
						<form @submit.prevent="edit(taskId)" id="form-edit-todo">
							<div class="form-group row">
								<label for="edit-todo-title" class="col-sm-3 col-form-label">Title</label>
								<div class="col-sm-9">
									<input v-model="dataTitle" type="text" class="form-control" name="title" id="edit-todo-title">
								</div>
							</div>
							<div class="form-group row">
								<label for="edit-todo-description" class="col-sm-3 col-form-label">Description</label>
								<div class="col-sm-9">
									<input v-model="dataDescription" type="text" class="form-control" name="description" id="edit-todo-description">
								</div>
							</div>
							<div class="form-group row">
								<label for="edit-todo-status" class="col-sm-3 col-form-label">Category</label>
								<div class="col-sm-9">
									<select v-model="dataCategory" class="custom-select" id="edit-todo-status">
									  	<option disabled>--- Status ---</option>
									  	<option value="Backlog" :selected="dataCategory === 'Backlog'">Backlog</option>
									  	<option value="To Do" :selected="dataCategory === 'To Do'">To Do</option>
									  	<option value="Doing" :selected="dataCategory === 'Doing'">Doing</option>
									  	<option value="Done" :selected="dataCategory === 'Done'">Done</option>
									</select>
								</div>
						    </div>
						    <div class="form-group row">
								<div class="col-sm-5 ml-auto">
									<input type="submit" class="form-control btn btn-success" value="Update">
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		props: ["task"],
		data() {
			return {
				dataTitle: this.task.title,
				dataDescription: this.task.description,
				dataCategory: this.task.category,
				taskId: this.task.id
			}
		},
		methods: {
			edit(id) {
				axios({
					url: `https://kanban-app-alftirta.herokuapp.com/tasks/${id}`,
					method: "PUT",
					headers: {
						access_token: localStorage.access_token
					},
					data: {
						title: this.dataTitle,
						description: this.dataDescription,
						category: this.dataCategory
					}
				})
					.then(({ data }) => {
						this.$emit("fetchEmitTask");
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		watch: {
			task(newValue, oldValue) {
				this.dataTitle = newValue.title;
				this.dataDescription = newValue.description;
				this.dataCategory = newValue.category;
				this.taskId = newValue.id;
			}
		}
	}
</script>