<template>
  <section id="kanban">
    <div class="container mb-4">
      <h3>{{ project.name }}</h3>
    </div>
    <div
      class="absolute overflow-x-auto left-0 flex justify-start"
      style="min-width: 100vw; height: calc(100vh - 10em)"
    >
      <Board
        style="flex: 0 0 300px; height: min-content"
        class="p-4 mx-4 w-4/12"
        v-for="board in project.Boards"
        @createTask="createTask"
        :board="board"
        :key="board.id"
      ></Board>
      <div class="mx-4 w-4/12" style="flex: 0 0 300px">
        <a href="#" @click.prevent="toggleBoardForm" class="bg-white p-4 mx-4 self-start card hover:bg-gray-300">
          <h4>+ Add new column</h4>
        </a>
      </div>
    </div>
    <!-- <section id="task-details" class="modal"></section> -->
  </section>
</template>

<script>
import Board from "../components/board/List";

export default {
  props: {
    settings: Object,
    project: Object,
  },

  components: {
    Board,
  },

  methods: {
    showCategoryForm(){
      //
    },

    createTask(data){
      this.$emit('createTask', data)
    }
  },
};
</script>

<style>
</style>