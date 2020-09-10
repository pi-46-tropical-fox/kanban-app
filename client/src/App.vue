<template>
	<div class="container">
    <h1>{{ message }}</h1>

		<LoginPage 
			v-if="currentPage == 'loginPage'"
			 @loginSubmit ="login">
			 </LoginPage>

		<DashBoardPage v-else-if="currentPage == 'dashBoardPage'"
			:categoriesData= "categories">

			</DashBoardPage>

		<AddTodoForm  
			@submitTodo="addNewTodo">
			</AddTodoForm>
		<div>
			<ListTodo :todosData="todos" ></ListTodo>
		</div>
	
	</div>
    <!-- <div class="container">
        <h1>ini form login</h1>
        <LoginPage></LoginPage>
    </div> -->
  
</template>

<script>
import axios from './config/axios'
import DashBoardPage from './views/Dashboard'
import LoginPage from './views/LoginPage'
import AddTodoForm from './components/AddTodoForm'
import ListTodo from './components/ListTodo'
export default {
name: 'App',
  	data() {
    	return {
				message: 'Hello Santuy',
				currentPage: 'loginPage',
				categories: [],
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
			AddTodoForm,
			ListTodo,
			LoginPage,
			DashBoardPage
    },
    methods:{
			checkAuth() {
				if (localStorage.access_token) {
					this.currentPage = 'dashBoardPage'
					this.fetchCategories()
				} else {
					this.currentPage = 'loginPage'
				}
			},
			addNewTodo(payload) {
				this.todos.push(payload)
			},
			login (payload) {
				axios({
					url: '/login',
					method: "POST",
					data: payload
				})
				.then(({data})=> {
					this.currentPage = 'dashBoardPage'
					localStorage.setItem('access_token',data.access_token)
				})
				.catch(err=> {
					console.log(err);
				})
			},
			fetchCategories() {
				console.log('masuk');
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
		created () {
			this.checkAuth()
		}
}
</script>

<style scoped>

</style>