<template>

   <div class="modal-dialog  shadow" style="pointer-events:all !important;">
       <div class="card-header " style=" color:white;background-color: #797a7e;">
         <button class="btn  float-left" style="background-color: #89beb3; color:white;" 
            @click="backCategory(taskData.id)">Back</button>
         My Task~
       <button class="btn  float-right" style="background-color: #89beb3; color:white;"
            @click="nextCategory(taskData.id)">Next</button>
       </div>
        <div class="card mb-3 text-center" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="https://cdn.idntimes.com/content-images/community/2019/08/wlds43-654640-2400-958e9aa679a799d1f221b159ae3731ce.jpg" class="card-img" alt="gajah">
          </div>
          <div class="col-md-8">
            <div class="card-body text-left" style="background-color: #d8d3cd;">
              <h5 class="card-title">Title: {{taskData.title}}</h5>
              <p class="card-text">Detail: {{taskData.description}}</p>
              <p class="card-text"><small class="text-muted">Due date: {{due_date}}</small></p>
            </div>
            <div class="card-footer" style="background-color: #797a7e;">
              <button class="btn " @click="editTask(taskData.id)" style="background-color: #89beb3; color:white;">
                Edit Task
              </button>
              <button class="btn " @click="deleteTask(taskData.id)" style="background-color: #89beb3; color:white;">
                Delete Task
              </button>
              </div>
            </div>
        </div>
      </div>
      <DeleteForm v-if="activity == 'showDelete'"
      @deleteConfirm ="deleteConfirm"
      ></DeleteForm>
    </div>  
</template>

<script>
import DeleteForm from './DeleteForm'
import axios from '../config/axios'
export default {
      name: 'TaskForm',
    	props: ['taskData'],
      data() {
          return {
              activity: '',
              due_date: null
          }
    },
     components: {
        DeleteForm,
    },
    methods: {
        editTask(id) {
			    this.$emit('editTask', id)
        },
        backCategory(id) {
          axios({
            url: `/kanban/1/tasks/${id}/back`,
            method: "PUT",
            // data: payload,
            headers: {
              access_token: localStorage.access_token
            }
              })
          .then(({data})=> {				
            let status = "show"
            this.$emit('changeActivity', status)
          })

        },
        nextCategory(id) {
          
          axios({
            url: `/kanban/1/tasks/${id}/move`,
            method: "PUT",
            // data: payload,
            headers: {
              access_token: localStorage.access_token
            }
              })
          .then(({data})=> {				
            let status = "show"
            this.$emit('changeActivity', status)
          })
        },
        deleteTask(id) {
          this.activity = 'showDelete'
			    // this.$emit('deleteTask', id)
        },
        deleteConfirm(status) {
          if(status == 'no') {
            this.activity = 'showTask'
          } else {
            let id  = this.taskData.id 
            axios({
              url: `/kanban/1/tasks/${id}`,
              method: 'DELETE',
              headers: {
                access_token: localStorage.getItem('access_token')
              }
            })
            .then(({data})  => {
              let status = "showKanban"
              this.$emit('changeActivity', status)
            })
          }
        },
        formatDate() {
          let temp = this.taskData.due_date.split('T')
          let tempDate = temp[0].split('-')
          this.due_date = `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`
        }
    },
    created(){
      this.formatDate()
    }
}
</script>

<style>

</style>