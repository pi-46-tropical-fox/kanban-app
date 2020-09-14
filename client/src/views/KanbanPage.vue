<template>
  <Kanban
    :categoriesData = "categoriesData"
    :tasksData = "tasksData"
    :kanbanPageAlert = "kanbanPageAlert"
    v-on:editTaskTitle="editTaskTitle"
    v-on:submitEditTaskCategory="editTaskCategory"
    v-on:submitAddTask="addTask"
    v-on:submitDeleteCategory="deleteCategory"
    v-on:submitDeleteTask="deleteTask"
    v-on:submitAddCategory="addCategory"
    @logout="logout"
    >

  </Kanban>
</template>

<script>
import Kanban from "../components/Kanban"

export default {
  name: "KanbanPage",

  components: {
    Kanban
  },

  props:[
    "categoriesData",
    "tasksData",
    "kanbanPageAlert"

  ],
  methods: {
    logout(){
      this.$emit("logout",{})
    },
    addCategory(payload){
      this.$emit("submitAddCategory", payload)
    },
    deleteCategory(payload){
      this.$emit("submitDeleteCategory", payload)

    },
    editTaskTitle(payload){ 
      this.$emit("editTaskTitle", payload)
    },
    editTaskCategory(payload){
      console.log(payload, "dari page");
      this.$emit("submitEditTaskCategory", payload)
    },
    addTask(payload){
      this.$emit("submitAddTask", payload)
    },
    deleteTask(payload){
      this.$emit("submitDeleteTask", payload)
    },
  }
}
</script>

<style>

</style>