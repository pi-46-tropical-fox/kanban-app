<template>
<div class="list-wraper">
    <div class="list-content">
        <div class="list-header">
            <h1>{{categoryName}}</h1>
        </div>
        <ListTasks
        :categories="categories"
        :listTask="listTask"
        :categoryId="categoryId"
        @successDeleted="successDeleted"
        @forbiddenAccess="forbiddenAccess"
        @successMoved="successMoved"
        @successEdited="successEdited"
        @failEdit="failEdit">
        </ListTasks>
        <div id="add-task" v-if="currentAddFormCategoryId === categoryId">
            <div class="list-task">
                <textarea name="title" id="title" cols="21" rows="2" placeholder="Enter a title of this task . ." v-model="taskTitle"></textarea>                                
            </div>
            <div class="btn-container">
                <button class="btn-save" style="width: 40%;" @click.prevent="createNewTask(categoryId)">Save</button>
                <button class="btn-cancel" style="width: 40%;" @click.prevent="closeAddForm">Cancel</button>
            </div>
        </div>
        <div class="list-footer-task" @click.prevent="showAddForm(categoryId)" v-else>                        
            <h3><i class="fas fa-plus"></i> Add another task</h3>                        
        </div>
    </div>
</div>

</template>

<script>
import axios from '../config/axios'
import ListTasks from './ListTasks'
export default {
    name: 'ListWraper',
    props: ['categoryName', 'categoryId', 'listTask','currentAddFormCategoryId','categories'],
    components: {
        ListTasks
    },
    data(){
        return{
            taskTitle: ''
        }
    },
    methods: {
        showAddForm(categoryId){            
            this.$emit('currentAddFormId', categoryId)
        },
        closeAddForm(){
            this.$emit('clearCurrentAddFormId')
        },
        createNewTask(categoryId){
          axios({
              url: `/tasks/${categoryId}`,
              method: 'POST',
              data: {
                  title: this.taskTitle
              },
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.taskTitle = ''
              this.$emit('successCreated')
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('failCreated', notif)
          })
        },
        successDeleted(){
            this.taskTitle = ''
            this.$emit('successDeleted')
        },
        forbiddenAccess(notif){
            this.$emit('forbiddenAccess', notif)
        },
        successMoved(){
            this.taskTitle = ''
            this.$emit('successMoved')
        },
        successEdited(){
            this.taskTitle = ''
            this.$emit('successEdited')
        },
        failEdit(notif){
            this.$emit('failEdit', notif)
        }
    }

}
</script>

<style>

</style>