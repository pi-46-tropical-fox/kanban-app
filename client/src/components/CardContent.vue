<template>
  <div>
    <div :key="i" v-for="(task, i) in tasks" class="item">
      <TaskContent :task="task" :i="i" :id="id" :host="host"
        :update_form="update_form" taskActive="taskActive">
      </TaskContent>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";
import TaskContent from './TaskContent'

export default {
  name: 'CardContent',
  props: ['tasks', 'host', 'keys', 'boardList'],
  components: {
    TaskContent
  },
  data() {
    return {
      taskActive: null,
      update_form: null,
      id: ''
    }
  },
  created() {
    this.id = localStorage.id
  },
  methods: {
    deleteData(id) {
      axios.delete(`${this.host}/tasks/org/${id}`, {
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(response => {
        this.removeData(this.keys, id)
      })
      .catch(err => {
        console.log(err);
      })
    },
    updateStatus(id) {
      // console.log(this.keys);
      this.removeData(this.keys, id)
      axios({
        headers : {
          access_token : localStorage.access_token
        },
        method : 'patch',
        url : `${this.host}/tasks/org/${id}`
      })
      .then(response => {
        this.boardList[this.keys + 1].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    backStatus(id) {
      // console.log(id);
      this.removeData(this.keys, id)

      axios({
        headers : {
          access_token : localStorage.access_token
        },
        method : 'patch',
        url : `${this.host}/tasks/org/${id} `
      })
      .then(response => {
        this.boardList[this.keys - 1].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    removeData(keys, id) {
      this.$parent.$parent.removeElement(keys, id)
    },
    updateData(task, index) {
      this.tasks[index] = task
    },
    updateForm(id) {
      this.update_form = id
    }
  }
}
</script>

<style>
  a {
    text-decoration: none;
  }
</style>