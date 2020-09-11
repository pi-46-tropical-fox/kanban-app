<template>
  <div>
    <!-- Kanban Template -->
    <div id="kanbanTemplate" class="container-fluid pt-3">
        <h3 class="masthead-subheading font-weight-light text-white text-center">Kanban Board</h3>
        <div class="small  text-light text-center">Drag and drop between swim lanes</div>
        <div class="row flex-row flex-sm-wrap py-3">
            <Category  v-for="(ctg, i) in categories" :key="i" :ctg="ctg" :allTask="allTask" @refresh="refresh" @emitUpdateTask="updateTask" @fetchData="fetchData"></Category>
        </div>
    </div>

  </div>
</template>

<script>
import Category from '../components/category'
import axios from '../config/api'

export default {
    name: 'DashboardPage',
    data() {
      return {
        allTask: [],
        categories: ['Backlog', 'Todo', 'Doing', 'Done']
      }
    },
    components: {
        Category
    },
    methods: {
      refresh() {
        this.fetchData()
      },
      fetchData() {
        axios({
          method: 'GET',
          url: '/tasks',
          headers: {
            access_token: localStorage.access_token
          }
        })
          .then(({data}) => {
            console.log(data)
            this.allTask = data

            let counter = 0
            data.forEach(elData => {
              this.categories.forEach(elCat => {
                if(elData.category === elCat) {
                  counter += 1
                }
              });
              if(counter === 0) {
                this.categories.push(elData.category)
              }
              counter = 0
            });

          })
          .catch(({err}) => {
            console.log(err)
          })
      },
      updateTask(id) {
        this.$emit('emitUpdateTask', id)
      }
    },
    created() {
      this.fetchData()
    }

}
</script>

<style>

</style>