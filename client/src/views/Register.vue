<template>
  <div>
    <h3 class="mt-5 p-2 text-muted">Kanban App</h3>
    <!-- register -->
    <div class="container mt-5" id="form-register">
      <div class="row">
        <div class="col-4 mx-auto">
          <div class="card shadow">
            <div class="card-body">
              <h4 class="card-title text-center text-muted">Register</h4>
              <form id="registerForm" @submit="register">
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="text" class="form-control" id="registerUsername" placeholder="Username" v-model="username" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="email" class="form-control" id="registerEmail" placeholder="Email" v-model="email" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-12">
                    <input type="password" class="form-control" id="registerPassword" placeholder="Password" v-model="password" required/>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-5 ml-auto">
                    <input type="submit" class="form-control btn btn-secondary" />
                  </div>
                </div>
              </form>
              <a @click="backToLogin" href="#">Back to Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer>
      <p class="mt-5 mb-3 text-muted text-center">Created by Full-Stuck Developer &copy; 2020</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      email: "",
      password: ""
    }
  },
  methods: {
    register() {
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$emit("registerSubmit", payload);
    },
    backToLogin() {
      this.$emit("backToLogin");
    }
  }
}
</script>

<style>

</style>