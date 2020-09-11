<template>
  <div class="container">
    <LoginPage 
      v-if="currentPage === 'loginPage'"
      @loginSubmit="login"
      @registerClick="renderRegister"
      >
    </LoginPage>
    <RegisterPage
      v-else-if="currentPage === 'registerPage'"
      @registerSubmit="register"
      @backToLogin="checkAuth"
      >
    </RegisterPage>
    <DashboardPage 
      v-else-if="currentPage === 'dashboardPage'"
      :tasksData="tasks" 
      :categoriesData="categories"
      @backToLogin="checkAuth"
      @addTaskSubmit="addTask"
      @deleteClick="deleteClick"
      @editClick="editClick"
      >
    </DashboardPage>
  </div>
</template>

<script>
import axios from "./config/axios";
import LoginPage from "./views/Login";
import DashboardPage from "./views/Dashboard";
import RegisterPage from "./views/Register";
import swal from "sweetalert";
export default {
  name: "App",
  data() {
    return {
      message: "Hello world",
      currentPage: "loginPage",
      tasks: [],
      categories: []
    };
  },
  components: {
    LoginPage,
    DashboardPage,
    RegisterPage
  },
  methods: {
    checkAuth() {
      if (localStorage.access_token) {
        this.currentPage = "dashboardPage";
        this.fetchCategories();
      } else {
        this.currentPage = "loginPage"
      }
    },
    login(payload) {
      console.log(payload);

      axios({
        url: `/login`,
        method: "POST",
        data: payload
      })
        .then(({data}) => {
          this.currentPage = "dashboardPage"
          localStorage.setItem("access_token", data.access_token);
          console.log(data);
          this.fetchCategories();
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");
        });
    },
    fetchTasks() {
      axios({
        url: "/tasks",
        method: "GET",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");

        });
    },
    fetchCategories() {
      axios({
        url: "/categories",
        method: "GET",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.categories = data;
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");

        });
    },
    renderRegister() {
      this.currentPage = "registerPage"
    },
    register(payload) {
      console.log(payload);
      axios({
        url: "/register",
        method: "POST",
        data: payload
      })
        .then((data) => {
          this.currentPage = "dashboardPage"
          localStorage.setItem("access_token", data.access_token);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");

        })
    },
    addTask(payload) {
      console.log(payload);
      axios({
        url: "/tasks",
        method: "POST",
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then((data) => {
          swal("Good job!", "You clicked the button!", "success");
          this.fetchCategories();
          this.fetchTasks();
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");

        })
    },
    deleteClick(deleteId) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this tasks!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            url: `/tasks/${deleteId}`,
            method: "DELETE",
            headers: {
              access_token: localStorage.access_token
            }
          })
            .then((data) => {
              this.fetchCategories();
              this.fetchTasks();
            })
            .catch((err) => {
              console.log(err);
              swal(err.response.data.errors[0], "Error", "error");

            });
          swal("Your task has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your task is safe!");
        }
      });
    },
    editClick(editId, payload) {
      axios({
        url: `/tasks/${editId}`,
        method: "PUT",
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      })
        .then((data) => {
          this.fetchCategories();
          this.fetchTasks();
        })
        .catch((err) => {
          console.log(err);
          swal(err.response.data.errors[0], "Error", "error");

        });
    }
  },
  created() {
    console.log("ini created");
    this.checkAuth();
  }
};
</script>

<style>

</style>