<template>
  <login v-if="currentPage === 'loginPage'" :currentPage="currentPage" @loginSubmit="login" @fetchTask="fetchTask"></login>
  <home v-else :categories="categories" @fetchTask="fetchTask" @logout="logout"></home>
</template>

<script>
import axios from "./config/axios";
import login from "./views/login";
import home from "./views/home";
export default {
  name: "app",
  data() {
    return {
      currentPage: "loginPage",
      categories: [],
    };
  },

  components: {
    login,
    home,
  },

  methods: {
    token() {
      if (localStorage.getItem("access_token")) {
        this.currentPage = "home-page";
        this.fetchTask();
      } else {
        this.currentPage = "loginPage";
      }
    },

    login(payload) {

      axios({
        url: "/login",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          this.currentPage = "home-page";
          localStorage.setItem("access_token", data.acces_token);
          this.fetchTask()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchTask() {
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.categories = data;
          this.$emit('fetchTask')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout(){
      localStorage.removeItem('access_token')
      this.currentPage = 'loginPage'
    }
    
  },
  created() {
    this.token();
  },
};
</script>

<style scoped></style>
