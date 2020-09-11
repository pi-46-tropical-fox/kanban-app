<template>
  <div class="category">
    <div class="card-board-header">
      <a class="header-icon" href=""><img height="40px" alt=""></a>
      <p>
        {{category.title}}
      </p>
      <a class="waves-effect waves-light btn-large indigo" @click="isAdding=category.title" ><i class="material-icons left">add</i>add new task</a>
    </div>
    <div class="card-board-contents">
      <div v-if="category.title === 'backlog'">
        <div v-if="isAdding === 'backlog'"  class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click.prevent="cancelTask" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getBacklog"
        :key="task.id"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
        
      </div>
      <div v-else-if="category.title === 'todo'">
        <div v-if="isAdding === 'todo'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click.prevent="cancelTask" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getTodo"
        :key="task.id"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
      </div>
      <div v-else-if="category.title === 'doing'">
        <div v-if="isAdding === 'doing'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="30" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click.prevent="cancelTask" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getDoing"
        :key="task.id"
        @emitDelete="deleteTask"
        :task="task">
        </CardTask>
      </div>
      <div v-else>
        <div v-if="isAdding === 'completed'" class="add-task">
          <textarea class="text-area-task" name="" v-model="title" cols="40" rows="10"></textarea>
          <a @click.prevent="addTask" class="waves-effect waves-light btn-small green darken-1"><i class="material-icons left">check</i>add Task</a>
          <a @click.prevent="cancelTask" class="waves-effect waves-light btn-small grey"><i class="material-icons left">close</i>Cancel</a>
        </div>
        <CardTask 
        v-for="task in getCompleted"
        :key="task.id"
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
export default {
  name: 'CardCategory',
  props: ['category', 'categories','tasks'],
  components: {
    CardTask
  },
  data() {
    return {
      isAdding: '',
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
        
      })
      .catch(err => {
        console.log(err);
      })
    },
    cancelTask() {

    },
    deleteTask() {
      console.log('masuk delete di cardcategory');
      this.$emit('emitDelete')
    },
    editTask() {

    }
  }
}
</script>

<style>

.card-board-header {
  text-transform: capitalize;
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