<template>
  <section class="mt-5">
    <h3 class="text-center mb-4">
      <b>Your Kanban!</b>
    </h3>
    <div class="container">
      <div class="row">
        <!-- {{categories}} -->
        <Category
        v-for="(category,i) in categories"
        :key="i"
        :category='category'
        :tasks='tasks'
        @toAddTask = 'toAddTask'
        @deleteTask = 'deleteTask'
        @toEdit='toEdit'
        ></Category>
      </div>
    </div>
  </section>
</template>

<script>
import Category from "./category";
export default {
  name: "HomePage",
  components: {
    Category,
  },
  props: ['categories','tasks'],
  methods: {
    toEdit(paylod) {
      this.$emit('toEdit', paylod)
    },
    toAddTask(paylod) {
      this.$emit('toAddTask', paylod)
    },
    deleteTask(paylod) {
      this.$emit('deleteTask', paylod)
    }
  }
};
</script>

<style></style>
