<template>
	<form @submit.prevent="registerForm">
		<div class="container form-container">
			<div class="field">
				<label for="username-signup" class="label">Username</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" name="username" v-model="username" type="text" id="username-signup" required />
					<span class="icon is-small is-left">
						<i class="fas fa-user"></i>
					</span>
				</div>
			</div>

			<div class="field">
				<label for="email-signup" class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" name="email" v-model="email" type="email" id="email-signup" required />
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
				</div>
			</div>

			<div class="field">
				<label for="password-signup" class="label">Password</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" name="password" v-model="password" type="password" id="password-signup" required />
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
				</div>
			</div>

			<button type="submit" class="button btn-sign is-medium is-fullwidth">Sign Up</button>
			<GoogleLogin class="button btn-google is-medium is-fullwidth mt-2" :params="params" :onSuccess="onSuccess" :onFailure="onFailure">
				<span class="icon">
					<i class="icon-google"></i>
				</span>
				<span class="name">Sign Up with google</span>
			</GoogleLogin>
			<p class="has-text-centered">
				Already have an account?
				<a @click="switchForm">Sign In</a>
			</p>
		</div>
	</form>
</template>

<script>
import GoogleLogin from 'vue-google-login';
export default {
	name: 'RegisterForm',

	components: {
		GoogleLogin,
	},

	data() {
		return {
			username: '',
			email: '',
			password: '',
			params: {
				client_id: '260472035546-m8mvsdrq923g47heklpagab4pj6foig8.apps.googleusercontent.com',
			},
			renderParams: {
				width: 250,
				height: 50,
				longtitle: true,
			},
		};
	},

	methods: {
		switchForm() {
			this.$emit('switchForm', 'register');
		},

		registerForm() {
			const payload = {
				username: this.username,
				email: this.email,
				password: this.password,
			};

			this.$emit('registerForm', payload);
		},

		onSuccess(googleUser) {
			this.$emit('googleSign', googleUser.wc.id_token);
		},

		onFailure() {
			this.$emit('switchForm', 'register');
		},
	},
};
</script>

<style></style>
