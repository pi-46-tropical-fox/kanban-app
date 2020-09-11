<template>
    <main>
        <Category @delete="deleteTask" 
        @edit="edittask" 
        @moveTodo="moveTodo" 
        @moveBacklog="moveBacklog" 
        @moveDoing="moveDoing" 
        @moveDone="moveDone" 
        v-for="(category, i) in categories" :key="i" :category="category" :tasks="tasks"></Category>
    </main>
</template>
<script>
import Category from '../components/category'

export default {
    props: ['tasks'],
    components:{
        Category
    },
    data(){
    return {
        categories: ['Backlog','Todo','Doing','Done'],
        }
    },
    methods:{
        deleteTask(id){this.$emit('delete',id)},
        edittask(id){this.$emit('edit',id)},
        moveTodo(id){this.$emit('moveTodo',id)},
        moveBacklog(id){this.$emit('moveBacklog',id)},
        moveDoing(id){this.$emit('moveDoing',id)},
        moveDone(id){this.$emit('moveDone',id)}
    }
}
</script>