<template>
  <div>

  <b-modal id="modal-prevent-closing"
      ref="modal"
      title="Add Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
        <div v-if="notification">{{notification}}</div>        
          <b-form-input
            id="title-input"
            v-model="title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="description-input"
            v-model="description"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Date"
          label-for="date-input"
          invalid-feedback="Date is required"
        >
          <b-form-input
            id="due_date-input"
            type="date"
            v-model="due_date"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Category"
          label-for="category-input"
          invalid-feedback="Category is required"
        >
          <b-form-select
            id="title-input"
            v-model="CategoryId"
            :options="categories"
            required
            value-field="id"
            text-field="category"
          ></b-form-select>
        </b-form-group>

      </form>   
  </b-modal>

</div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'addForm',
    components : {
      // edit
    },
    data() {
        return {
            title: '',
            description: '',
            due_date: '',
            CategoryId: '',
            notification: ''
        }
    },
    props: ['categories'],

    methods: {
        AddTask() {
            let payload = {
                title: this.title,
                description: this.description,
                due_date: this.due_date,
                CategoryId: this.CategoryId
            }
            return new Promise ((resolve, reject) => {
              axios({
                  url: '/todos',
                  method: "POST",
                  data: payload,
                  headers: { 'access_token': localStorage.getItem('access_token')}
              })
              .then (response => {
                  // console.log(response)
                  this.$bvModal.hide('modal')
                  this.$emit('addTask')
                  resolve(response)  
              })
              .catch ( ({response}) => {
                  this.notification = response.data.errors.join(',')
                  console.log(this.notification)
              })
            })
            
        },
        handleSubmit() {
            this.$bvModal.hide('modal-prevent-closing')
            this.AddTask()
            this.resetModal()
            this.$emit('AddTask')         
            console.log("handleSubmit")
        },
        handleOk(bvModalEvt) {
          // Prevent modal from closing
          this.$bvModal.hide('modal-prevent-closing')
          bvModalEvt.preventDefault()
          // Trigger submit handler
          this.handleSubmit()
          console.log('handleOk')
        },
        resetModal() {
          this.title= ''
          this.description= ''
          this.due_date= ''
          this.CategoryId= ''
        },

        
    }


}
</script>

<style>

</style>