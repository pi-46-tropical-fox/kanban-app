<template>
    <div class="card text-dark shadow mb-2 "  @click="getTaskId(task.id)" style="background-color: #f7f2e7;">
  <h5 class="card-header">{{task.title}} <small>(@{{task.username}})</small>
  </h5>
        
  <div class="card-body text-left">
    <p class="card-text">{{task.description}}</p>
    <p></p>
  </div>
  <div class="card-footer">
      <small class="text-muted">Due_date: {{due_date}}</small>
    </div>
</div>

</template>

<script>
export default {
	name: 'CardTasks',
	props: ['task'],
	data() {
        return {
            taskId: null,
            due_date: this.task.due_date
        }
    },
    methods: {
        getTaskId(id) {
            this.$emit('getTaskId', id)
            },
        formatDate() {
          let temp = this.due_date.split('T')
          let tempDate = temp[0].split('-')
          this.due_date = `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`
        }
    },
    created(){
      this.formatDate()
    },

}
</script>

<style>

</style>