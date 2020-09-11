<template>
  <div>
    <h6 style="font-weight: bold;">{{ org.title }}</h6>
    <draggable :move="onMove" :list="org.Tasks" group="task" :category="org.id">
      <div v-for="task in org.Tasks" :key="task.id" :id="task.id">
        <a href="#" v-b-modal.modal-5 v-on:click="getTaskDetail(task.id)">
          <div
            class="shadow-sm rounded"
            style="background-color: #fff;font-size: 12px;margin-top: 1em;"
          >
            <p style="padding:5px;color:black;">{{ task.title }}</p>
          </div>
        </a>
      </div>
    </draggable>
    <div v-if="activeId != org.id" style="font-size: 12px;margin-top: 1em;">
      <a href="#" style="padding:5px;" v-on:click="showAddTaskForm(org.id)">
        + Create New Task
      </a>
    </div>
    <div v-if="activeId == org.id">
      <form @submit.prevent="postTask(org.id)">
        <input
          type="text"
          class="form-control"
          placeholder="Enter A Title"
          v-model="titleTask"
        />
        <div style="display: flex;justify-content: center;">
          <button class="btn btn-primary" style="padding: 0.2em;margin: 4px;">
            Add
          </button>
          <button
            class="btn btn-secondary"
            style="padding: 0.2em;margin: 4px;"
            v-on:click="showAddTaskForm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";

export default {
  name: "Card",
  data() {
    return {
        activeId: '',
        currentPost: "",
        currentCategory: "",
        titleTask: ""
    };
  },
  components: {
      draggable
  },
  props: [ 'org', 'categoryData', 'getCategory'],
  methods: {
    getTaskDetail(id) {
      axios({
        method: "get",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
        .then((res) => {
            this.$emit("detailData", res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    postTask(id) {
      axios({
        method: "post",
        url: `http://localhost:3000/task/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          title: this.titleTask,
        },
      })
        .then((res) => {
          this.titleTask = "";
          this.getCategory(this.$props.categoryData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showAddTaskForm(id) {
      this.activeId = id;
      this.taskForm = !this.taskForm;
    },

    onMove(evt) {
      this.currentPost = evt.draggedContext.element.id;
      this.currentCategory = evt.relatedContext.component.$attrs.category;

      axios({
        method: "put",
        url: `http://localhost:3000/task/${this.currentPost}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          CurrentCategory : this.currentCategory
        }
      })
        .then((res) => {
          console.log(res)
          // this.getCategory(this.$props.categoryData.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
