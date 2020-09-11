<template>
	<div class="column is-narrow">
		<div class="card box">
			<!-- <div class="category-header"> -->
				<h2 class="title is-4">{{ category.name }}</h2>
				<!-- <a class="button" href="#addTask">
					<span class="icon is-small">
						<i class="fas fa-plus"></i>
					</span>
				</a>
			</div> -->
			<!-- <draggable :group="tasks" :move="onMove"> -->
			<TaskItem v-for="task in filteredTask" :key="task.id" :task="task" @editButton="updateTaskForm" @deleteButton="deleteTask" :categories="categories" @MoveToCategory="MoveToCategory"></TaskItem>
			<!-- </draggable> -->
			<div v-if="showAddTaskForm" class="card-item box">
				<form @submit.prevent="addTask">
					<header class="card-header">
						<p class="card-header-title">
							<input v-model="title" name="title" type="text" class="input" placeholder="title" />
						</p>
					</header>
					<div class="card-content">
						<div class="content">
							<textarea v-model="description" name="description" class="textarea" placeholder="description..."></textarea>
							<input v-model="due_date" name="due-date" type="date" class="input mt-2" />
						</div>
					</div>
					<div class="field is-grouped is-grouped-centered">
					<div class="control">
						<button type="submit" class="button is-primary">Submit</button>
					</div>
					<div class="control">
						<button class="button is-danger is-light" @click="destroyAddTask">Cancel</button>
					</div>
					</div>
				</form>
			</div>
			<div class="card-item box">
				<a class="button is-fullwidth" @click="addTaskForm">
					<span class="icon is-small">
						<i class="fas fa-plus"></i>
					</span>
					<p class="subtitle is-6">Add item</p>
				</a>
			</div>
		</div>
		<div class="modal" :class="{ 'is-active': showUpdateTaskForm }">
  			<div class="modal-background" @click="destroyUpdateForm"></div>
			<div class="modal-content">
				<div class="box">
					<form @submit.prevent="updateTask">
						<header class="card-header">
							<p class="card-header-title">
								<input v-model="titleEdit" name="title" type="text" class="input" placeholder="title" />
							</p>
						</header>
						<div class="card-content">
							<div class="content">
								<textarea v-model="descriptionEdit" name="description" class="textarea" placeholder="description..."></textarea>
								<input v-model="due_dateEdit" name="due-date" type="date" class="input mt-2" />
							</div>
						</div>
						<div class="field is-grouped is-grouped-centered">
						<div class="control">
							<button type="submit" class="button is-primary">Submit</button>
						</div>
						<div class="control">
							<a class="button is-danger is-light" @click="destroyUpdateForm">Cancel</a>
						</div>
					</form>
				</div>
			</div>
			<button class="modal-close is-large" aria-label="close" @click="destroyUpdateForm"></button>
		</div>
	</div>
</template>

<script>
import axios from '../config/axios';
import TaskItem from './TaskItem';
import draggable from 'vuedraggable';
import Swal from 'sweetalert2';
export default {
	name: 'CategoryCard',

	components: {
		TaskItem,
		draggable
	},

	data() {
		return {
			showAddTaskForm: false,
			showUpdateTaskForm: false,
			title: '',
			description: '',
			due_date: '',
			CategoryId: this.category.id,
			taskToEdit: '',
			titleEdit: '',
			descriptionEdit: '',
			due_dateEdit: '',
		};
	},

	props: ['category', 'userData', 'categories', 'tasks'],

	methods: {
		addTaskForm() {
			this.showAddTaskForm = true;
		},

		updateTaskForm(id) {
			this.findTaskToEdit(id)
			.then((result) => {
				this.showUpdateTaskForm = true;
				this.taskToEdit = id;
			}).catch((err) => {
				Swal.fire({
					icon: 'error',
					title: err.message[0].message
				});
			});
		},

		destroyAddTask() {
			this.showAddTaskForm = false;
			this.title = '',
			this.description = '',
			this.due_date = ''
		},

		destroyUpdateForm() {
			this.showUpdateTaskForm = false;
			this.titleEdit= '';
			this.descriptionEdit= '';
			this.due_dateEdit= '';
			this.taskToEdit = '';
		},

		addTask() {
			axios({
				url: '/tasks',
				method: 'POST',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
				data: {
					title: this.title,
					description: this.description,
					due_date: this.due_date,
					CategoryId: this.CategoryId,
					UserId: this.userData.id,
					OrganizationId: this.userData.OrganizationId,
				}
			})
				.then(({ result }) => {
					this.$emit('fetchTask');
					this.destroyAddTask();
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Validation error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},

		findTaskToEdit(id) {
			return axios({
				url: `/tasks/${id}`,
				method: 'GET',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
			})
				.then(({ data }) => {
					this.titleEdit= data.title;
					this.descriptionEdit= data.description;
					this.due_dateEdit= data.due_date.split('T')[0];
				})
				.catch(err => {
					throw { message: err.response.data.errors }
				});
		},

		updateTask() {
			axios({
				url: `/tasks/${this.taskToEdit}`,
				method: 'PUT',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
				data: {
					title: this.titleEdit,
					description: this.descriptionEdit,
					due_date: this.due_dateEdit,
					CategoryId: this.CategoryId,
					UserId: this.userData.id,
					OrganizationId: this.userData.OrganizationId,
				}
			})
			.then(({data}) => {
				this.$emit('fetchTask');
				this.destroyUpdateForm();
			}).catch((err) => {
				Swal.fire({
						icon: 'error',
						titleText: 'Validation error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
			});
		},

		deleteTask(id) {
			axios({
				url: `/tasks/${id}`,
				method: 'DELETE',
				headers: {
					access_token: localStorage.getItem('access_token'),
				}
			})
			.then(({data}) => {
				this.$emit('fetchTask');
			}).catch((err) => {
				Swal.fire({
					icon: 'error',
					title: err.response.data.errors[0].message
				});
			});
		},

		MoveToCategory({id, TaskId}) {
			axios({
				url: `/tasks/${TaskId}`,
				method: 'PUT',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
				data: {
					CategoryId: id,
				}
			})
			.then(({data}) => {
				this.$emit('fetchTask');
			}).catch((err) => {
				Swal.fire({
					icon: 'error',
					titleText: 'Validation error',
					html: err.response.data.errors.map(err => err.message).join('<br />'),
				});
			});
		},

		onMove(e) {
			console.log(e);
		}
	},

	computed: {
		filteredTask() {
			return this.tasks.filter(task => task.Category.id === this.category.id);
		},
	}
};
</script>

<style></style>
