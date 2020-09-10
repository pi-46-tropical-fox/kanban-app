<template>
  <div>
    <Navbar :page="page" @signout="signout" @signin="signin" @signup="signup"></Navbar>
    <AddTaskButton
      @addTask="addtask"
      v-if="page === 'home' || page === 'addtask' || page === 'edittask'"
    ></AddTaskButton>
    <Home
      @delete="deleteTask"
      @edit="edittask"
      @moveTodo="moveTodo"
      @moveBacklog="moveBacklog"
      @moveDoing="moveDoing"
      @moveDone="moveDone"
      :tasks="tasks"
      v-if="page === 'home' || page === 'addtask' || page === 'edittask'"
    ></Home>
    <Login @signup="signup" @loginSubmit="login" v-if="page === 'login'"></Login>
    <Register @registSubmit="register" v-if="page === 'register'"></Register>
    <AddForm @addTaskSubmit="addTask" @close="close" v-if="page === 'addtask'"></AddForm>
    <EditForm
      @editSubmit="editTask"
      @close="close"
      v-if="page === 'edittask'"
      :titleEdits="titleEdit"
      :descriptionEdits="descriptionEdit"
      :categoryEdits="categoryEdit"
      :idEdits="idEdit"
    ></EditForm>
  </div>
</template>

<script>
import Navbar from "./components/navbarPage";
import AddTaskButton from "./components/addtaskbut";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import AddForm from "./views/addTaskPage";
import EditForm from "./views/editTaskPage";
import axios from "axios";
import swal from "sweetalert";
export default {
  components: {
    Navbar,
    AddTaskButton,
    Home,
    Login,
    Register,
    AddForm,
    EditForm,
  },
  data() {
    return {
      page: "login",
      tasks: [],
      titleEdit: "",
      descriptionEdit: "",
      categoryEdit: "",
      idEdit: "",
    };
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.afterlogin();
    } else {
      this.page = "login";
    }
  },
  methods: {
    afterlogin() {
      axios({
        method: "GET",
        url: "http://localhost:3000/task",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.tasks = [];
          data.forEach((el) => {
            this.tasks.push(el);
          });
          // console.log(this.tasks)
          this.page = "home";
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    login(payload) {
      console.log(payload, "dari app vue");
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: payload,
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("name", data.name);
          swal({
            title: `Welcome ${data.name}`,
            icon: "success",
          });
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal("Ooooppss", response.data.message);
        });
    },
    signout() {
      swal({
        title: `See You ${localStorage.name}`,
        icon: "success",
      });
      localStorage.clear();
      this.page = "login";
    },
    signin() {
      this.page = "login";
    },
    signup() {
      this.page = "register";
    },
    register(payload) {
      axios({
        method: "POST",
        url: "http://localhost:3000/register",
        data: payload,
      })
        .then(({ data }) => {
          console.log("sukses registrasi");
          this.page = "login";
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal("Sorry", response.data.message);
        });
    },
    addtask() {
      this.page = "addtask";
    },
    close() {
      this.page = "home";
    },
    addTask(payload) {
      console.log("masuk add function");
      axios({
        method: "POST",
        url: "http://localhost:3000/task",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      })
        .then(({ data }) => {
          console.log(data);
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.errors[0].message);
          swal("!", response.data.errors[0].message.toUpperCase());
        });
    },
    deleteTask(id) {
      console.log(id);
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/task/${id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          })
          .then(() => {
            console.log("sukses delete id ", id);
            swal("Poof! Your task has been deleted!", {
              icon: "success",
            });
            this.afterlogin();
          })
          .catch(({ response }) => {
            console.log(response.data.message);
            swal(response.data.message, "It's not your task!", "warning");
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    },
    moveBacklog(id) {
      // console.log(id)
      axios({
        method: "GET",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.titleEdit = data[0].title;
          this.descriptionEdit = data[0].description;
          this.categoryEdit = data[0].category;

          return axios({
            method: "PUT",
            url: `http://localhost:3000/task/${id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: {
              title: this.titleEdit,
              description: this.descriptionEdit,
              category: "backlog",
            },
          });
        })
        .then(() => {
          console.log("sukses pindah ke backlog");
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal(response.data.message, "It's not your task!", "warning");
        });
    },
    moveTodo(id) {
      // console.log(id)
      axios({
        method: "GET",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.titleEdit = data[0].title;
          this.descriptionEdit = data[0].description;
          this.categoryEdit = data[0].category;

          return axios({
            method: "PUT",
            url: `http://localhost:3000/task/${id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: {
              title: this.titleEdit,
              description: this.descriptionEdit,
              category: "todo",
            },
          });
        })
        .then(() => {
          console.log("sukses pindah ke todo");
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal(response.data.message, "It's not your task!", "warning");
        });
    },
    moveDoing(id) {
      // console.log(id)
      axios({
        method: "GET",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.titleEdit = data[0].title;
          this.descriptionEdit = data[0].description;
          this.categoryEdit = data[0].category;

          return axios({
            method: "PUT",
            url: `http://localhost:3000/task/${id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: {
              title: this.titleEdit,
              description: this.descriptionEdit,
              category: "doing",
            },
          });
        })
        .then(() => {
          console.log("sukses pindah ke doing");
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal(response.data.message, "It's not your task!", "warning");
        });
    },
    moveDone(id) {
      // console.log(id)
      axios({
        method: "GET",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.titleEdit = data[0].title;
          this.descriptionEdit = data[0].description;
          this.categoryEdit = data[0].category;

          return axios({
            method: "PUT",
            url: `http://localhost:3000/task/${id}`,
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
            data: {
              title: this.titleEdit,
              description: this.descriptionEdit,
              category: "done",
            },
          });
        })
        .then(() => {
          console.log("sukses pindah ke done");
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal(response.data.message, "It's not your task!", "warning");
        });
    },
    edittask(id) {
      // console.log(id)
      axios({
        method: "GET",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then(({ data }) => {
          this.titleEdit = data[0].title;
          this.descriptionEdit = data[0].description;
          this.categoryEdit = data[0].category;
          this.idEdit = data[0].id;
          this.page = "edittask";
          // console.log(this.titleEdit, this.descriptionEdit.this.categoryEdit,this.idEdit);
        })
        .catch(({ response }) => {
          console.log(response.data.message);
          swal(response.data.message, "It's not your task!", "warning");
        });
    },
    editTask(payload) {
      console.log("masuk edit function", payload.id);
      axios({
        method: "PUT",
        url: `http://localhost:3000/task/${payload.id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: payload.title,
          description: payload.description,
          category: payload.category,
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.afterlogin();
        })
        .catch(({ response }) => {
          console.log(response.data.errors[0].message);
          swal(
            response.data.errors[0].message.toUpperCase(),
            "Close first, then edit again."
          );
        });
    },
  },
};
</script>

<style scoped>
</style>