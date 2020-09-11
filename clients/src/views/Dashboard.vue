<template>
  <div>
    <Navbar></Navbar>
    <a class="nav-link" href="#" @click.prevent="toggleAdd">Add Category +</a>
    <AddCategory
      v-if="isAdd"
      @fetchTasks= "fetchTasks"
    ></AddCategory>
    <section class="container-fluid d-flex justify-content-around">
      <Category 
        v-for="(categoryName, index) in Object.keys(categories)" 
        :key="index"
        :categoryName="categoryName"    
        :tasks="categories[categoryName]"
        :allCategoryId="allCategoryId"
        :allCategoryName="allCategoryName"
        @fetchTasks= "fetchTasks"
      ></Category>
    </section>
  </div>
</template>

<script>
import axios from '../config/axios'
import Navbar from '../components/Navbar'
import AddCategory from '../components/AddCategory'
import Category from '../components/Category'

export default {
    name: "DashboardPage",
    data(){
      return {
        categories: [],
        allCategories: [],
        isAdd: false,
        allCategoryId: [],
        allCategoryName: []
      }
    },
    components: {
      Navbar,
      Category,
      AddCategory
    },
    methods:{
      fetchTasks(){
        axios({
          url: '/tasks',
          method: 'get',
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({data}) => {
          if (data) {
            this.categories = data.tasks
            this.allCategoryId = data.allCarId
            this.allCategoryName = data.allCarName
          } else {
            console.log(data)
          }
        })
        .catch(err => {
          console.log(err)
        })
      },

      toggleAdd(){
        this.isAdd = !this.isAdd
      },
    },
    created(){
      this.fetchTasks()
    }
}
</script>

<style>

</style>