<template>
    <div class="text-center" style="margin-top:30px;">
        <div>
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text"  style="margin-left: 20px; background-color: #89beb3; color:white;" for="inputGroupSelect01">Project</label>
  </div>
  <select class="custom-select" id="inputGroupSelect01">
    <option v-for="project in projects" :key="project.id" selected style="text-weight:bold;"
        >{{project.title}}</option>

  </select>
  <button class="btn" @click.prevent="addCategoryForm()" 
    style="margin-left: 20px; margin-right: 20px; background-color: #89beb3; color:white;" 
    data-toggle="modal" data-target="#staticBackdrop">
					Add Category
				</button>
</div>
</div>  
        <div  v-if="activity == 'show'" class="row flex-nowrap mr-2 ml-2" style="overflow-x: auto;">
            <CardCategories
                v-for="category in categories" :key="category.id"
                :category="category"
                @getTaskForm="showTaskForm"
                @createTask="createForm"
                @editCategory="editCategory"
                @deleteCategory="deleteCategory"
            />                    
        </div>
        <CancelButton v-if="activity != 'show'"
            @cancelAction="cancelAction"> 
            </CancelButton>
            
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
                    </AddCategoryForm>

                <EditCategoryForm v-if="activity == 'editCategory'"
                    :categoryData="categoryData"
                     @submitEdit="submitEdit">
                    </EditCategoryForm>
    </div>
  
</template>

<script>
import axios from '../config/axios'
import CreateTaskForm from '../components/CreateTaskForm'
import TaskForm from '../components/TaskForm'
import CardCategories from '../components/CardCategories'
import EditTaskForm from '../components/EditTaskForm'
import AddCategoryForm from '../components/AddCategoryForm'
import EditCategoryForm from '../components/EditCategoryForm'
import CancelButton from '../components/cancelButton'
export default {
    name: 'Kanban',
    props: ['categoriesData'],
    data() {
        return {
            username: '',
            activity: '',
            categories: [],
            categoryId: null,
            taskData: null,
            projects: [],    //asumsi saat ini hanya ada 1 project
            categoryData: {}
        }                       
    },
    components: {
        CardCategories,
        CreateTaskForm,
        TaskForm,
        EditTaskForm,
        AddCategoryForm,
        EditCategoryForm,
        CancelButton
    },
    methods: {
        cancelAction(payload) {
            this.activity =payload
        },
        editCategory(payload) {      
             axios({
                url: `/kanban/1/${payload}`,
                method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {
                this.categoryData = data
                this.activity = 'editCategory'
              })
        },
        submitEdit(payload) {
             axios({
                url: `/kanban/1/${payload.id}`,
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
        deleteCategory(payload) {
           this.activity = 'show'
           this.fetchCategories()
        },
   		addNewTodo(payload) {
			this.todos.push(payload)
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
            axios({
                url: `/kanban/1`,
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
            axios({
                url: '/kanban/1/tasks',
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
        
        fetchCategories() {
            
			axios({
				url: '/kanban/1',
				method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
			})
			.then(({data})=> {
                this.username = localStorage.username
                this.categories = data
			})
        },
        fetchProjects() {
            
			axios({
				url: '/kanban/', //asumsi hanya 1 project
				method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
			})
			.then(({data})=> {
                this.projects = data
			})
        },
 		
    },
    created() {
      this.fetchCategories()
      this.fetchProjects()
      this.activity = 'show'
    }
}
</script>

<style>

</style>