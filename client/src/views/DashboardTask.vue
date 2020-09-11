<template>
<div>
    <div class="container-kanban">
        <article class="message is-dark category">
            <Category></Category>
            <Category></Category>
            <Category></Category>
            <Category></Category>
             <!-- v-for="task in tasksData"
             :taskCategory="task" 
             :key='task.id'>  -->
            
            <!-- <TaskCard 
            v-for="task in tasksData" 
            :task="task" 
            :key='task.id' >
            </TaskCard> -->
          </article>
    </div> 
</div>
</template>

<script>
import Category from '../components/Category'
import TaskCard from '../components/TaskCard'
export default {
  name: 'Dashboard Task',
  props: ['tasksData'],
  components : {
    Category,
    TaskCard
  }
}
</script>

<style>

</style>