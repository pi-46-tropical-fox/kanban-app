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
						<a class="button is-light">
							<span class="icon">
								<i class="fas fa-user"></i>
							</span>
							<span v-if="userData">{{ userData.username }}</span>
						</a>
						<a class="button is-danger" @click="logoutButton">
							<span>Logout</span>
						</a>
						<!-- <GoogleLogin class="button is-danger" @click="logoutButton" :params="params" :logoutButton="true">Logout</GoogleLogin> -->
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
	name: 'Navbar',

	props: ['userData'],

	components: {
		GoogleLogin,
	},

	data() {
		return {
			username: '',
			params: {
				client_id: '260472035546-m8mvsdrq923g47heklpagab4pj6foig8.apps.googleusercontent.com',
			},
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
