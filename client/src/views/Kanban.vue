<template>
    <div class="container text-center" style="margin-top:30px;">
        <h1>KANBAN</h1>
        <h2>{{activity}}</h2>
        <div class="row">
            <CardCategories
                v-for="category in categories" :key="category.id"
                :category="category"
                @getTaskForm="showTaskForm"
                @createTask="createForm"
            />                    
        </div>
        
        <CreateTaskForm
        v-if="activity == 'createTask'"
        @createTask="submitTask"
        @changeActivity="changeActivity"
        />
        
        <TaskForm
        v-if="activity == 'getTask'"
        @changeActivity="changeActivity"
        />

		<!-- <AddTodoForm  
			@createTask="addNewTodo">
			</AddTodoForm> -->
		<!-- <div>
			<ListTodo :todosData="todos" ></ListTodo>
		</div> -->

		<!-- <DashBoardPage v-else-if="currentPage == 'dashBoardPage'"
			:categoriesData= "categories">
			</DashBoardPage> -->
    </div>
  
</template>

<script>
import axios from '../config/axios'
import CreateTaskForm from '../components/CreateTaskForm'
import TaskForm from '../components/TaskForm'
import CardCategories from '../components/CardCategories'
import AddTodoForm from '../components/AddTodoForm'
import ListTodo from '../components/ListTodo'
export default {
    name: 'Kanban',
    props: ['categoriesData'],
    data() {
        return {
            activity: '',
            categories: [],
            categoryId: null,
            taskData: null,
			todos: [
				{
					title: ' asdasdasdas asdasdasdads',
					textClass: 'text-primary'
				},
				{
					title: ' sdfsdfsdfadas asdasdsadas',
					textClass: 'text-secondary'
				},
				{
					title: '  s cadawdsa asdasdaads',
					textClass: 'text-danger'
                },
            ]
        }                       
    },
    components: {
        CardCategories,
        AddTodoForm,
        ListTodo,
        CreateTaskForm,
        TaskForm
    },
    methods: {
   		addNewTodo(payload) {
			this.todos.push(payload)
        },        
        changePage(status){
            localStorage.clear()
            this.$emit('changePage', status)
        },
        changeActivity(status){
            this.fetchProject()
            this.activity = status
        },
        createForm(id) {
            this.categoryId = id
            this.activity = 'createTask'
        },
        showTaskForm(id) {
            axios({
                url: `/kanban/1/task/${id}`,
                method: "GET",
				headers: {
					access_token: localStorage.access_token
				}
              })
              .then(({data})=> {
                this.taskData = data
                console.log(data,'ini ya');
                this.activity = 'getTask'
              })
              .catch(err=> {
                console.log(err);
              })
        },
        submitTask(payload){
            payload.CategoryId = this.categoryId
            payload.UserId = localStorage.UserId
            console.log(payload);
            axios({
                url: '/kanban/1',
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