<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
      <a class="navbar-brand text-muted" href="#">Kanban</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link text-muted" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <section class="container-fluid d-flex justify-content-around mt-5">
      <CategoryCard 
        v-for="category in categoriesData"
        :category="category"
        :tasksData="tasksData"
        :key="category.id"
        :categoriesData="categoriesData"
        @addTaskSubmit="addTaskSubmit"
        @deleteClick="deleteClick"
        @editClick="editClick"
        >
      </CategoryCard>
    </section>

    <!-- Footer -->
    <footer>
      <p class="mt-5 mb-3 text-muted text-center">Created by Full-Stuck Developer &copy; 2020</p>
    </footer>
  </div>
</template>

<script>
import CategoryCard from "../components/categoryCard";
export default {
  name: "Dashboard",
  props: ["tasksData", "categoriesData"],
  components: {
    CategoryCard
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("backToLogin");
    },
    addTaskSubmit(payload) {
      this.$emit("addTaskSubmit", payload);
    },
    deleteClick(deleteId) {
      this.$emit("deleteClick", deleteId);
    },
    editClick(editId, payload) {
      this.$emit("editClick", editId, payload);
    }
  }
}
</script>

<style>

</style>