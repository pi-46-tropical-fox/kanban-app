<template>
  <div>
    <div class="head">
      <p class="text-muted">
        {{ task.title }}
      </p>
    </div>
    <div v-if="task.UserId == id">
      <small class="text-muted">
        Your Task
      </small>
      <a v-if="task.CategoryId !== 1" @click.prevent="backStatus(task.id)"
       href="#" class="badge badge-secondary" style="text-decoration:none">
        Back
      </a>
      <a v-if="task.CategoryId !==4" @click.prevent="updateStatus(task.id)" 
      href="#" class="badge badge-success" style="text-decoration:none">
        Next
      </a>
      <a href="#" @click.prevent="updateForm(task.id)" class="badge badge-warning">
        Update
      </a>
      <a href="#" @click.prevent="deleteData(task.id)" class="badge badge-danger">
        Delete
      </a>
    </div>
    <div class="content">
      <div v-if="update_form == task.id">
        <Description :task="task" :keys="i"
          :show_form="update_form" :task_id="task.id">
        </Description>
      </div>
      <div v-if="update_form == null">
        <p>
          {{ task.description }}
        </p>

      </div>
    </div>
  </div>
</template>

<script>
import Description from './Description'

export default {
  name: 'TaskContent',
  props: ['task', 'update_form', 'taskActive', 'i', 'id'],
  components: {
    Description
  },
  methods: {
    backStatus(id) {
      this.$parent.backStatus(id)
    },
    updateStatus(id) {
      this.$parent.updateStatus(id)
    },
    updateForm(id) {
      this.$parent.updateForm(id)
    },
    deleteData(id) {
      this.$parent.deleteData(id)
    }
  }
}
</script>

<style scoped>
 

</style>