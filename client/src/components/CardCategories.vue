<template>

  <div class="col-sm" style="min-width: 200px;" >
    <div class="shadow rounded">
      <div class="card text-white rounded mb-3 " style=" height: 450px; background-color: #797a7e;">
        <div class="card-header" >

			<span class="float-left font-weight-bold"><h5>{{category.title}}</h5> </span>
			<span class="float-right">
				<span type="button" class="material-icons mr-2" @click.prevent="editCategory(category.id)">edit</span>
				<span type="button" class="material-icons" @click.prevent="deleteCategory(category.id)">delete</span>
		</div>
          	<div class="card-body overflow-auto " style="max-height: 400px;">
              	<CardTasks
					v-for="task in category.Tasks"
					:task="task" 
					:key=task.id
					@getTaskId="getTaskbyId"
				/>
        	</div>
			<div class="card-footer text-muted">
				<button class="btn" style="background-color: #89beb3; color:white;" @click="createTask(category.id)">
					Create Task
				</button>
			</div>
      </div>
    </div>
  </div>
            <!-- <button @click.prevent="deleteItem(i) ">delete</button> -->
</template>

<script>
import axios from '../config/axios'
import Swal from 'sweetalert2'
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
			this.$emit('createTask', id)
		},
		getTaskbyId(id) {
			this.$emit('getTaskForm', id)
		},
		deleteCategory(id) {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire(
					'Deleted!',
					'Your category has been deleted.',
					'success'
					)
					console.log('masuk',id);
					axios({
						url: `/kanban/1/${id}`,
						method: 'DELETE',
						headers: {
							access_token: localStorage.getItem('access_token')
						}
					})
					this.$emit('deleteCategory', id)
				}
			})
		}		,
		editCategory(id) {
			this.$emit('editCategory', id)
		}
	},
	created(){
		
    },

}
</script>

<style>
.material-icons:hover {
	font-size:30px
}
</style>