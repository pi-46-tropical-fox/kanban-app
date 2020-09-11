<template>
	<div>
		<div v-if="isLogin == false">
			<Login v-if="currentPage === 'login'" @loggedIn="login" @moveToRegister="goToRegister" ></Login>
			<Register v-else-if="currentPage === 'register'" @moveToLogin="goToLogin"></Register>
		</div>

		<div v-if="isLogin == true">
			<Navbar @emitAddTask="pageAdd" @emitHome="pageHome" @emitLogout="logout"></Navbar>
			<Home v-if="currentPage === 'home'" @editTask="editTask"></Home>
			<Add v-else-if="currentPage === 'add'" @addedData="pageHome"></Add>
			<Edit v-else-if="currentPage === 'edit'" :taskId="editTaskId" @updatedData="pageHome"></Edit>
		</div>
	</div>
</template>

<script>
import Navbar from './components/Navbar'
import Home from './views/Home'
import Add from './components/AddKanban'
import Login from './views/Login'
import Register from './views/Register'
import Edit from './components/EditKanban'
export default {
	components: {
		Navbar,
		Home,
		Add,
		Login,
		Register,
		Edit
	},
  	data() {
		return {
			isLogin: false,
			currentPage: 'login',
			editTaskId: ''
		};
	},
	methods: {
		login(value) {
			this.isLogin = true
			this.currentPage = 'home'
		},
		logout(value) {
			this.isLogin = false
			localStorage.removeItem('access_token')
			// this.signOut()
			this.currentPage = 'login'
		},
		pageAdd() {
			this.currentPage = 'add'
		},
		pageHome() {
			this.currentPage = 'home'
		},
		registered() {
			this.currentPage = 'login'
		},
		goToRegister() {
			this.currentPage = 'register'
		},
		goToLogin() {
			this.currentPage = 'login'
		},
		// signOut() {
		// 	var auth2 = gapi.auth2.getAuthInstance();
		// 	auth2.signOut().then(function () {
		// 	console.log('User signed out.');
		// 	});
		// },
		editTask(id) {
			this.editTaskId = id
			this.currentPage = 'edit'
		},
		checkAccessToken() {
			if (localStorage.getItem('access_token')) {
				this.isLogin = true
				this.pageHome()
			} else {
				this.isLogin = false
			}
		}
	},
	created() {
		this.checkAccessToken()
	}
};
</script>

<style scoped>
</style>