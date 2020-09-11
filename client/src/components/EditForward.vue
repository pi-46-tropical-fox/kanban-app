<template>
  <div>
    <b-modal hide-footer id="modal-9" title="Confirm">
      <b-form @submit.prevent="Forward" inline>
        <label class="sr-only" for="inline-form-input-title">Title:</label>
        <b-input
          id="inline-form-input-title"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Title"
          v-model="title"
          hidden
        ></b-input>
        <label class="sr-only" for="inline-form-input-title"
          >Description:</label
        >
        <br />
        <b-input
          id="inline-form-input-description"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Description"
          hidden
          v-model="description"
        ></b-input>
        <br />
        <b-button type="submit" variant="primary">Edit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "../config/axios";
export default {
  name: "EditTask",
  props: ["taskData"],
  data() {
    return {
      title: "",
      description: "",
      test: "",
    };
  },
  methods: {
    Forward() {

      this.$emit("Forward", this.tasksData);
    },
  },
  watch: {
    task() {
      this.title = this.task.title;
      this.description = this.task.description;
    },
  },
};
</script>

<style></style>
