<template>
  <div class="category">
    <div class="card-board-header">
      <p class="category-header">
        {{category.title}}
        <a class="header-icon" href=""><img src="https://i.imgur.com/8p3yWXz.png" height="20px" alt=""></a>
      </p>
      <a class="waves-effect waves-light btn-large indigo" @click="isAdding=category.title" ><i class="material-icons left">add</i>add new task</a>
    </div>
  
    <div class="card-board-contents">
      <div v-if="category.title === 'backlog'">
        <div v-if="isAdding === 'backlog'"  class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click="isAdding = ''" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getBacklog"
        :key="task.id"
        :edit="edit"
        @emitEditTask="refreshTask"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
          
      </div>
      <div v-else-if="category.title === 'todo'">
        <div v-if="isAdding === 'todo'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click="isAdding = ''" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getTodo"
        :key="task.id"
        :edit="edit"
        @emitEditTask="refreshTask"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
      </div>
      <div v-else-if="category.title === 'doing'">
        <div v-if="isAdding === 'doing'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="30" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click="isAdding = ''" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getDoing"
        :key="task.id"
        :edit="edit"
        @emitEditTask="refreshTask"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
      </div>
      <div v-else>
        <div v-if="isAdding === 'completed'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click="isAdding = ''" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getCompleted"
        :key="task.id"
        :edit="edit"
        @emitEditTask="refreshTask"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
      </div>
    </div>
  </div>
</template>

<script>
import CardTask from './CardTask'
import axios from '../config/axios'
import Swal from 'sweetalert2'
export default {
  name: 'CardCategory',
  props: ['category', 'categories','tasks'],
  components: {
    CardTask
  },
  data() {
    return {
      isAdding: '',
      edit: '',
      title: '',
    }
  },
  computed: {
    getBacklog() {
      return this.tasks.filter(task => task.category === 'backlog')
    },
    getTodo() {
      return this.tasks.filter(task => task.category === 'todo')
    },
    getDoing() {
      return this.tasks.filter(task => task.category === 'doing')
    },
    getCompleted() {
      return this.tasks.filter(task => task.category === 'completed')
    }
  },
  methods: {
    addTask() {
      console.log('masuk add task');
      axios({
        url: '/kanbans',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.title,
          category: this.category.title
        }
      })
      .then(({data}) => {
        console.log(data,'<< ini data di method addtask');
        this.title = ''
        this.$emit('emitAddTask', 'Home')
        Swal.fire(
          'Good job!',
          'Successfully add task!',
          'success'
        )
        this.isAdding = ''
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteTask() {
      console.log('masuk delete di cardcategory');
      this.$emit('emitDelete')
    },
    editTask(id) {
      this.edit = id 
    },
    refreshTask() {
      console.log('card category refresh');
      this.$emit('emitEditTask')
    }
  }
}
</script>

<style>

.card-board-header {
  text-transform: capitalize;
  font-size: 1.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
}

.waves-effect.waves-light.btn-large.indigo {
  border-radius: 7px;
}

.add-task {
  padding: 1rem;
}

.text-area-task {
  background-color: #fff;
}
</style>