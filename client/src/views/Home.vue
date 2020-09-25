<template>
  <div id="home" v-if="page === 'home'">
    <div class="ui">
    <div class="board-container">
      <Board v-for="board in boardCategory" :key="board.id"
        :boardCategory="board.category"
        :boardFooter="board.boardFooter"
        :classBody="board.classBody"
        :classFooter="board.classFooter"
      >
        <Card v-for="task in board.task" :key="task.id" :id="task.id" :title="task.title" :description="task.description" :Creator="task.Creator" :category="task.category" @deleteTask="deleteTask" @getData="getData">
        </Card>
      </Board>
      
    </div>
    <div class="modal fade" id="ModalEdit" tabindex="-1" role="dialog" aria-labelledby="ModalEditLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="ModalEditLabel">Update Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-form-label text-dark">Title</label>
                <input type="text" class="form-control " v-model="title">
              </div>
              <div class="form-group">
                <label class="col-form-label text-dark">Category</label>
                <select class="custom-select" v-model="category">
                  <option>Backlog</option>
                  <option>Todo</option>
                  <option>Done</option>
                  <option>Completed</option>
                </select>
              </div>
              <div class="form-group">
                <label class="col-form-label text-dark">Description</label>
                <textarea class="form-control" v-model="description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="updateTask">Update</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Card from "../components/Card"
import Board from "../components/Board"
import Modal from "../components/Modal"

export default {
  name: 'Home',
  components: {
    Card,
    Board,
    Modal,
  },
  props: [ 'page', 'backlogTasks', 'todoTasks', 'doneTasks', 'completedTasks' ],
  data() {
    return {
      id: null,
      title: null,
      description: null,
      boardCategory: [
        { category: "Backlog", boardFooter: "Footer", classBody: "cards-container bg-danger", classFooter: "board-footer bg-danger text-light", task: this.backlogTasks},
        { category: "Todo", boardFooter: "Footer", classBody: "cards-container bg-warning", classFooter: "board-footer bg-warning text-dark", task: this.todoTasks},
        { category: "Done", boardFooter: "Footer", classBody: "cards-container bg-info", classFooter: "board-footer bg-info text-light", task: this.doneTasks},
        { category: "Completed", boardFooter: "Footer", classBody: "cards-container bg-success", classFooter: "board-footer bg-success text-light", task: this.completedTasks}
      ],
      category: null,
      oldCategory: null,
    };
  },
  methods: {
    getData(id, title, description, category) {
      console.log(id, title, description, category)
      this.id = id
      this.title = title;
      this.description = description;
      this.category = category;
      this.oldCategory = category;
    },
    updateTask() {
      let id = this.id
      let oldCategory = this.oldCategory
      let category = this.category;

      let data = {
        id,
        title: this.title,
        description: this.description,
        category,
      }
      console.log(id)
      console.log(data)
      this.$emit('updateTask', id, data, oldCategory)
    },
    deleteTask(id, category) {
      console.log(id)
      this.$emit('deleteTask', id, category)
    }
  },
  watch: {
    backlogTasks() {
      this.boardCategory[0].task = this.backlogTasks
    },
    todoTasks() {
      this.boardCategory[1].task = this.todoTasks
    },
    doneTasks() {
      this.boardCategory[2].task = this.doneTasks
    },
    completedTasks() {
      this.boardCategory[3].task = this.completedTasks
    },
  },
};
</script>
