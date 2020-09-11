<template>
  <div class="col-3">
    <h5>{{category}}</h5>
    <Card 
    v-for="(taskData) in filteredTask" 
    :key="taskData.id" 
    :taskData=taskData
    @editTask="toEditTaskPage(taskData)"></Card>
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
    methods: {
        toEditTaskPage(taskData) {
        this.$emit('toEditTaskPage', taskData)
    }
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