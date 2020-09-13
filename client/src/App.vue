<template>
  <div>
    <Navbar @logout="logout" @toRegister="changePage('register')" @toLogin="changePage('login')"></Navbar>
    <LoginPage v-if="pageName === 'login'" @loginApp="login"></LoginPage>
    <HomePage v-if="pageName === 'home'" :categories="categories" :tasks="tasks" @toAddTask="toAddTask" @deleteTask="deleteTask"></HomePage>
    <AddForm v-if="pageName === 'addTask'" @addTask="addTask" :selectedCategory="selectedCategory"></AddForm>
    <EditTask v-if="pageName=== 'editTask'"></EditTask>
    <Register v-if="pageName === 'register'" @register="register"></Register>
  </div>
</template>

<script>
import axios from "./config/axios";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";
import AddForm from "./components/addForm";
import Navbar from './components/navbar'
import EditTask from './components/editForm'
import Register from './components/register'
export default {
  name: "App",
  data() {
    return {
      pageName: "login",
      selectedCategory: '',
      categories: [
        {
          title: "Backlog",
          color: "bg-danger",
          category: "backlog",
        },
        {
          title: "Todo",
          color: "bg-warning",
          category: "todo",
        },
        {
          title: "Doing",
          color: "bg-success",
          category: "doing",
        },
        {
          title: "Done",
          color: "bg-info",
          category: "done",
        },
      ],
      tasks: [],
    };
  },
  components: {
    LoginPage,
    HomePage,
    AddForm,
    Navbar,
    EditTask,
    Register
  },
  methods: {
    // deleteTask(paylod) {
    //   console.log(paylod);
    // },
    toAddTask(paylod) {
      this.selectedCategory=paylod
      this.changePage('addTask')
    },
    logout() {
      localStorage.clear()
      this.changePage('login')
    },
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
          this.fetchTasks()
        })
        .catch(console.log);
    },
    register(paylod) {
      const { email, password } = paylod;
      axios
        .post("/register", {
          email,
          password,
        })
        .then(({ data }) => {
          console.log(data)          
          this.changePage("login");
        })
        .catch(console.log);
    },
    checkAuth() {
      if (localStorage.access_token) {
        this.changePage("home");
        this.fetchTasks();
      } else {
        this.changePage("login");
      }
    },
    fetchTasks() {
      axios
        .get("/tasks", {
          headers: {
            access_token: localStorage.access_token,
          },
        })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(console.log);
    },
    addTask(payload) {
      const { title, category } = payload;

      axios
        .post(
          "/tasks",
          {
            title,
            category,
          },
          {
            headers: {
              access_token: localStorage.access_token,
            },
          }
        )
        .then(({ data }) => {
          this.changePage('home')
          this.fetchTasks();
        })
        .catch(console.log);
    },
    deleteTask(paylod) {
      console.log(paylod);
      axios
      .delete(`/tasks/${paylod}`, {
        headers: {
              access_token: localStorage.access_token,
            }
      })
      .then((data) => {
        console.log(data);
        this.changePage('home')
        this.fetchTasks();
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style scoped></style>
