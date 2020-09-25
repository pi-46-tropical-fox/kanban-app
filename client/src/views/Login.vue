<template>
	<div class="container mt-3" id="menu-login">
		<div class="row">
			<div class="col-6">
				<div class="card">
					<div class="card-body">
						<h1 class="card-title">Login</h1><hr>
						<form @submit.prevent="login()">
							<div class="form-group row">
								<label for="login-email" class="col-sm-3 col-form-label">Email :</label>
								<div class="col-sm-9">
									<input type="email" class="form-control" v-model="email">
								</div>
							</div>
							<div class="form-group row">
								<label for="login-password" class="col-sm-3 col-form-label">Password :</label>
								<div class="col-sm-9">
									<input type="password" class="form-control" v-model="password">
								</div>
							</div>
							<div class="form-group row">
								<div class="col-sm-5 ml-auto">
									<input type="submit" class="form-control btn btn-success" value="Login">
								</div>
							</div>
							<hr>
							<p>or you can login with your Google account :</p>
							<div class="g-signin2" data-onsuccess="onSignIn"></div>
						</form>
						<button @click="showWelcome">Back</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		data() {
			return {
				email: "",
				password: ""
			}
		},
		methods: {
			login() {
				axios({
					url: "http://localhost:3000/users/login",
					method: "POST",
					data: {
						email: this.email,
						password: this.password
					}
				})
					.then(({ data }) => {
						console.log(data);
						localStorage.setItem("access_token", data.access_token);
						this.$emit("emitChangePage", "dashboard");
					})
					.catch(err => {
						console.log(err);
					});
			},
			showWelcome() {
				this.$emit("emitChangePage", "welcome");
			}
		}
	}
</script>