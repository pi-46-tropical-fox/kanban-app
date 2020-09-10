<template>
  <div>
    <LoginPage 
    v-if="pageName === 'login'" 
    @loginApp="login"
    > </LoginPage>
    <HomePage 
    v-if="pageName === 'home'"
    :categories='categories'
    :tasks='tasks'
    > </HomePage>
  </div>
</template>

<script>
import axios from "./config/axios";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";

export default {
  name: "App",
  data() {
    return {
      pageName: "login",
      categories: [
        {
        title:'Backlog',
        color: 'bg-danger',
        category: 'backlog'
        },
        {
        title:'Todo',
        color: 'bg-warning',
        category: 'todo'
        },
        {
        title:'Doing',
        color: 'bg-success',
        category: 'doing'
        },
        {
        title:'Done',
        color: 'bg-info',
        category: 'done'
        },
      ],
      tasks: [],
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
      
      const { email, password } = paylod;
      axios
        .post("/login", {
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
    checkAuth() {
      if(localStorage.access_token) {
        this.changePage('home')
        this.fetchTasks()
      } else {
        this.changePage('login')
      }
    },
    fetchTasks() {
      axios
      .get('/tasks', {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        this.tasks = data
      })
      .catch(console.log)
    },
  },
  created() {
    this.checkAuth()
  },
};
</script>

<style scoped></style>
