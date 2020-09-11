<template>
  <div>
    <b-modal hide-footer id="modal-1" title="Add Your Task!">
      <b-form @submit.prevent="AddTask" inline>
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
        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    AddTask() {
      let payload = {
        title: this.title,
        description: this.description,
      };

      this.$emit("tasksSubmit", payload);
      this.title = '',
      this.description = ''
    },
  },
};
</script>

<style></style>
