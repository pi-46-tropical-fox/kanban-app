<template>
	<div>
    <h1>{{ currentPage }}</h1>

		<LoginPage 
			v-if="currentPage == 'loginPage'"
			@changePage="changePage">
			 </LoginPage>

		<RegisterPage 
			v-else-if="currentPage == 'registerPage'"
			@changePage="changePage">
			</RegisterPage>

		<DashBoardPage 
			v-else-if="currentPage == 'dashBoardPage'"
			@changePage="changePage">

			</DashBoardPage>
	
	</div>
    <!-- <div class="container">
        <h1>ini form login</h1>
        <LoginPage></LoginPage>
    </div> -->
  
</template>

<script>
import axios from './config/axios'
import DashBoardPage from './views/Dashboard'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'
export default {
name: 'App',
  	data() {
    	return {
			currentPage: 'loginPage',
    	}
   	},
    components: {
			LoginPage,
			DashBoardPage,
			RegisterPage
    },
    methods:{
		checkAuth() {
			if (localStorage.access_token) {
				this.currentPage = 'dashBoardPage'
			} else {
				this.currentPage = 'loginPage'
			}
		},
		changePage(status) {
			this.currentPage = status
		},
	},
	created () {
		console.log('masuk auth');
		this.checkAuth()
	}
}
</script>

<style scoped>

</style>