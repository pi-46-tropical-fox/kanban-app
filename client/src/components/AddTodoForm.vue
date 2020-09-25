<template>
    <div>
        <form @submit.prevent="createTask">
            <div class="row">
                <div class="col-8">
                  <div class="form-group mb-2">
                    <input type="text" class="form-control" 
                    id="todo" placeholder="Your Todo"
                    v-model="newTodo"> 
                  </div>
                </div>
                <div class="col-4">
                    <!-- <button type="submit" data-toggle="modal" data-target="#exampleModal" class="btn btn-info btn-block mb-2">Submit</button> -->
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'AddTodoForm',
    	data() {
        return {
          newTodo: '',
          // title: ''
        }
			},
			methods: {
				submitTodo() {
					let payload = {
						title: this.newTodo,
						textClass: 'text-danger'
					}
					this.$emit('submitTodo', payload)
					this.newTodo = ''
        },
        createTask() {
          let payload = {
            title: this.newTodo,
            description: 'nganuloh',
            CategoryId: 2,
            UserId: 1,
            }
          axios({
            url: '/kanban/1',
            method: "POST",
            data: payload,
            headers: {
              access_token: localStorage.access_token
            }
          })
          .then(({data})=> {
            this.categories = data
          })
        this.$emit('createTask', 'created')
				// this.newTodo = ''
      }
    },
}
</script>

<style>

</style>