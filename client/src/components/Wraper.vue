<template>
<div class="wraper">
    <div class="content-container">
        <div class="content-header">
            <h1>{{categoryName}}</h1>
        </div>
        <MainContent
        :categories="categories"
        :tasks="tasks"
        :categoryId="categoryId"
        @successDeleted="successDeleted"
        @forbiddenAccess="forbiddenAccess"
        @successMoved="successMoved"
        @successEdited="successEdited"
        @failEdit="failEdit">
        </MainContent>
        <div class="task-edit" v-if="currentAddFormCategoryId === categoryId">
            <div>
                <textarea name="title" id="title" cols="21" rows="2" placeholder="Enter a title of this task . ." v-model="taskTitle"></textarea>                                
            </div>
            <div class="btn-container">
                <button class="btn-save" style="width: 40%;" @click.prevent="createNewTask(categoryId)">Save</button>
                <button class="btn-cancel" style="width: 40%;" @click.prevent="closeAddForm">Cancel</button>
            </div>
        </div>
        <div class="content-footer" v-else>                        
            <h3 @click.prevent="showAddForm(categoryId)"><i class="fas fa-plus"></i> Add another task</h3>                        
        </div>
    </div>
</div>

</template>

<script>
import axios from '../config/axios'
import MainContent from './MainContent'
export default {
    name: 'Wraper',
    props: ['categoryName', 'categoryId', 'tasks','currentAddFormCategoryId','categories'],
    components: {
        MainContent
    },
    data(){
        return{
            taskTitle: ''
        }
    },
    methods: {
        showAddForm(categoryId){            
            this.$emit('currentAddFormId', categoryId)
            this.taskTitle = ''
        },
        closeAddForm(){
            this.$emit('clearCurrentAddFormId')
            this.taskTitle = ''
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