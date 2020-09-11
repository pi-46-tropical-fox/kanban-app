<template>
	<div>
		<Navbar :userData="currentUser" @logout="logout" v-if="currentPage === 'Dashboard'"></Navbar>
		<AuthPage @checkAuth="checkAuth" v-if="currentPage === 'AuthPage'"></AuthPage>
		<Dashboard :userData="currentUser" v-if="currentPage === 'Dashboard'"></Dashboard>
	</div>
</template>

<script>
import axios from './config/axios';
import AuthPage from './views/AuthPage';
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';

export default {
	name: 'App',

	components: {
		AuthPage,
		Dashboard,
		Navbar,
	},

	data() {
		return {
			currentPage: 'AuthPage',
			currentUser: null,
		};
	},

	methods: {
		checkAuth() {
			if (localStorage.getItem('access_token') && localStorage.getItem('user_id')) {
				this.currentPage = 'Dashboard';
				this.setUserData();
			} else {
				this.currentPage = 'AuthPage';
			}
		},
		logout() {
			localStorage.clear();
			this.checkAuth();
		},
		setUserData() {
			const access_token = localStorage.getItem('access_token');
			const user_id = localStorage.getItem('user_id');

			axios({
				url: `/users/${user_id}`,
				method: 'GET',
				headers: {
					access_token,
				},
			}).then(({ data }) => {
				this.currentUser = data;
			});
		},
	},

	created() {
		this.checkAuth();
	},
};
</script>

<style></style>
