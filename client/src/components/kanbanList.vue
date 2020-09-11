<template>
  <div class="px-6 py-4 bg-white p-10 m-3 card-task">
    <div class="container-row">
      <div class="container-row" id="editTask" @click="openEditor">
        <div v-html="editLogo">
        </div>
        <p class="text-xs text-yellow-500	">edit</p>
      </div>

      <div class="container-row" id="deleteTask" @click="deleteTask">
        <p class="text-xs text-gray-500	">delete</p>
        <div v-html="deleteLogo"></div>
      </div>
    </div>
    <div class="font-bold text-base mb-2">
      <p> {{ task.title }} </p>
    </div>

    <p class="text-gray-600 text-xs">{{new Date(task.createdAt).toDateString()}}</p>

    <form @submit.prevent="editTask" v-if="updateTask" class="bg-yellow-300 flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2">
      <textarea id="card-edit" v-model="valForUpdateTask" placeholder="Enter task" class="overflow-auto bg-pink-100">
      </textarea>
      <div>
        <label for="edit">Move To:</label>
        <select name="categoryTask" v-model="categoryTask" class="bg-pink-100">
          <option value="plan">Plan</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm">Edit
        Task</button>
      <button @click.prevent="openEditor"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
export default {
  name: 'kanbanList',
  props: ['task', 'baseUrl', 'type'],
  data () {
    return {
      updateTask: false,
      valForUpdateTask:'',
      categoryTask: this.task.category.toLowerCase(),
      editLogo:`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M9.963 8.261c-.566-.585-.536-1.503.047-2.07l5.948-5.768c.291-.281.664-.423 1.035-.423.376 0 .75.146 1.035.44l-8.065 7.821zm-9.778 14.696c-.123.118-.185.277-.185.436 0 .333.271.607.607.607.152 0 .305-.057.423-.171l.999-.972-.845-.872-.999.972zm8.44-11.234l-3.419 3.314c-1.837 1.781-2.774 3.507-3.64 5.916l1.509 1.559c2.434-.79 4.187-1.673 6.024-3.455l3.418-3.315-3.892-4.019zm9.97-10.212l-8.806 8.54 4.436 4.579 8.806-8.538c.645-.626.969-1.458.969-2.291 0-2.784-3.373-4.261-5.405-2.29z"/></svg>`,
      deleteLogo:`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>`
    }
  },
  methods: {
    editTask() {
      const id = this.task.id
      axios({
          method: 'PUT',
          url: this.baseUrl + `/tasks/${id}`,
          data: {
            category: this.categoryTask,
            title: this.valForUpdateTask
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        .then(res => {
          this.$emit('fetchTasks')
          this.updateTask = false
        })
        .catch(err => {
          swal("Not Allowed!", "You can't edit file other than yours!", "error");
        })
    },
    deleteTask() {
      const category = this.type
      const id = this.task.id
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this task!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios({
                method: 'DELETE',
                url: this.baseUrl + `/tasks/${id}`,
                headers: {
                  access_token: localStorage.access_token
                }
              })
              .then(res => {
                this.$emit('fetchTasks')
                swal("Poof! Your task has been deleted!", {
                  icon: "success",
                });
              })
              .catch(err => {
                swal("Not Allowed!", "Not Allowed to delete this file!", "error");
              })

          } else {
            swal("Cancel delete!");
          }
        });

    },
    openEditor() {
      this.updateTask = !this.updateTask
      this.valForUpdateTask = this.task.title
    }
  }
}
</script>

<style scoped>
  #editTask{
    fill:darkslateblue;
  }
  #editTask:hover{
    fill:burlywood;
    color: burlywood;
    cursor: pointer;
  }
  #deleteTask{
    fill: red;
  }
  #deleteTask:hover{
    fill: chocolate;
    cursor: pointer;
  }

  .card-task:hover {
    cursor: pointer;
    box-shadow: -2px -1px 18px -6px rgba(161,155,161,1);
  }

</style>