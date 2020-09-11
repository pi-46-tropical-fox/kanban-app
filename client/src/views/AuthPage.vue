<template>
	<section class="section">
		<div class="container is-fluid">
			<div class="columns is-desktop">
				<div class="column">
					<figure class="image">
						<img src="../assets/undraw_Scrum_board_re_wk7v.svg" />
					</figure>
				</div>
				<div class="column form-side">
					<div class="form-auth">
						<h1 class="title">Kanban App</h1>
						<RegisterForm @registerForm="register" @switchForm="switchForm" v-if="currentForm === 'RegisterForm'"></RegisterForm>

						<LoginForm @loginForm="login" @switchForm="switchForm" v-if="currentForm === 'LoginForm'"></LoginForm>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from '../config/axios';
import Swal from 'sweetalert2';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
export default {
	name: 'AuthPage',
	components: {
		RegisterForm,
		LoginForm,
	},
	data() {
		return {
			currentForm: 'LoginForm',
		};
	},
	methods: {
		switchForm(from) {
			if (from === 'login') {
				this.currentForm = 'RegisterForm';
			} else if (from === 'register') {
				this.currentForm = 'LoginForm';
			}
		},

		register(payload) {
			axios({
				url: '/register',
				method: 'POST',
				data: payload,
			})
				.then(({ data }) => {
					localStorage.setItem('access_token', data.access_token);
					localStorage.setItem('user_id', data.id);
					this.$emit('checkAuth');
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Validation error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},

		login(payload) {
			axios({
				url: '/login',
				method: 'POST',
				data: payload,
			})
				.then(({ data }) => {
					localStorage.setItem('access_token', data.access_token);
					localStorage.setItem('user_id', data.id);
					this.$emit('checkAuth');
				})
				.catch(err => {
					Swal.fire({
						icon: 'error',
						titleText: 'Validation error',
						html: err.response.data.errors.map(err => err.message).join('<br />'),
					});
				});
		},
	},
};
</script>

<style></style>
