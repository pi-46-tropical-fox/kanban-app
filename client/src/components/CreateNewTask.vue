<template>
  <div class="modal fade" id="createTask" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <i class="fa fa-plus"></i> Create Organization
          </h5>
          <button type="button" class="close" data-dismiss="modal"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createTask">
            <div class="form-group">
              <label for="exampleInputEmail">Title</label>
              <input type="text" placeholder="Input task title"
              v-model="form.title"
              class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Description</label>
              <textarea class="form-control" v-model="form.description"
               placeholder="Input task description"
               name="" id="" cols="30" rows="10"></textarea>
            </div>
            <button type="submit" class="btn full-width-btn btn-primary">
              Create
            </button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../config/axios";

export default {
  props: ['host', 'boardList'],
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      organizationId: null
    }
  },
  mounted() {
    if(localStorage.OrganizationId) {
      this.organizationId = localStorage.OrganizationId
    } else {
      this.organizationId = null
    }
  },
  methods: {
    createTask() {
      const value = {
        title: this.form.title,
        description: this.form.description,
        CategoryId: 1,
        UserId: localStorage.id
      }
      // console.log(value, "DI VUE");
      
      axios({
        headers: {
          access_token: localStorage.access_token
        },
        url: `${this.host}/tasks/${this.organizationId}`,
        method: 'post',
        data: value
      })
      .then(response => {
        this.form.title = ''
        this.form.description = ''
        this.boardList[0].Tasks.push(response.data)
      })
      .catch(err => {
        console.log(err);
      })

    }
  }
}
</script>

<style>

</style>