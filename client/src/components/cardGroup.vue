<template>
    <div>
        <div :class='category.category'>
            <div class= "card-header">
                <h3>{{category.category}}</h3>
            </div>
            <div class="card-body">
                <Card
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    :todo="todo"
                    @deleteTask='deleteTask'
                ></Card>
            </div>
        </div>
    </div>
</template>

<script>

import Card from './card'
export default {
     
    name: 'CardGroup',
    props: ['category','todos'],
    components : {
        Card
    },
    computed : {
        filteredTodos() {
            return this.todos.filter(el => el.CategoryId === this.category.id )
        }
    },
    methods: {
        deleteTask () {
            this.$emit('deleteTask')
        }
    }
}
</script>

<style>

</style>