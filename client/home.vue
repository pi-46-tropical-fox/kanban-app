<template id="">
  <div>
    <HomePage @showHomePage="changePage" v-show="page == 'HomePage'"><div class="g-signin2" data-onsuccess="onSignIn"></div></HomePage>
    <LoginPage @afterPost="emit" @showLoginPage="changePage" v-show="page == 'LoginPage'"></LoginPage>
    <RegisterPage @afterPost="emit" @showRegisterPage="changePage" v-show="page == 'RegisterPage'"></RegisterPage>

  </div>
</template>

<script type="text/javascript">
  import HomePage from './HomePage.vue';
  import LoginPage from './LoginPage.vue';
  import RegisterPage from './RegisterPage.vue';
  export default {
    name: "Home",
    data() {
      return {
        page: 'HomePage'
      }
    },
    components: {
      HomePage,
      LoginPage,
      RegisterPage
    },
    methods: {
      changePage(value)
      {
        this.page = value;
      },
      emit()
      {
        this.$emit('afterLogin');
      }
    }
  }
</script>

<style media="screen">
</style>