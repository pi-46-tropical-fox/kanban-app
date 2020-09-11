<template>
	<div class="card-item box">
		<article class="media">
			<div class="media-content">
				<div class="content">
					<h3 class="title is-5">{{ task.title }}</h3>
					<p class="subtitle is-6">{{ task.description }}</p>
					<time datetime="${new Date(todo.due_date).toISOString().split('T')[0]}">{{ new Date(task.due_date).toDateString() }}</time>
					<p class="subtitle is-6">{{ task.User.email }}</p>
				</div>
			</div>
			<div class="media-right">
				<nav class="level is-mobile">
					<div class="level-left">
						<a class="level-item">
							<div class="dropdown mr-2" :class="{ 'is-active': isActive }" @click="toggleActive">
								<div class="dropdown-trigger">
									<button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
										<span class="icon is-small">
											<i class="fas fa-exchange-alt" aria-hidden="true"></i>
										</span>
									</button>
								</div>
								<div class="dropdown-menu" id="dropdown-menu2" role="menu">
									<div class="dropdown-content">
										<MoveToButton v-for="category in categories" :key="category.id" :category="category" @MoveToCategory="MoveToCategory">{{ category.name }}</MoveToButton>
									</div>
								</div>
							</div>
						</a>
						<a class="level-item" @click="editButton(task.id)">
							<span class="icon is-small"><i class="fas fa-edit"></i></span>
						</a>
						<a class="level-item" @click="deleteButton(task.id)">
							<span class="icon is-small has-text-danger"><i class="fas fa-trash"></i></span>
						</a>
					</div>
				</nav>
			</div>
		</article>
	</div>
</template>

<script>
import MoveToButton from './MoveToButton';
export default {
	name: 'TaskItem',

	props: ['task', 'categories'],

	components: {
		MoveToButton,
	},

	data() {
		return {
			isActive: false,
		};
	},

	methods: {
		editButton(taskId) {
			this.$emit('editButton', taskId);
		},

		deleteButton(taskId) {
			this.$emit('deleteButton', taskId);
		},

		toggleActive() {
			if (this.isActive === true) {
				this.isActive = false;
			} else {
				this.isActive = true;
			}
		},

		MoveToCategory(id) {
			const payload = {
				id,
				TaskId: this.task.id,
			};
			this.$emit('MoveToCategory', payload);
			this.isActive = false;
		},
	},
};
</script>

<style></style>
