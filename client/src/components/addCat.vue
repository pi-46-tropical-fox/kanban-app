<template>
  <div>
    <b-button v-b-modal.modal-3 @click.prevent="addCategory">Add category</b-button>
    <!-- <b-button v-b-modal.modal-1>Launch demo modal</b-button> -->
    <b-modal hide-footer id="modal-3">
    <b-form @submit.prevent="addCategory">
      <b-form-group id="input-group-1" label="category:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="category"
          type="text"
          required
          placeholder="Enter Category"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit">Add</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
     name: "addCat",
  data() {
    return {
        category :""
    };
  },
  methods: {
    addCategory() {
      let payload = {
        name: this.category
      }
      this.$emit("addCategory", payload);
      this.category = "";
    //   this.description = "";
    },
  },
}
</script>

<style>

</style>