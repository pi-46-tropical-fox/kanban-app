<template>
  <div>
    <h3 class="mt-5 shadow p-2 text-muted">Kanban App</h3>
    <!-- login -->
    <div class="container mt-5" id="form-login">
      <div class="row">
        <div class="col-4 mx-auto">
          <div class="card shadow">
            <div class="card-body">
              <h4 class="card-title text-center text-muted">Login</h4>
              <form @submit.prevent="login">
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="email" class="form-control" id="loginEmail" placeholder="Email" v-model="email" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="password" class="form-control" id="loginPassword" placeholder="Password" v-model="password" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-5 ml-auto">
                    <input type="submit" class="form-control btn btn-secondary" />
                  </div>
                </div>
              </form>
              <!-- google sign in button -->
              <button v-google-signin-button="clientId" class="google-signin-button btn btn-info"> Google</button>
              <p>Don't have an account, Do you want to <a @click="register" href="#">Register</a>?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      clientId: "324670260078-k0aqdc4cbvof9acb6ptfnqbitbmvrth5.apps.googleusercontent.com"
    }
  },
  methods: {
    login() {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$emit("loginSubmit", payload);
    },
    register() {
      this.$emit("registerClick");
    },
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken, "google_access_token");
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error, "google sign in error");
    }
  }
}
</script>

<style>

</style>