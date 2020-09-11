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
				<!-- <div class="column is-narrow">
					<div class="card box">
						<h2 class="title is-4">Backlog</h2>
						<div class="card-item box">
							<article class="media">
								<div class="media-content">
									<div class="content">
										<h3 class="title is-5">Item</h3>
										<p class="subtitle is-6">Description</p>
										<p class="subtitle is-6">bryan.daniswara@gmail.com</p>
									</div>
								</div>
								<div class="media-right">
									<nav class="level is-mobile">
										<div class="level-left">
											<a class="level-item">
												<span class="icon is-small"><i class="fas fa-edit"></i></span>
											</a>
											<a class="level-item">
												<span class="icon is-small has-text-danger"><i class="fas fa-trash"></i></span>
											</a>
										</div>
									</nav>
								</div>
							</article>
						</div>
						<div class="card-item box">
							<a class="button is-fullwidth">
								<span class="icon is-small">
									<i class="fas fa-plus"></i>
								</span>
								<p class="subtitle is-6">Add item</p>
							</a>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="card box">
						<h2 class="title is-4">Todo</h2>
						<div class="card-item box">
							<article class="media">
								<div class="media-content">
									<div class="content">
										<h3 class="title is-5">Item</h3>
										<p class="subtitle is-6">Description</p>
										<p class="subtitle is-6">bryan.daniswara@gmail.com</p>
									</div>
								</div>
								<div class="media-right">
									<nav class="level is-mobile">
										<div class="level-left">
											<a class="level-item">
												<span class="icon is-small"><i class="fas fa-edit"></i></span>
											</a>
											<a class="level-item">
												<span class="icon is-small has-text-danger"><i class="fas fa-trash"></i></span>
											</a>
										</div>
									</nav>
								</div>
							</article>
						</div>
						<div class="card-item box">
							<a class="button is-fullwidth">
								<span class="icon is-small">
									<i class="fas fa-plus"></i>
								</span>
								<p class="subtitle is-6">Add item</p>
							</a>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="card box">
						<h2 class="title is-4">Doing</h2>
						<div class="card-item box">
							<article class="media">
								<div class="media-content">
									<div class="content">
										<h3 class="title is-5">Item</h3>
										<p class="subtitle is-6">Description</p>
										<p class="subtitle is-6">bryan.daniswara@gmail.com</p>
									</div>
								</div>
								<div class="media-right">
									<nav class="level is-mobile">
										<div class="level-left">
											<a class="level-item">
												<span class="icon is-small"><i class="fas fa-edit"></i></span>
											</a>
											<a class="level-item">
												<span class="icon is-small has-text-danger"><i class="fas fa-trash"></i></span>
											</a>
										</div>
									</nav>
								</div>
							</article>
						</div>
						<div class="card-item box">
							<a class="button is-fullwidth">
								<span class="icon is-small">
									<i class="fas fa-plus"></i>
								</span>
								<p class="subtitle is-6">Add item</p>
							</a>
						</div>
					</div>
				</div>
				<div class="column is-narrow">
					<div class="card box">
						<h2 class="title is-4">Done</h2>
						<div class="card-item box">
							<article class="media">
								<div class="media-content">
									<div class="content">
										<h3 class="title is-5">Item</h3>
										<p class="subtitle is-6">Description</p>
										<p class="subtitle is-6">bryan.daniswara@gmail.com</p>
									</div>
								</div>
								<div class="media-right">
									<nav class="level is-mobile">
										<div class="level-left">
											<a class="level-item">
												<span class="icon is-small"><i class="fas fa-edit"></i></span>
											</a>
											<a class="level-item">
												<span class="icon is-small has-text-danger"><i class="fas fa-trash"></i></span>
											</a>
										</div>
									</nav>
								</div>
							</article>
						</div>
						<div class="card-item box">
							<a class="button is-fullwidth">
								<span class="icon is-small">
									<i class="fas fa-plus"></i>
								</span>
								<p class="subtitle is-6">Add item</p>
							</a>
						</div>
					</div>
				</div> -->
				<CategoryCard v-for="category in categories" :key="category.id" :categories="categories" :category="category" :userData="userData"></CategoryCard>
				<div class="column is-narrow">
					<div class="box">
						<a class="button is-fullwidth">
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
					// console.log([...new Set(data.Category.name)]);
					// console.log(data.map(el => el.Category));
					// this.categories = data.map(el => el.Category).filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
					// this.tasks = data;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},

	created() {
		this.fetchCategory();
	},
};
</script>

<style></style>
