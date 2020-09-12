<template>
            <div class="list-task-container" >
                
                <!-- Task Detail -->
                <div class="task" >
                    <i class="fas fa-edit" @click.prevent="openModalEdit(taskId)"></i>
                    <div class="detail-task">                                    
                        <h3>{{taskTitle}}</h3>
                        <h4>{{taskDescription}}</h4>
                        <p>By : {{userEmail}}</p>
                    </div>
                    <div class="badges">
                        <i class="fas fa-info-circle" @click.prevent="openModalInfo(taskId)"></i> 
                        <i class="fas fa-trash-alt" @click.prevent="deleteTask(taskId)"></i>
                        <div class="dropdown">
                            <i class="fas fa-arrows-alt"></i>
                            <div class="dropdown-content">
                                <div v-for="category in categories" :key="category.id">
                                    <MoveOption                            
                                    v-if="category.id !== categoryId"
                                    :categoryIdOption="category.id"
                                    :categoryNameOption="category.name"
                                    :currentCategoryId="categoryId"
                                    :currentTaskId="taskId"
                                    @successMoved="successMoved"
                                    @failMoved="failMoved">
                                    </MoveOption>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Edit -->
                <div v-if="showModalEdit">
                    <div class="modal">
                        <div class="modal-content">
                            <span class="close" @click.prevent="closeModalEdit">&times;</span>
                            <form class="modal-form">
                                <h1 style="text-align: center;">Edit Task</h1>
                                <label for="title"><h2>Title :</h2></label>
                                <input type="text" v-model="title">
                                <label for="description"><h2>Task description :</h2></label>
                                <textarea cols="21" rows="5" v-model="description"></textarea>
                                <div class="btn-container">
                                    <button type="submit" class="btn-save" style="width:20%;" @click.prevent="editTask(taskId)">Edit</button>
                                    <button class="btn-cancel" style="width: 20%;" @click.prevent="closeModalEdit">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div> 
                </div>

                <!-- Modal Info -->
                <div class="modal" v-if="showModalInfo">
                    <div class="modal-content">
                        <span class="close" @click.prevent="closeModalInfo">&times;</span>
                        <form class="modal-form modal-detail">
                            <h1 style="text-align: center;">Detail Task</h1>
                            <label for="title"><h2>Title :</h2></label>
                            <input type="text" v-model="title" disabled>
                            <label for="description"><h2>Task description :</h2></label>
                            <textarea cols="21" rows="2" v-model="description" disabled></textarea>
                            <label for="title"><h2>Current progress :</h2></label>
                            <input type="text" v-model="category" disabled>
                            <label for="title"><h2>Assigned by :</h2></label>
                            <input type="text" v-model="user" disabled>
                            <label for="title"><h2>Created at :</h2></label>
                            <input type="text" v-model="created" disabled>
                            <div class="btn-container">
                                <button class="btn-back" style="width: 20%;" @click.prevent="closeModalInfo">Back</button>
                            </div>
                        </form>
                    </div>
                </div> 
            </div>

</template>

<script>
import axios from '../config/axios'
import MoveOption from './MoveOption'
export default {
    name: 'Task',
    props: ['taskId','taskTitle', 'taskDescription', 'userEmail', 'taskCreated','categoryId','categories', 'taskCategoryId'],
    components: {
        MoveOption
    },
    data(){
        return{
            showModalEdit: false,
            showModalInfo: false,
            title: '',
            description: '',
            category: '',
            user: '',
            created: ''
        }
    },
    methods: {
        clearField(){
            this.showModalEdit = false
            this.showModalInfo = false
            this.title = ''
            this.description = ''
            this.category = ''
            this.user = ''
            this.created = ''
        },
        deleteTask(taskId){
          axios({
              url: `/tasks/${taskId}`,
              method: 'DELETE',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.$emit('successDeleted')
              this.clearField()
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('forbiddenAccess', notif)
          })
        },
        successMoved(){
            this.$emit('successMoved')
            this.clearField()
        },
        openModalEdit(taskId){
          axios({
              url: `/tasks/${taskId}`,
              method: 'GET',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              console.log(data);
              this.title = data.title
              this.description = data.description
              this.showModalEdit = true
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('forbiddenAccess', notif)
          })
        },
        openModalInfo(taskId){
          axios({
              url: `/tasks/${taskId}`,
              method: 'GET',
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              console.log(data);
              this.title = data.title
              this.description = data.description
              this.created = data.createdAt
              this.category = data.Category.name
              this.user = data.User.email
              this.showModalInfo = true
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('forbiddenAccess', notif)
          })
        },
        editTask(taskId){
          axios({
              url: `/tasks/${taskId}`,
              method: 'PUT',
              data: {
                  title: this.title,
                  description: this.description
              },
              headers: {
                  access_token: localStorage.getItem('access_token')
              }
          })
          .then(({data}) => {
              this.clearField()
              this.$emit('successEdited')
          })
          .catch((error) => {
              let notif = ''
              for(const msg of error.response.data.errors ){
                  notif += (`<p style="background-color: #ff4756ce;">${msg}</p>`)
              }
              this.$emit('failEdit', notif)
          })
        },
        closeModalEdit(){
            this.clearField()
        },
        closeModalInfo(){
            this.clearField()
        },
        successMoved(){
            this.$emit('successMoved')
        },
        failMoved(notif){
            this.$emit('forbiddenAccess', notif)
        }
    }
}
</script>

<style>

</style>