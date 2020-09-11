<template>
  <div>
    <b-modal hide-footer id="modal-3" title="Add Task">
      <b-form @submit="addTask" inline>
    <label class="sr-only" for="inline-form-input-name">Name</label>
    <b-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Activity"
      v-model="title"
    ></b-input>

    <b-button variant="primary" type="submit">Add</b-button>
  </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "addTask",
  data() {
    return {
      title: "",
    };
  },

  methods: {
    addTask() {
      this.$emit("add", this.title);
      this.title=""
    },
  },
};
</script>

<style></style>
