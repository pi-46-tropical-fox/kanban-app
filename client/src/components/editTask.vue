<template>
<div>
    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
    <b-modal hide-footer id="modal-2">
    <b-form @submit.prevent="editTask">
      <b-form-group id="input-group-1" label="Task:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="editTitle"
          type="text"
          required
          placeholder="Enter Task"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="editDescription"
          type="text"
          required
          placeholder="Enter Description for describe the task"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit">Edit</b-button>
    </b-form>
    <!-- <form action="" >

             <b-form-input v-model="editTask" placeholder="task"></b-form-input>
        </form> -->
    <!-- <div class="mt-2">Value: {{ text }}</div> -->
  </div>
</template>

<script>
// import axios from '../axios/axiosInstance'
export default {
  name: "editTask",
  data() {
    return {
      editTitle: "",
      editDescription: "",
    };
  },
  methods: {
    editTask() {
      let payload = {
        title: this.editTitle,
        description: this.editDescription,
      };
      this.$emit("editTask", payload);
      this.title = "";
      this.description = "";
    },
  },
};
</script>

<style></style>
