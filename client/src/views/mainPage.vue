<template>
    <div class='mainPage'>
        <navbar @logout='logout'></navbar>
            
        <div class="main">
            
            <b-button v-b-modal.modal>add Task</b-button>
            
            <div class='category'>
                <cardGroup
                    v-for="(category) in categories"
                    :category="category"
                    :todos="todos"
                    :key="category.id"
                    @deleteTask='deleteTask'
                ></cardGroup>
            </div>
        </div>  
    <add :categories="categories" @addTodo='addTodo'></add>
  </div>
</template>

<script>
import axios from '../config/axios'
import add from '../components/add'
import navbar from '../components/navbar'
import cardGroup from '../components/cardGroup'
export default {
    name: 'mainPage',
    props: ['categories' , 'todos'],
   
    components : {
        navbar,
        cardGroup,
        add
    },
    methods : {
        logout () {
            this.$emit('logoutClick')
        },
        addTodo (payload) {
            axios({
                url: '/todos/add',
                method: "POST",
                data: payload,
                headers: { 'access_token': localStorage.getItem('access_token')}
            })
            .then (respose => {
                // console.log(response)
                this.$bvModal.hide('modal')
                this.$emit('todo')
                
            })
            .catch ( err => {
                console.log(err)
            })
            
        },
        deleteTask() {
            this.$emit('deleteTask')
        }
        

        
    }
}
</script>

<style>
.mainPage {
    width: 100%;
}
</style>