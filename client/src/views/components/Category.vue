<template>
  <div class="col-3">
    <h5>{{category}}</h5>
    <Card v-for="(taskData) in filteredTask" :key="taskData.id" :taskData=taskData></Card>
    </div>
</template>

<script>
import Card from './Card'
export default {
    name: 'Category',
    props: ['category', 'tasksData'],
    components: {
        Card
    },
    computed: {
    filteredTask() {
      return this.tasksData.filter(el => el.category=== this.category)
    }
    }
}

</script>

<style>

</style>