<template>
    <div>
        <h1>Ini dashboard yang dipake</h1>

        <Kanban 
            @changePage="changePage">
            </Kanban>

        <!-- <form action="">
            <div class="form-group">
                <label for="">Search</label>
                <input type="text" class="form-control" v-model="filter">
            </div>
            {{resultFilter}}
        </form> -->
        <!-- <div class="row">
            <CardCategories
                v-for="category in categoriesData "
                :category="category" 
                :key=category.id 
                />                    
        </div>
        

		<AddTodoForm  
			@createTask="addNewTodo">
			</AddTodoForm>
		<div>
			<ListTodo :todosData="todos" ></ListTodo>
		</div> -->
    </div>
</template>

<script>
// import CardCategories from '../components/CardCategories'
// import AddTodoForm from '../components/AddTodoForm'
// import ListTodo from '../components/ListTodo'
import Kanban from './Kanban'
export default {
    name: 'Dashboard',
    data() {
        return {
            activity: 'kanban',
        }
    },
    components: {
        Kanban
    },
    methods: {
        changePage(status){
           localStorage.clear()
           this.$emit('changePage', status)
        },

    }

}
</script>

<style>

</style>