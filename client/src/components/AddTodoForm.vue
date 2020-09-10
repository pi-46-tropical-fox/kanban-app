<template>
    <div>
        <form @submit.prevent="submitTodo">
            <div class="row">
                <div class="col-8">
                  <div class="form-group mb-2">
                    <input type="text" class="form-control" 
                    id="todo" placeholder="Your Todo"
                    v-model="newTodo"> 
                  </div>
                </div>
                <div class="col-4">
                    <button type="submit" class="btn btn-info btn-block mb-2">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddTodoForm',
    	data() {
        return {
          newTodo: '',
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
				}
			}
}
</script>

<style>

</style>