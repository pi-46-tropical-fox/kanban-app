<template>
  <div>
    <b-modal hide-footer id="modal-2" title="Edit Your Task!">
      <b-form @submit.prevent="EditTask" inline>
        <label class="sr-only" for="inline-form-input-title">Title:</label>
        <b-input
          id="inline-form-input-title"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Title"
          v-model="title"
        ></b-input>
        <label class="sr-only" for="inline-form-input-title"
          >Description:</label
        >
        <br />
        <b-input
          id="inline-form-input-description"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Description"
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
  props: ["task"],
  data() {
    return {
      title: "",
      description: "",
      test: "",
    };
  },
  methods: {
    EditTask() {
      let payload = {
        title: this.title,
        description: this.description,
      };

      this.$emit("tasksEdit", payload);
      (this.title = ""), (this.description = "");
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
