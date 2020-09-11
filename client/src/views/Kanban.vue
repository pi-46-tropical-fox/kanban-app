<template>
    <div class="text-center" style="margin-top:30px;">
        <h1>KANBAN</h1>
        <div><div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="inputGroupSelect01">Project</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <option selected>Choose...</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <button class="btn btn-primary" @click.prevent="addCategoryForm()" 
  style="margin-left: 20px" data-toggle="modal" data-target="#staticBackdrop">
					Add Category
				</button>
</div></div>
        <div class="row flex-nowrap mr-2 ml-2" style="overflow-x: auto;">
            <CardCategories
                v-for="category in categories" :key="category.id"
                :category="category"
                @getTaskForm="showTaskForm"
                @createTask="createForm"
            />                    
        </div>
            <EditTaskForm
                v-if="activity == 'editTask'"
                :taskData="taskData"
                @editTask="submitEditTask">
            </EditTaskForm>


            <CreateTaskForm
                v-if="activity == 'createTask'"
                @createTask="submitCreateTask"
                >
            </CreateTaskForm>
            
            <TaskForm
                v-if="activity == 'getTask'"
                :taskData="taskData"
                @editTask="editForm"
                @backCategory="backCategory"
				@nextCategory="nextCategory"
                @changeActivity="changeActivity"
                >
                </TaskForm>

                <AddCategoryForm v-if="activity == 'createCategory'"
                     @createCategory="submitCreateCategory">
                    </AddCategoryForm>>
    </div>
  
</template>

<script>
import axios from '../config/axios'
import CreateTaskForm from '../components/CreateTaskForm'
import TaskForm from '../components/TaskForm'
import CardCategories from '../components/CardCategories'
import EditTaskForm from '../components/EditTaskForm'
import AddCategoryForm from '../components/AddCategoryForm'
export default {
    name: 'Kanban',
    props: ['categoriesData'],
    data() {
        return {
            activity: '',
            categories: [],
            categoryId: null,
            taskData: null,
            projectId: 1, //asumsi saat ini hanya ada 1 project
        }                       
    },
    components: {
        CardCategories,
        CreateTaskForm,
        TaskForm,
        EditTaskForm,
        AddCategoryForm
    },
    methods: {
   		addNewTodo(payload) {
			this.todos.push(payload)
        },    
        nextCategory(id) {

        },
        backCategory(id) {

        },
        changePage(status){
            localStorage.clear()
            this.$emit('changePage', status)
        },

        changeActivity(status){
            this.fetchCategories()
            this.activity = status
        },

        createForm(id) {
            this.categoryId = id
            this.activity = 'createTask'
        },

        editForm(id) {
            this.categoryId = id
            this.activity = 'editTask'
        },
        deleteForm(id) {
            this.categoryId = id
        },
        addCategoryForm() {
            this.activity = 'createCategory'
        },
        showTaskForm(id) {
            axios({
                url: `/kanban/1/tasks/${id}`,
                method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {
                this.taskData = data
                this.activity = 'getTask'
              })
        },
        submitCreateCategory(payload){
            payload.ProjectId = this.projectId
            axios({
                url: `/kanban/${this.projectId}`,
                method: "POST",
                data: payload,
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {	
                this.activity = 'show'
                this.fetchCategories()
              })
        },
         
        submitEditTask(payload){
            console.log(payload);
            payload.CategoryId = this.categoryId
            payload.UserId = +localStorage.UserId
            axios({
                url: `/kanban/1/tasks/${payload.id}`,
                method: "PUT",
                data: payload,
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {				
                this.activity = 'show'
                this.fetchCategories()
              })
        },

        submitCreateTask(payload){
            payload.CategoryId = this.categoryId
            payload.UserId = +localStorage.UserId
            console.log(payload);
            axios({
                url: '/kanban/1/tasks',
                method: "POST",
                data: payload,
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {
                console.log('create success');					
                this.activity = 'show'
                this.fetchCategories()
              })
              .catch(err=> {
                console.log(err);
              })
        },
        
        fetchCategories() {
            console.log('jalan');
			axios({
				url: '/kanban/1',
				method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
			})
			.then(({data})=> {
				this.categories = data
			})
	        .catch(err=> {
			    console.log(err);
			})
        },
 		
    },
    created() {
      this.fetchCategories()
    }
}
</script>

<style>

</style>