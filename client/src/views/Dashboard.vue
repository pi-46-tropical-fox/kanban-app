<template>
	<section class="section">
		<div class="container is-fluid">
			<!-- Main container -->
			<nav class="level">
				<!-- Left side -->
				<div class="level-left">
					<div class="level-item">
						<div class="dropdown mr-2" :class="{ 'is-active': isActive }" @click="toggleActive">
							<div class="dropdown-trigger">
								<button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
									<span class="icon is-small">
										<i class="fas fa-th" aria-hidden="true"></i>
									</span>
								</button>
							</div>
							<div class="dropdown-menu" id="dropdown-menu2" role="menu">
								<div class="dropdown-content">
									<button class="button is-primary">Switch Organization</button>
								</div>
							</div>
						</div>
						<h1 class="title">Hacktiv8</h1>
					</div>
					<div class="level-item">
						<div class="field has-addons">
							<p class="control">
								<input class="input" type="text" placeholder="Find an item" />
							</p>
							<p class="control">
								<button class="button">
									<span class="icon is-small">
										<i class="fas fa-search"></i>
									</span>
									<span>Search</span>
								</button>
							</p>
						</div>
					</div>
				</div>
			</nav>

			<div class="card-wrapper columns">
				<CategoryCard v-for="category in categories" :key="category.id" :categories="categories" :category="category" :userData="userData" :tasks="tasks" @fetchTask="fetchTask"></CategoryCard>
				<div class="column is-narrow">
					<div class="box">
						<form v-if="showAddCategoryForm" @submit.prevent="addCategory">
							<input type="text" v-model="addCategoryName" class="input" placeholder="Category name.." />
							<div class="field is-grouped is-grouped-centered">
								<div class="control">
									<button type="submit" class="button is-primary">Submit</button>
								</div>
								<div class="control">
									<button class="button is-danger is-light" @click="destroyAddCategory">Cancel</button>
								</div>
							</div>
						</form>
						<a class="button is-fullwidth" @click="addCategoryForm">
							<span class="icon is-small">
								<i class="fas fa-plus"></i>
							</span>
							<p class="subtitle is-6">Add category</p>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from '../config/axios';
import CategoryCard from '../components/CategoryCard';
import Swal from 'sweetalert2';
export default {
	name: 'Dashboard',

	components: {
		CategoryCard,
	},

	props: ['userData'],

	data() {
		return {
			isActive: false,
			categories: [],
			tasks: [],
			showAddCategoryForm: false,
			addCategoryName: '',
		};
	},

	methods: {
		toggleActive() {
			if (this.isActive === true) {
				this.isActive = false;
			} else {
				this.isActive = true;
			}
		},

		fetchCategory() {
			axios({
				url: '/categories',
				method: 'GET',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
			})
				.then(({ data }) => {
					this.categories = data;
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},

		fetchTask() {
			axios({
				url: '/tasks',
				method: 'GET',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
			})
				.then(({ data }) => {
					this.tasks = data;
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},

		addCategoryForm() {
			this.showAddCategoryForm = true;
		},

		addCategory() {
			axios({
				url: '/categories',
				method: 'POST',
				headers: {
					access_token: localStorage.getItem('access_token'),
				},
				data: {
					name: this.addCategoryName,
				},
			})
				.then(({ result }) => {
					this.fetchCategory();
					this.destroyAddCategory();
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Validation error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},

		destroyAddCategory() {
			this.showAddCategoryForm = false;
			this.addCategoryName = '';
		},
	},

	created() {
		this.fetchCategory();
		this.fetchTask();
	},
};
</script>

<style></style>
