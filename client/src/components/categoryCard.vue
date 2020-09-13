<template>
  <div class="category shadow bg-light">
    <div class="card-header title-category shadow">
      <h4 class="text-center">{{ category.name }}</h4>
      <a @click.prevent="deleteCategory" href="#" class="btn-sm btn-danger">Delete</a>
    </div>
    <div class="category-body">
      <div class="form-group row">
        <div class="col-md-5 ml-auto">
          <a @click.prevent="toggleFormAdd" href="#" class="btn-sm btn-secondary">+ Add</a>
        </div>
      </div>
      <form @submit.prevent="addTask" v-if="isAdd">
        <div class="form-group row">
          <div class="col-md-12">
            <input type="text" class="form-control" placeholder="Title" v-model="title" required />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-5 ml-auto">
            <button type="submit" class="btn btn-secondary">Submit</button>
          </div>
        </div>
      </form>
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :categoriesData="categoriesData"
        :isEdit="isEdit"
        @deleteClick="deleteClick"
        @editClick="editClick"
        >
      </TaskCard>
    </div>
  </div>
</template>

<script>
import TaskCard from "./taskCard"
export default {
  name: "CategoryCard",
  props: ["category", "tasksData", "categoriesData", "isEdit"],
  data() {
    return {
      isAdd: false,
      title: "",
      CategoryId: ""
    };
  },
  components: {
    TaskCard
  },
  methods: {
    toggleFormAdd() {
      if (this.isAdd) {
        return this.isAdd = false;
      }
      this.isAdd = true;
    },
    addTask() {
      let payload = {
        title: this.title,
        CategoryId: this.category.id,
      }
      this.isAdd = false;
      this.$emit("addTaskSubmit", payload);
      this.title = "";
    },
    deleteClick(deleteId) {
      this.$emit("deleteClick", deleteId);
    },
    editClick(editId, payload) {
      this.$emit("editClick", editId, payload);
    },
    deleteCategory() {
      let deleteId = this.category.id;
      this.$emit("deleteCategory", deleteId);
    }
  },
  computed: {
    filteredTasks() {
      return this.tasksData.filter((task) => task.CategoryId === this.category.id);
    }
  },
}
</script>

<style>

</style>