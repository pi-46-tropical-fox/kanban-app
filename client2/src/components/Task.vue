<template>
  <div>
    <b-card class="mb-3" style="max-width: 20rem;">
        <b-card-body>
          <b-card-title>{{todo.title}}</b-card-title>
        </b-card-body>

        <b-list-group flush>
          <b-list-group-item>Description: {{todo.description}}</b-list-group-item>
          <b-list-group-item>Due date: {{todo.due_date.split('T')[0]}}</b-list-group-item>
          <b-list-group-item>by: {{todo.User.name}}</b-list-group-item>
        </b-list-group>

        <b-card-body>
          <b-button id="show-btn" @click="showModal('modal-prevent-editTask')">Edit Task</b-button>
          <a v-on:click.prevent="deleteTask(todo.id)" class="card-link">Delete</a>
        </b-card-body>
    </b-card>
    <EditTask :todo="todo" :categories="categories" @editTask='editTask'></EditTask>
  </div>
</template>

<script>
import axios from '../config/axios'
import EditTask from './EditTask'
export default {
    name: 'Task',
    props: ['todo', 'categories'],
    components: {
       EditTask 
    },
    methods: {
        deleteTask(id) {
            console.log(id)
            
            axios({
                url: `/todos/${id}`,
                method: 'DELETE',
                headers: { 'access_token': localStorage.getItem('access_token')} 
            })
            .then(({response})=> {
                console.log(response, 'ini dr then delete')
                this.$emit('deleteTask')
            })
            .catch ( (err) => {
                console.log(response, 'ini dr catch delete')
            })
        },

        editTask(id) {
            this.$emit('editTask')
        },
        showModal() {
            this.$bvModal.show(`modal-prevent-editTask-${this.todo.id}`)
            
        }
    }
    

}
</script>


<style>

</style>