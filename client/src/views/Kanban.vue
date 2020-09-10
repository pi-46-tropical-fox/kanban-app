<template>
    <div class="container text-center" style="margin-top:30px;">
        <h1>KANBAN</h1>
        <div class="row">
                <CardCategories
                    v-for="category in categories" :key="category.id"
                    :category="category"
                    @changeActivity="changeActivity"
                />                    
        </div>
        
<!-- 
		<AddTodoForm  
			@createTask="addNewTodo">
			</AddTodoForm>
		<div>
			<ListTodo :todosData="todos" ></ListTodo>
		</div> -->

		<!-- <DashBoardPage v-else-if="currentPage == 'dashBoardPage'"
			:categoriesData= "categories">
			</DashBoardPage> -->
    </div>
  
</template>

<script>
import axios from '../config/axios'
import CardCategories from '../components/CardCategories'
import AddTodoForm from '../components/AddTodoForm'
import ListTodo from '../components/ListTodo'
export default {
    name: 'Kanban',
    props: ['categoriesData'],
    data() {
        return {
            activity: 'show',
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
        CardCategories,
        AddTodoForm,
        ListTodo,
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
        fetchCategories() {
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
		}       		
    },
    created() {
      this.fetchCategories()
    }
}
</script>

<style>

</style>