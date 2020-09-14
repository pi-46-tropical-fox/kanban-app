<template>
  <div>
    <div :key="i" v-for="(task, i) in tasks" class="item">
      <TaskContent :task="task" :i="i" :id="id" 
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
  props: ['tasks', 'keys', 'boardList'],
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
      axios.delete(`/tasks/org/${id}`, {
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
        url : `/tasks/org1/${id}`
      })
      .then(response => {
        console.log(response.data, 'NEXT');
        this.boardList[this.keys + 1].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err);
      })
    },
    backStatus(id) {
      // console.log(id);
      // console.log('HIT <<<< CARD-BACKST');
      this.removeData(this.keys, id)
      // console.log('HIT <<<< CARD-BACKST');
      axios({
        headers : {
          access_token : localStorage.access_token
        },
        method : 'patch',
        url : `/tasks/org/${id}`
      })
      .then(response => {
        console.log(response.data, 'BACK');
        this.boardList[this.keys - 1].Tasks.push(response.data)
        this.$parent.$parent.boardRender(localStorage.OrganizationId)
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