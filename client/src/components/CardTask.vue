<template>
  <div class="col card-body">
    <h5 class="card-title">{{task.title}}</h5>
    <!-- <p>{{task.category}}</p> -->
    <div class="subtitle">
      <p class="card-subtitle mb-2 text-muted">{{task.createdAt.split('T')[0]}}</p>
      <div class="logo">
        
        <a v-show="showEditTask" @click.prevent="editTask(task.id)" href=""><i class="tiny material-icons">create</i></a>
          <!-- <div style="overflow: hidden;">
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <a @click.prevent="editTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>Edit Task</a>
            <a @click.prevent="cancelTask" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
          </div> -->
        <a @click.prevent="deleteTask(task.id)" href=""><i class="tiny material-icons">delete</i></a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'CardTask',
  props: ['task'],
  data() {
    return {
      isEditing: ''
    }
  },
  methods: {
    editTask() {
      axios({
        url: `/kanbans/${id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        console.log(data,'ini dari cardTask edit');
      })
      .catch(err => {
        console.log(err);
      })
    },
    showEditTask() {
      
    },
    deleteTask(id) {
      axios({
        url: `/kanbans/${id}`,
        method: 'DELETE',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({data}) => {
        console.log(data,'ini di cardtask');
        this.$emit('emitDelete')
      })
      .catch(err => {
        console.log(err);
      })
    }
    
  }
};
</script>

<style scoped>

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
}
</style>