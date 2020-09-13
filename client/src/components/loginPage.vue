<template>
  <div class="container mt-5 justify-content-center" id="form-login">
    <div class="row">
      <div class="col-6">
        <div class="card">
          <div class="card-body">
            <div class="card-title">Form Login</div>
            <form action="" id="loginForm" @submit.prevent="login">
              <div class="form-group row">
                <label for="reloginEmail" class="col-sm-4 col-form-label"
                  >Email</label
                >
                <div class="col-sm-8">
                  <input
                    v-model="email"
                    type="text"
                    name=""
                    id="loginEmail"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="loginPassword" class="col-sm-4 col-form-label"
                  >Password</label
                >
                <div class="col-sm-8">
                  <input
                    v-model="password"
                    type="password"
                    name=""
                    id="loginPassword"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-12">
                  <input
                    type="submit"
                    value="Login"
                    class="form-control btn btn-success"
                  />
                </div>
                <div class="col-sm-6">
                </div>
              </div>
            </form>
            <div>  
              <button v-google-signin-button="clientId" class="google-signin-button col-12"> Login with Google</button>
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
      clientId: '369208488829-l8asvc8h377hnu98o23kgtpjvhvdied3.apps.googleusercontent.com'
    };
  },
  //   props: ["pageName"],
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$emit("loginApp", payload);
    },
    OnGoogleAuthSuccess (idToken) {
      // console.log(idToken,"access_token")
      localStorage.setItem("access_token", idToken);
      // this.changePage("home");
      // this.fetchTasks()
      this.$emit('googleChangePage')
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error,'error')
    }
  },
};
</script>

<style scoped>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>