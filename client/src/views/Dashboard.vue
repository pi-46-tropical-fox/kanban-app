<template>
  <div style="display:flex;margin: 1em 5em;">
    <Organization :getBoard="getBoard"></Organization>
    <Board
      :boardData="boardData"
      :getBoard="getBoard"
      :getCategory="getCategory"
    ></Board>
  </div>
</template>

<script>
import axios from "axios";

import Organization from "../components/Organization";
import Board from "../components/Board";

export default {
  data() {
    return {
      boardData: [],
      categoryData: [],
    };
  },
  props: ["changePage"],
  components: {
    Organization,
    Board,
  },
  methods: {
    getBoard(id) {
      axios
        .get(`https://ardy-kanban.herokuapp.com/board/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          this.boardData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getCategory(id) {
      axios({
        method: "get",
        url: `https://ardy-kanban.herokuapp.com/category/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          console.log(res.data)
          this.categoryData = res.data;
          this.$props.changePage("category");
          this.$emit("getKanban", this.categoryData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
