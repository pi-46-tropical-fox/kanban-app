<template>
  <div>
    <div style="display: flex;overflow-x: scroll;height: 90vh;">
      <div v-for="org in categoryData.Categories" :key="org.id">
        <div
          class="shadow-sm p-3 mb-5 rounded"
          style="margin: 1em;background-color: #ebecf0;width: 15em !important;padding: 1em;"
        >
          <Card
            @detailData="detailData"
            :org="org"
            :categoryData="categoryData"
            :getCategory="getCategory"
          ></Card>
        </div>
      </div>

      <!-- Ini Panjang Karena Form -->
      <div
        class="shadow-sm"
        style="margin: 1em;background-color: #ebecf0;padding: 1em;height:4em;"
      >
        <h6
          style="font-weight: bold;font-size: 15px;width:10em"
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
                :value="dataDetail.title"
                placeholder="Enter The Title"
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                :value="dataDetail.description"
                placeholder="Enter The Description"
              />
            </div>
            <button type="submit" class="btn btn-success">Edit</button>
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

export default {
  name: "Kanban",
  data() {
    return {
      catForm: false,
      title: "",
      dataDetail: "",
      currentPost: "",
      currentCategory: "",
    };
  },
  components: {
    draggable,
    Card,
  },
  props: ["categoryData", "getCategory"],
  methods: {
    showAddTaskForm(id) {
      this.activeId = id;
    },

    detailData(value) {
      this.dataDetail = value;
    },

    postCategory(id) {
      axios({
        method: "post",
        url: `http://localhost:3000/category/${id}`,
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
        url: `http://localhost:3000/task/${id}`,
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

    showAddCatForm() {
      this.catForm = !this.catForm;
    },
  },
};
</script>

<style></style>
