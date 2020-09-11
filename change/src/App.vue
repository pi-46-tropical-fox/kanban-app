<template>
  <div>
    <LoginPage
      v-if="currentPage == 'login'"
      :changePage="changePage"
    ></LoginPage>

    <RegisterPage
      v-if="currentPage == 'register'"
      :changePage="changePage"
    ></RegisterPage>

    <Nav
    :changePage="changePage"
      v-if="
        currentPage == 'main-menu' ||
          currentPage == 'board' ||
          currentPage == 'category'
      "
    ></Nav>

    <Dashboard
      @getKanban="getBoard"
      :changePage="changePage"
      v-if="currentPage == 'main-menu' || currentPage == 'board'"
    ></Dashboard>

    <Kanban
      @rerenderData="getBoard"
      v-if="currentPage == 'category'"
      :currentPage="currentPage"
      :categoryData="categoryData"
    ></Kanban>
  </div>
</template>

<script>
import axios from "axios";

import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import Kanban from "./views/Kanban";
import Dashboard from "./views/Dashboard";

import Nav from "./components/Navbar";

export default {
  data() {
    return {
      currentPage: "login",
      categoryData: [],
    };
  },
  components: {
    LoginPage,
    RegisterPage,
    Nav,
    Kanban,
    Dashboard,
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    getBoard(value) {
      this.categoryData = value;
    },
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.currentPage = "main-menu";
    } else {
      this.currentPage = "login";
    }
  },
};
</script>

<style lang="scss"></style>
