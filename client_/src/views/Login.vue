<template>
    <div>
        <section id="login-page">
            <div class="login-page-left">
                <h1>Kanban</h1>
            </div>
            <div class="login-page-right">
                <h1>Sign in</h1>
                <form @submit.prevent="login">
                    <label style="font-family: 'Ubuntu Condensed', sans-serif;">Email</label>
                    <input type="email" id="email-login" placeholder="email" v-model="email" required>
                    <label style="font-family: 'Ubuntu Condensed', sans-serif;">Password</label>
                    <input type="password" v-model="password" placeholder="password" required>
                    <button class="login-btn" id="pass-login" type="submit">Login</button>
                    <span> login with Google account </span>
                    <div class="g-signin2" data-onsuccess="onSignin"></div>
                </form>
                <hr>
                <br>
                <div class="register">
                    <p>Dont have account ? <a href="#" >Register here</a></p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: `loginPage`,
  data() {
    return {
        email: "",
        password: ""
    };
  },
  methods: {
      login(){
          let payload = {
              email: this.email,
              password: this.password
          }
          this.$emit('loginSubmit', payload)
      }
  }
};
</script>

<style scoped>

</style>