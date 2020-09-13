<template>
  <Category :categoryData="categoryData" :getCategory="getCategory"></Category>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import Card from "../components/Card";
import Category from "../components/Category";

export default {
  name: "Kanban",
  data() {
    return {};
  },
  components: {
    Category,
  },
  props: ["categoryData"],
  methods: {
    getCategory(id) {
      axios({
        method: "get",
        url: `https://ardy-kanban.herokuapp.com/category/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.$emit("rerenderData", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style></style>
