<template>
  <div>
    <LoginPage v-if="pageName === 'login'" v-on:loginApp="login"> </LoginPage>
    <HomePage v-if="pageName === 'home'"> </HomePage>
  </div>
</template>

<script>
import axios from "axios";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";

export default {
  name: "App",
  data() {
    return {
      pageName: "login",
    };
  },
  components: {
    LoginPage,
    HomePage,
  },
  methods: {
    changePage(page) {
      this.pageName = page;
    },
    login(paylod) {
      //  console.log(paylod,'>>>>>ini payload')
      //  console.log(this.pageName)
      //  console.log('login masuk dari login page......,,')
      const { email, password } = paylod;
      axios
        .post("http://localhost:3000/login", {
          email,
          password,
        })
        .then(({ data }) => {
          // console.log(data)
          localStorage.setItem("access_token", data.access_token);
          this.changePage("home");
        })
        .catch(console.log);
    },
  },
};
</script>

<style scoped></style>
