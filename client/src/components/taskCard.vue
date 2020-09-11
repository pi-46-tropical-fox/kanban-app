<template>
  <div class="category-body">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">{{ new Date(task.createdAt).toISOString().split("T")[0] }} {{ new Date(task.createdAt).toISOString().split("T")[1].slice(0,8) }}</div>
      <div class="card-body" v-if="!isEditTC">
        <h5 class="card-title">{{ task.title }}</h5>
        <a class="btn btn-secondary" href="#" role="button" @click="toggleEdit">Edit</a>
        <a class="btn btn-danger" href="#" role="button" @click="deleteTask">Delete</a>
      </div>
    </div>
    <form @submit.prevent="editTask" v-if="isEditTC">
      <div class="form-group row">
        <div class="col-md-12">
          <input type="text" class="form-control" placeholder="Title" v-model="title" required/>
          </div>
        </div>
      <div class="form-group row">
        <div class="col-md-12">
          <select class="custom-select" v-model="categoryId">
            <option v-for="category in categoriesData" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-5 ml-auto">
          <button class="btn btn-danger" @click="toggleEdit">Cancel</button>
        </div>
        <div class="col-md-5 ml-auto">
          <button type="submit" class="btn btn-secondary">Edit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: ["task", "categoriesData", "isEdit"],
  data() {
    return {
      isEditTC: false,
      title: "",
      categoryId: "" 
    };
  },
  methods: {
    deleteTask() {
      let deleteId = this.task.id;
      this.$emit("deleteClick", deleteId);
    },
    toggleEdit() {
      if (this.isEditTC) {
        this.isEditTC = false;
      } else {
        this.isEditTC = true;
      }
    },
    editTask() {
      let editId = this.task.id
      let payload = {
        title: this.title,
        CategoryId: this.categoryId
      }
      this.$emit("editClick", editId, payload);
    },
  },
  created() {
    this.title = this.task.title;
    this.categoryId = this.task.CategoryId;
  },
}
</script>

<style>

</style>