<template>
  <div class="card">
    <h5 class="text-center">{{ title }}</h5>
    <p>{{ description }}</p>
    <p>
      <strong style="color: blue;">{{ Creator }}</strong>
    </p>

    <div v-if="Creator === name">
      <div v-if="category !== 'Completed'">
        <p
          class="btn btn-sm text-right"
          style="position:absolute; bottom:0; right: 20%;"
          data-toggle="modal"
          data-target="#ModalEdit"
          @click="getData(id, title, description, category)"
        >
          <a>
            <img src="https://img.icons8.com/material-sharp/24/000000/edit.png" />
          </a>
        </p>
      </div>

      <p
        class="btn btn-sm text-right"
        style="position:absolute; bottom:0; right: 5%;"
        @click="deleteTask(id, category)"
      >
        <a>
          <img src="https://img.icons8.com/color/24/000000/delete-forever.png" />
        </a>
      </p>
    </div>
    <!-- Ntar ada icon edit delete dan yang bisa act hanya punyanya sendiri-->
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "description", "Creator", "id", "category"],
  data() {
    return {
      name: localStorage.getItem("username")
    };
  },
  methods: {
    getData(id, title, description, category) {
      this.$emit("getData", id, title, description, category);
    },
    deleteTask(id, category) {
      this.$emit("deleteTask", id, category);
    }
  }
};
</script>
