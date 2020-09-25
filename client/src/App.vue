<template>
	<div>
		<Navbar :isLogin="isLogin" @logout="changePage"></Navbar>
		<Dashboard @emitChangePage="changePage" v-if="isLogin"></Dashboard>
	  	<Home @emitChangePage="changePage" v-else-if="isWelcome && !isRegister && !isLogin"></Home>
	  	<Login @emitChangePage="changePage" v-else-if="!isRegister && !isLogin"></Login>
	  	<Register @emitChangePage="changePage" v-else-if="isRegister && !isLogin"></Register>
	</div>
</template>

<script>
	import Home from "./views/Home.vue";
	import Login from "./views/Login.vue";
	import Register from "./views/Register.vue";
	import Dashboard from "./views/Dashboard.vue";
	import Navbar from "./components/Navbar.vue";
	export default {
	  data() {
	    return {
	      isWelcome: true,
	      isLogin: false,
	      isRegister: false
	    };
	  },
	  components: {
	  	Home,
	  	Login,
	  	Register,
	  	Dashboard,
	  	Navbar
	  },
	  methods: {
	  	changePage(page) {
	  		if (page === "register") {
	  			this.isRegister = true;
	  		} else if (page === "login") {
	  			this.isRegister = false;
	  			this.isWelcome = false;
	  			this.isLogin = false;
	  		} else if (page === "welcome") {
	  			this.isWelcome = true;
	  			this.isRegister = false;
	  			this.isLogin = false;
	  		} else {
	  			this.isWelcome = false;
	  			this.isRegister = false;
	  			this.isLogin = true;
	  		}
	  	}
	  },
	  created() {
	  	if (localStorage.access_token) {
	  		this.isLogin = true;
	  	} else {
	  		this.isWelcome = true;
	  	}
	  }
	};
</script>

<style scoped>
</style>