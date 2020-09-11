<template>
  <div>
    <!-- Using modifiers
    <b-button v-b-modal.my-modal>Show Modal</b-button> -->
    <!-- Using value -->
    <b-button v-b-modal="'my-modal'">Show Modal</b-button>
    <!-- The modal -->
    <b-modal id="my-modal">Hello From My Modal!</b-modal>
    <div>
      <b-form @submit.prevent="addTask" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Task:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="addTitle"
            type="text"
            required
            placeholder="Enter Task"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Description:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="addDescription"
            type="text"
            required
            placeholder="Enter Description for describe the task"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <!-- <form action="" >

             <b-form-input v-model="addTask" placeholder="task"></b-form-input>
        </form> -->
      <!-- <div class="mt-2">Value: {{ text }}</div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "addTask",
  data() {
    return {
      addTitle: "",
      addDescription: "",
    };
  },
  methods: {
    addTask() {
      let payload = {
        title : this.addTitle,
        description : this.addDescription
      };
    },
  },
};
</script>

<style></style>
