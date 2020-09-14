<template>
  <div>
    <Navbar @logout="logout" @toRegister="changePage('register')" @toLogin="changePage('login')"></Navbar>
    <LoginPage v-if="pageName === 'login'" @loginApp="login" @googleChangePage="googlePage"></LoginPage>
    <HomePage v-if="pageName === 'home'" :categories="categories" :tasks="tasks" @toAddTask="toAddTask" @deleteTask="deleteTask" @toEdit='toEdit'></HomePage>
    <AddForm v-if="pageName === 'addTask'" @addTask="addTask" :selectedCategory="selectedCategory"></AddForm>
    <EditTask v-if="pageName=== 'editTask'" :edites='edites' @update='update'></EditTask>
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
      edites: {}
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
    // Update task
    update(paylod) {
      const {id,title,category} = paylod

      axios
      .put(`/tasks/${id}`,{
        title,category
      }, {
        headers: {
          access_token:localStorage.access_token
        }
      })
      .then(({data}) => {
        // console.log(data);
        this.changePage("home");
        this.fetchTasks()
      })
      .catch(err => {
        console.log(err);
      })
    },
    // mendapatkan task untuk edit
    toEdit(paylod) {
      // console.log(paylod);
      axios
      .get(`/tasks/${paylod}`,{
        headers: {
          access_token:localStorage.access_token
        }
      })
      .then(({data}) => {
        // console.log(data);
        this.edites = data
        this.changePage('editTask')

      })
      .catch(err => {
        console.log(err);
      })
    },
    // menampilkan form untuk add task
    toAddTask(paylod) {
      this.selectedCategory=paylod
      this.changePage('addTask')
    },
    // fungsi logout
    logout() {
      localStorage.clear()
      this.changePage('login')
    },
    // fungsi changpage
    changePage(page) {
      this.pageName = page;
    },
    // fungsi login
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
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    // fungsi register
    register(paylod) {
      const { email, password } = paylod;
      axios
        .post("/register", {
          email,
          password,
        })
        .then(({ data }) => {
          // console.log(data)          
          this.changePage("login");
        })
        .catch(console.log);
    },
    // fungsi checkout
    checkAuth() {
      if (localStorage.access_token) {
        this.changePage("home");
        this.fetchTasks();
      } else {
        this.changePage("login");
      }
    },
    googlePage(idToken) {
      console.log(idToken, 'ini id token dari google');
      axios({
        url: '/googleLogin',
        method: 'post',
        headers: {
          google_access_token: idToken
        }
      })
      .then(({data}) => {
          localStorage.setItem("access_token", data.access_token);
          this.changePage("home");
          this.fetchTasks()
        })
        .catch(err => {
          console.log(err.response.data);
        })
    
    },
    // fetch data
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
    // tambah task
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
    // delete task
    deleteTask(paylod) {
      // console.log(paylod);
      axios
      .delete(`/tasks/${paylod}`, {
        headers: {
              access_token: localStorage.access_token,
            }
      })
      .then((data) => {
        // console.log(data);
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
