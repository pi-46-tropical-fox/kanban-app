<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">
				<img src="../assets/logo.svg" />
			</a>

			<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbar" class="navbar-menu">
			<div class="navbar-end">
				<div class="navbar-item">
					<div class="buttons">
						<a href="#" class="button is-light">
							<span class="icon">
								<i class="fas fa-user"></i>
							</span>
							<span v-if="userData">{{ userData.username }}</span>
						</a>
						<a href="#" class="button is-danger" @click="logoutButton">
							<span>Logout</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',

	props: ['userData'],

	data() {
		return {
			username: '',
		};
	},

	methods: {
		logoutButton() {
			this.$emit('logout');
		},
	},
};
</script>

<style></style>
