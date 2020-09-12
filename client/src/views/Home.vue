<template>
  <!-- <pre>
    {{JSON.stringify(tasks,null,4)}}
  </pre> -->

  <div class="main-container">
    <!-- <div class="profile">
      <div class="user-profile">
        <p id="profile-name">Mario Armando Supit</p>
      </div>
    </div> -->
    <div class="board">
      <CardCategory
        v-for="(category, i) in categories"
        :category="category"
        :tasks="tasks"
        @emitAddTask="addTask"
        @emitEditTask="refreshTask"
        @emitDelete="deleteTask"
        :key="i">
      </CardCategory>
    </div>
  </div>
</template>

<script>
import CardTask from "../components/CardTask";
import CardCategory from "../components/CardCategory";
export default {
  name: "Home",
  props: ["tasks", "categories"],
  components: {
    CardTask,
    CardCategory,
  },
  methods: {
    addTask() {
      console.log('masuk sini emit di home');
      this.$emit('emitAddTask')
    },
    deleteTask() {
      console.log('masuk deleteTask di home');
      this.$emit('emitDelete')
    },
    refreshTask() {
      console.log('masuk edit task di home');
      this.$emit('emitEditTask')
    }
  }
};
</script>

<style scoped>

.main-container{
  /* background-image: url('https://i.imgur.com/sIRVPzA.jpg'); */
  height: 100%;
  margin-left: 15%; 
}

</style>
