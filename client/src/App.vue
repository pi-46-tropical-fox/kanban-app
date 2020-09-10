<template>
	<div class="container">
    <h1>{{ message }}</h1>
		<div class="mt-3">
		<AddTodoForm></AddTodoForm>
		</div>
		<div>
			<ListTodo></ListTodo>
		</div>
	
	</div>
    <!-- <div class="container">
        <h1>ini form login</h1>
        <LoginPage></LoginPage>
    </div> -->
  
</template>

<script>
// import LoginPage from './views/Login'
import AddTodoForm from './components/AddTodoForm'
import ListTodo from './components/ListTodo'
export default {
name: 'App',
  	data() {
    	return {
      	message: 'Hello Santuy',
    	}
   	},
    components: {
			AddTodoForm,
			ListTodo
         // Login
    },
    methods:{

    }

}
</script>

<style scoped>

</style>