<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	    <span class="navbar-brand" href="#">Kanban App</span>
	    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	    	<span class="navbar-toggler-icon"></span>
	    </button>
	    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	    	<div class="navbar-nav">
	    		<a v-if="!isLogin" class="nav-link" id="nav-home-before-login">Home</a>
	    		<a v-if="!isLogin" class="nav-link" id="nav-login">Login</a>
			    <a v-if="!isLogin" class="nav-link" id="nav-register">Register</a>
			    <a v-if="isLogin" @click.prevent="logout" class="nav-link" id="nav-logout">Logout</a>
	    	</div>
		</div>
	</nav>
</template>

<script>
	export default {
		props: ["isLogin"],
		methods: {
			logout() {
				localStorage.clear();
				this.$emit("logout", "login");
			}
		}
	}
</script>