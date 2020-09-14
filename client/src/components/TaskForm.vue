<template>

   <div class="modal-dialog  shadow" style="pointer-events:all !important;">
       <div class="card-header ">
         <button class="btn btn-primary float-left" 
            @click="backCategory(taskData.id)">Back</button>
         My Task~
       <button class="btn btn-primary float-right" 
            @click="nextCategory(taskData.id)">Next</button>
       </div>
        <div class="card mb-3 text-center" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="https://cdn.idntimes.com/content-images/community/2019/08/wlds43-654640-2400-958e9aa679a799d1f221b159ae3731ce.jpg" class="card-img" alt="gajah">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{taskData.title}}</h5>
              <p class="card-text">{{taskData.description}}</p>
              <p class="card-text"><small class="text-muted">{{taskData.due_date}}</small></p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" @click="editTask(taskData.id)">
                Edit Task
              </button>
              <button class="btn btn-primary" @click="deleteTask(taskData.id)">
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
              // description: '',
              // due_date: '',
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
            let status = "showKanban"
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
            let status = "showKanban"
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
        }
    }
}
</script>

<style>

</style>