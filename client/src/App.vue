<template>
  <div :class="authenticated ? 'pt-16 pb-8' : ''" class="overflow-y-auto">
    <Nav :settings="baseSettings" v-if="authenticated" @navigate="navigate" @logout="logout"></Nav>

    <!-- Login -->
    <AuthPage
      :settings="baseSettings"
      v-if="!authenticated"
      @login="login"
      @register="register"
      @googleLogin="googleLogin"
    ></AuthPage>

    <!-- Home -->
    <Dashboard
      class="container"
      :settings="baseSettings"
      :organizations="organizations"
      v-if="authenticated && page == 'dashboard'"
      @toggleModal="toggleDashboardModal('name')"
      @getProject="getProject"
    ></Dashboard>

    <!-- Kanban -->
    <Kanban
      :project="projectData"
      :settings="baseSettings"
      @createTask="createTask"
      v-if="authenticated && page == 'kanban'"
    ></Kanban>

    <Footer></Footer>
  </div>
</template>

<script>
import axios from "./config/axios";
import swal from "./config/swal";

// Base Components
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

// Pages
import AuthPage from "./views/AuthPage";
import Kanban from "./views/Kanban";
import Dashboard from "./views/Dashboard";

// Global functions

export default {
  name: "App",
  data() {
    return {
      baseSettings: {
        title: "Kanbanista!",
        description: "For those who love kanban-izing projects.",
      },
      authenticated: false,
      page: "",

      // 
      organizations: this.getOrganizations(),
      projectData: {},
    };
  },

  components: {
    Nav,
    Footer,

    AuthPage,
    Kanban,
    Dashboard,
  },

  methods: {
    // Auth
    checkAuth() {
      axios({
        url: "/auth/check",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(() => {
          this.authenticated = true;
          this.page = "dashboard";

          swal.showToastSuccess("Welcome back!");
        })
        .catch(() => {
          this.authenticated = false;
          this.page = "login";
        });
    },

    googleLogin(googleUser) {
      if (!localStorage.access_token) {
        const g_access_token = googleUser.getAuthResponse().id_token;

        axios({
          url: "/auth/login/google",
          method: "POST",
          headers: {
            g_access_token,
          },
        })
          .then((result) => {
            let { data } = result;

            Object.keys(data).forEach((key) => {
              localStorage.setItem(key, data[key]);
            });

            this.authenticated = true;
            this.page = "dashboard";

            swal.showToastSuccess("Logged in successfully.");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    login(data) {
      axios({
        url: "/auth/login",
        method: "POST",
        data
      })
        .then((result) => {
          let { data } = result;

          Object.keys(data).forEach((key) => {
            localStorage.setItem(key, data[key]);
          });

          this.authenticated = true;
          this.page = "dashboard";

          swal.showToastSuccess("Logged in successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    register(data) {
      axios({
        url: "/auth/register",
        method: "POST",
        data
      })
        .then((result) => {
          let { data } = result;

          swal.showToastSuccess("Registered successfully.");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async logout() {
      let auth2 = gapi.auth2.getAuthInstance();
      if (auth2) await auth2.signOut(auth2);

      localStorage.clear();

      this.authenticated = false;
      this.page = "login";

      swal.showToastSuccess("Logged out successfully.");
    },

    // Navigation
    navigate(name) {
      this.page = name;
    },

    // Dashboard
    getOrganizations(){
        axios({
            url: '/organizations',
            headers: {
                access_token: localStorage.access_token
            }
        })
        .then(response => {
            this.organizations = response.data
        })
        .catch(err => {})
    },

    toggleDashboardModal(name) {},

    // Projects
    getProject(id){
      axios({
          method: 'GET',
          url: `/projects/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
      })
      .then(project => {
        this.projectData = project.data
        this.page = "kanban";
      })
      .catch(err => {})
    },

    // Kanban --> main app
    toggleKanbanModal(name) {},

    createTask(payload) {
      let { data, projectId } = payload
      axios({
        method: 'POST',
        url: '/tasks',
        headers: {
          access_token: localStorage.access_token
        },
        data
      })
      .then(result => {
        this.getProject(projectId)

        swal.showToastSuccess("Successfully added a task.")
      })
      .catch(err => {
        console.log(err.response);
        swal.showSwalError(err.response.data.join('<br>'))
      })
    }
  },

  // computed: {
  //   updateProjectData(data){
  //     this.projectData = data
  //   }
  // },

  mounted() {
    this.checkAuth();
  },
};
</script>

<style>
</style>