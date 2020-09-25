<template>
	<div class="container mt-3" id="home-before-login">
		<h1>Welcome!</h1>
		<p>Please login to proceed, or register if you don't have any account yet.</p>
		<button @click="showLogin" type="button" class="btn btn-primary">Login</button>
		<button @click="showRegister" type="button" class="btn btn-secondary">Register</button>
	</div>
</template>

<script>
	export default {
		methods: {
			showLogin() {
				this.$emit("emitChangePage", "login");
			},
			showRegister() {
				this.$emit("emitChangePage", "register");
			}
		}
	}
</script>