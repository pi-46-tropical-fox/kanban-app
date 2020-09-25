<template>
	<div >
		<div class="section" v-if="currentPage !== 'dashBoardPage'">

       
		<div class="form">
			<h1>Kanban App</h1>
			<div class="btn-group btn-group-toggle mb-5" v-if="currentPage != 'dashBoardPage'" data-toggle="buttons">
				<label class="btn btn-secondary active">
					<input type="radio" @click="changePage('loginPage')" checked> Login
				</label>
				<label class="btn btn-secondary">
					<input type="radio" @click="changePage('registerPage')" checked> Register
				</label>
			</div>
			<LoginPage 
				v-if="currentPage == 'loginPage'"
				@changePage="changePage">
				</LoginPage>

			<RegisterPage 
				v-else-if="currentPage == 'registerPage'"
				@changePage="changePage">
				</RegisterPage>
		</div>
        <div class="video-container">
            <div class="color-overlay"></div>
            <video autoplay loop muted>
                <source src="../assets/background-web.mp4" type="video/mp4">
            </video>
        </div>
	</div>
		<DashBoardPage 
			v-if="currentPage == 'dashBoardPage'"
			@changePage="changePage">

			</DashBoardPage>
	
	</div>
  
</template>

<script>

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
		this.checkAuth()
	}
}
</script>

<style scoped>
.section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.form {
  text-align: center;
  font-weight: bold;
  color: white;
  text-align: left;
  font-size: 1em;
  padding: 20px;
  margin: 15px;
  z-index: 1;
  opacity: 0.7;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
}
</style>