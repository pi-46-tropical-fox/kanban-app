<template>
  <div class="col card-body">
    <h5 v-if="!isEditing" class="card-title">{{task.title}}</h5>
    <div v-if="isEditing" id="edit-form">
      <textarea v-model="task.title" name id cols="30" rows="10"></textarea>
      <select name="category" v-model="category" @change="changeCategory">
        <option :disabled="category === 'backlog'" :selected="category === 'backlog'" value="backlog">backlog</option>
        <option :disabled="category === 'todo'" :selected="category === 'todo'" value="todo">todo</option>
        <option :disabled="category === 'doing'" :selected="category === 'doing'" value="doing" >doing</option>
        <option :disabled="category === 'completed'" :selected="category === 'completed'" value="completed">completed</option>
      </select>
      <a @click.prevent="editTask" class="waves-effect waves-light btn-small green darken-1">
        <i class="material-icons left">check</i>Edit
      </a>
      <a @click="isEditing = false" class="waves-effect waves-light btn-small grey">
        <i class="material-icons left">close</i>Cancel
      </a>
    </div>
    <!-- <p>{{task.category}}</p>  -->
    <span class="card-subtitle mb-2 text-muted">by {{task.User.email.split('@')[0]}}</span>
    <div class="subtitle">
      <span class="card-subtitle mb-2 text-muted">{{toHumanString(task.createdAt)}}</span>
      <div class="logo">
        <a @click.prevent="isEditing = true" href>
          <i class="tiny material-icons">create</i>
        </a>
        <a @click.prevent="deleteTask(task.id)" href>
          <i class="tiny material-icons">delete</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from "../config/axios";
import moment from "moment";
export default {
  // el: '#edit-form',
  name: "CardTask",
  props: ["task", "edit"],
  data() {
    return {
      isEditing: false,
      category: "",
    };
  },
  methods: {
    editTask() {
      axios({
        url: `/kanbans/${this.task.id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          title: this.task.title,
          category: this.category,
        },
      })
        .then(({ data }) => {
          this.isEditing = false;
          this.$emit("emitEditTask", "CardCategory");
        })
        .catch((err) => {
          console.log(err);
        });
      console.log({
        title: this.task.title,
        category: this.category,
      });
    },
    deleteTask(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            url: `/kanbans/${id}`,
            method: "DELETE",
            headers: {
              access_token: localStorage.access_token,
            },
          })
            .then(({ data }) => {
              console.log(data, "ini di cardtask");
              this.$emit("emitDelete");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    toHumanString(date) {
      return moment(date).startOf("hour").fromNow();
    },
    changeCategory() {
      console.log(this.category);
    },
  },
  created() {
    this.category = this.task.category;
  },
};
</script>

<style scoped>

.card-title {
  padding-bottom: 1rem;
  font-size: 1.20rem;
}

.card-subtitle {
  font-size: 1em;
}

.subtitle {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

a {
  color: #000;
}

.col.card-body {
  font-size: 12px;
  padding: 0.5em 1.5em;
  -webkit-box-shadow: 0px 0px 20px -7px rgba(63,81,182,0.25);
  -moz-box-shadow: 0px 0px 20px -7px rgba(63,81,182,0.25);
  box-shadow: 0px 0px 20px -7px rgba(63,81,182,0.25);
}

select {
  display: block;
}
</style>