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
                <div class="col-sm-6">
                  <input
                    type="submit"
                    value="Login"
                    class="form-control btn btn-success"
                  />
                </div>
                <div class="col-sm-6">
                  <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                </div>
              </div>
            </form>
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
  },
};
</script>

<style></style>
