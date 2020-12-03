<template>
   <!-- MAIN PAGE -->
        <div>
            <Navbar @logout="logout"></Navbar>
            <lottie-player class="mx-auto" src="https://assets10.lottiefiles.com/packages/lf20_pQChF8.json"  background="transparent"  speed="1"  style="width: 250px; height: 250px;"  loop  autoplay></lottie-player>
             <div class="container-fluid">
                <div class="category-container">
                    <TaskCategory 
                    v-for="(category, index) in categories" 
                    :key='index'
                    :class="category"
                    :category="category"
                    :tasks ='tasks'
                    >
                    </TaskCategory>
                </div>
            </div>
        </div>
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