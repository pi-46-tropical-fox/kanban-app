<template>
  <div>

  <b-modal :id="`modal-prevent-editTask-${todo.id}`"
      ref="modal"
      title="Edit Task"
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
            v-model="todo.title"
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
            v-model="todo.description"
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
            v-model="todo.due_date.split('T')[0]"
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
            v-model="todo.CategoryId"
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
    name: 'editForm',
    data () {
      return {
        notification: ''

      }
    },
    props: ['todo', 'categories'],

    methods: {
        EditTask() {
            axios({
                url: `/todos/${this.todo.id}`,
                method: "PUT",
                data: this.todo,
                headers: { 'access_token': localStorage.getItem('access_token')}
            })
            .then (respose => {
                // console.log(response)
                this.$bvModal.hide(`modal-prevent-editTask-${this.todo.id}`)
                this.$emit('editTask')
                
            })
            .catch ( ({response}) => {
                  this.notification = response.data.errors.join(',')
                  console.log(this.notification)
              })
            
        },
        handleSubmit() {
            this.$bvModal.hide(`modal-prevent-editTask-${this.todo.id}`)
            this.EditTask()
            this.resetModal()        
            console.log("handleSubmit")
        },
        handleOk(bvModalEvt) {
          // Prevent modal from closing
          this.$bvModal.hide(`modal-prevent-editTask-${this.todo.id}`)
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

        
    },
    created () {
      console.log(this.todo, ' ini created edit task')
    }


}
</script>

<style>

</style>