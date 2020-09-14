<template>
  <div>
    <form @submit.prevent="addTask">
      <p class="text-center">Add Task</p>
      <div class="add-task">
        <div class="form-group">
          <input type="text" v-model="form.title" 
          class="form-control" placeholder="Input title" name="" id="">
        </div>
      </div>

      <div class="add-task">
        <div class="form-group">
          <textarea class="form-control" v-model="form.description"
          placeholder="Input description">
          </textarea>
        </div>
      </div>

      <div class="btn-place">
        <button class="btn-sm btn-success btn">
          Save Task
        </button>&nbsp;
        <button @click.prevent="formToggle('')" 
        class="btn-sm btn-secondary btn">
          Close
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "../config/axios"

export default {
  name: 'CreateTask',
  props: ['host', 'category_id', 'boardList', 'keys'],
  data() {
    return {
      form: {
        title: '',
        description: ''
      },
      organizationId: null
    }
  },
  methods: {
    formToggle(params) {
      this.$parent.formToggle(params)
    },
    mounted() {
      if(localStorage.OrganizationId) {
        this.organizationId = localStorage.OrganizationId
      } else {
        this.organizationId = null
      }
    },
    addTask() {
      const value = {
        title: this.form.title,
        description: this.form.description,
        CategoryId: this.category_id,
        UserId: localStorage.id
      }

      axios({
        headers: {
          access_token: localStorage.access_token
        },
        url: `/tasks/${localStorage.OrganizationId}`,
        method: 'post',
        data: value
      })
      .then(response => {
        this.boardList[this.keys].Tasks.push(response.data)
        this.$parent.formToggle('')
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
   .add-task {
    width: 96%;
    margin: 0 auto;
  }
  .btn-place {
    display: flex;
    justify-content: flex-end;
    width: 96%;
    margin: 0 auto;
  }
  .btn-place button {
    position: relative;
    top : -10px;
  }
</style>