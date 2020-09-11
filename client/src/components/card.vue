<template>
    <div>
        <div class="card-group">
            <div class="card-group-header">
                <div class="title">
                    <h4>{{todo.title}}</h4>
                </div>
                <div class="action">
                    <a href=""><i v-on:click.prevent="deleteTask(todo.id)" class="fa fa-trash" aria-hidden="true"></i></a>
                </div>
            </div>
            <div class="description">
                <p>{{todo.description}}</p>
            </div>
            <div class="userInfo">
                <span>by: {{todo.User.name}}</span>
                <span>Due Date: {{todo.due_date}}</span>
            </div>
            <b-button v-b-modal.modal-1>Edit Task</b-button>
        </div>
        <!-- <edit :categories="categories" @addTodo='addTodo'></edit> -->
    </div>
</template>

<script>
import axios from '../config/axios'
import edit from './edit'
export default {
    name: 'Card',
    props: ['todo'],
    methods: {
        deleteTask(id) {
            console.log(id)
            
            axios({
                url: `/todos/delete/${id}`,
                method: "DELETE",
                headers: { 'access_token': localStorage.getItem('access_token')} 
            })
            .then(({response})=> {
                this.$emit('deleteTask')
            })
            .catch ( (err) => {
                
            })
        },

        editTask(id) {
            this.$emit('editTask', id)
        }
    }
    

}
</script>

<style>
.card-group-header {
    display: flex;
    justify-content: space-between ;
}

.userInfo {
    display: flex;
    flex-direction: column;
}
</style>