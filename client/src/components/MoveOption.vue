<template>
    <a href="#"
    v-if="categoryIdOption !== currentCategoryId"
    @click.prevent="moveCategory(currentTaskId, categoryIdOption)">
    Move to {{categoryNameOption}}
    </a>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'MoveOption',
    props: ['categoryIdOption', 'categoryNameOption', 'currentCategoryId', 'currentTaskId'],
    methods: {
        moveCategory(taskId, categoryId){
          axios({
              url: `/tasks/${taskId}/${categoryId}`,
              method: 'PUT',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.$emit('successMoved')
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('failMoved', notif)
          })
        }
    }
}
</script>

<style>

</style>