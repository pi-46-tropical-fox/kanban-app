<template>
   <!-- MAIN PAGE -->
        <section>
            <Navbar @logout="logout"></Navbar>
            <div class="container" id="main-page">
                <div class="row">
                    <TaskCategory 
                    v-for="(category, index) in categories" 
                    :key='index'
                    :category="category"
                    :tasks ='tasks'
                    >
                    </TaskCategory>
                </div>
            </div>
        </section>
</template>

<script>
import Navbar from '../components/Navbar'
import TaskCategory from '../components/TaskCategory'
export default {
name: 'MainPage',
data: function(){
return{
    categories: ['Backlog', 'Todo', 'Doing', 'Completed']
}
},
components:{
    TaskCategory,
    Navbar
},
props: ['tasks'],
methods:{
    logout(){
        this.$emit('logout')
    }
}
}
</script>

<style>

</style>