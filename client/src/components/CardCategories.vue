<template>

  <div class="col-sm" >
    <div class="shadow rounded">
      <div class="card text-white rounded bg-danger mb-3">
        <div class="card-header" ><span>{{category.title}}</span>

		</div>
          	<div class="card-body overflow-auto" style="max-height: 400px;">
              	<CardTasks
					v-for="task in category.Tasks"
					:task="task" 
					:key=task.id
					@getTaskId="getTaskbyId"
				/>
        	</div>
			<div class="card-footer text-muted">
				<button class="btn btn-primary" @click="createTask(category.id)">
					Create Task
				</button>
			</div>
      </div>
    </div>
  </div>
            <!-- <button @click.prevent="deleteItem(i) ">delete</button> -->
</template>

<script>

import CardTasks from	'./CardTasks'
export default {
	name: 'CardCategories',
	props: ['category'],
	data() {
		return {
			tasks: [],
		}
	},
	components: {
		CardTasks,

	},
	methods: {
		createTask(id) {
			console.log('masuk',id);
			this.$emit('createTask', id)
		},
		getTaskbyId(id) {
			console.log('masuk dikit lagi',id);
			this.$emit('getTaskForm', id)
		},		
	},
	created(){
		
    },

}
</script>

<style>

</style>