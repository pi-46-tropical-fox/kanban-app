<template>
  <div class="container">
    <Accountpage
      v-if="currentPage === 'Loginpage'"
      @isLogin="isLogin"
      @getTask="getTask"
    >
    </Accountpage>
    <Dashboard
      v-else-if="currentPage === 'Dashboardpage'"
      :taskData="tasks"
      @logOut="logOut"
      @refetch="getTask"
      :catData="category"
      @deleted="deleted"
    >
    </Dashboard>
  </div>
</template>

<script>
import axios from "./axios/axiosInstance";
import Accountpage from "./views/accountPage";
import Dashboard from "./views/dashboardPage";
export default {
  name: "App",
  components: {
    Accountpage,
    Dashboard,
  },
  data() {
    return {
      currentPage: "Loginpage",
      tasks: [],
      category: [],
    };
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.currentPage = "Dashboardpage";
      this.getTask();
    } else {
      this.currentPage = "Loginpage";
    }
  },
  methods: {
    isLogin(payload) {
      this.currentPage = payload;
      this.getTask();
    },
    getTask() {
      console.log("berhasil get data");

      axios
        .get("/task", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          this.tasks = data;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCat() {
      axios
        .get("/category", {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data }) => {
          this.category = data;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logOut(payload) {
      this.currentPage = payload;
      this.tasks = [];
    },
    deleted(id) {
      axios
        .delete(`/task/${id}`, {
          headers: { access_token: localStorage.getItem("access_token") },
        })
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    googleLogin(token) {
      let self = this
      axios({
        url: `/googleLogin`,
        method: `POST`,
        headers: { google_access_token: token },
      })
        .then(({ data }) => {
          console.log(data.access_token);
          localStorage.setItem("access_token", data.access_token);
          self.currentPage = "Dashboardpage";
          self.getTask();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
