<template>
	<div class="container mt-3" id="menu-register">
		<div class="row">
			<div class="col-6">
				<div class="card">
					<div class="card-body">
						<h1 class="card-title">Register</h1><hr>
						<form id="form-register">
							<div class="form-group row">
								<label for="register-username" class="col-sm-3 col-form-label">Username :</label>
								<div class="col-sm-9">
									<input type="text" class="form-control" id="register-username">
								</div>
							</div>
							<div class="form-group row">
								<label for="register-email" class="col-sm-3 col-form-label">Email :</label>
								<div class="col-sm-9">
									<input type="email" class="form-control" id="register-email">
								</div>
							</div>
							<div class="form-group row">
								<label for="register-password" class="col-sm-3 col-form-label">Password :</label>
								<div class="col-sm-9">
									<input type="password" class="form-control" id="register-password">
								</div>
							</div>
							<div class="form-group row">
								<div class="col-sm-5 ml-auto">
									<input type="submit" class="form-control btn btn-success" value="Register">
								</div>
							</div>
						</form>
						<button @click="showWelcome">Back</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			showWelcome() {
				this.$emit("emitChangePage", "welcome");
			}
		}
	}
</script>