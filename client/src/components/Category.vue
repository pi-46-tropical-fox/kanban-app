<template>
  <div>
    <div style="display: flex;overflow-x: scroll">
      <CategoryItem
        v-for="org in categoryData.Categories"
        :key="org.id"
        :org="org"
        :getCategory="getCategory"
        :categoryData="categoryData"
        @detailData="detailData"
      ></CategoryItem>

      <div
        class="shadow-sm"
        style="margin:1em 3em 4em 3em;background-color: #ebecf0;padding: 1em;height:4em;"
      >
        <h6
          style="font-weight: bold;font-size: 15px;width:10em;"
          v-if="!catForm"
          v-on:click="showAddCatForm"
        >
          <a href="#">+ Add New Category</a>
        </h6>
        <div v-if="catForm">
          <form @submit.prevent="postCategory(categoryData.id)">
            <div class="form-group" style="heigth:10em;">
              <input
                style="width:15em"
                type="text"
                class="form-control"
                v-model="title"
                aria-describedby="emailHelp"
                id="orgName"
              />
            </div>
            <div style="display:flex;flex-direction:row;">
              <button type="submit" class="btn btn-primary">Create</button>
              <button
                style="margin-left:1em;"
                class="btn btn-danger"
                v-on:click="showAddCatForm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <b-modal ref="my-modal" id="modal-5" title="Detail" hide-footer>
        <div>
          <form>
            <div>
              <label>Title</label>
              <input
                type="text"
                v-model="title"
                :placeholder="dataDetail.title"
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                v-model="description"
                :placeholder="dataDetail.description"
              />
            </div>
            <button
              type="submit"
              class="btn btn-success"
              v-on:click="editTask(dataDetail.id)"
            >
              Edit
            </button>
            <button
              type="submit"
              class="btn btn-danger"
              v-on:click="deleteTask(dataDetail.id)"
            >
              Delete
            </button>
          </form>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import Card from "../components/Card";
import CategoryItem from "../components/CategoryItem";

export default {
  name: "Kanban",
  data() {
    return {
      catForm: false,
      title: "",
      dataDetail: "",
      currentPost: "",
      currentCategory: "",
      description: ""
    };
  },
  components: {
    draggable,
    Card,
    CategoryItem,
  },
  props: ["categoryData", "getCategory"],
  methods: {
    showAddTaskForm(id) {
      this.activeId = id;
    },

    detailData(value) {
      console.log(value, "detaildata");
      this.dataDetail = value;
    },

    postCategory(id) {
      axios({
        method: "post",
        url: `https://ardy-kanban.herokuapp.com/category/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.title,
        },
      })
        .then((res) => {
          this.title = "";
          this.getCategory(this.$props.categoryData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteTask(id) {
      axios({
        method: "delete",
        url: `https://ardy-kanban.herokuapp.com/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
          this.$refs["my-modal"].hide();
          this.getCategory(this.$props.categoryData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editTask(id) {
      axios({
        method: "put",
        url: `https://ardy-kanban.herokuapp.com/task/all/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title : this.title,
          description: this.description
        },
      })
        .then((res) => {
          this.$refs["my-modal"].hide();
          this.getCategory(this.$props.categoryData.id);
          this.title = ""
          this.description = ""
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showAddCatForm() {
      this.catForm = !this.catForm;
    },
  },
};
</script>

<style></style>
