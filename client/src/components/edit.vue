<template>
  <div>

  <b-modal hide-footer id="modal-2" title="EditTask">
      <form ref="form" @submit.prevent="editTask">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
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

        <b-button type="submit" variant="primary">Submit</b-button>

      </form>   
  </b-modal>

</div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'addForm',
    components : {
      edit
    },
    data() {
        return {
            title: '',
            description: '',
            due_date: '',
            CategoryId: '',
        }
    },
    props: ['categories'],

    methods: {
        editTask() {
            let payload = {
                title: this.title,
                description: this.description,
                due_date: this.due_date,
                CategoryId: this.CategoryId,
                UserId: localStorage.getItem('id')
            }

            this.$emit('editTodo', payload )
            
        },

        
    }


}
</script>

<style>

</style>