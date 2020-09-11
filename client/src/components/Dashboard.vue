<template>
  <div>
    <div class="flex-row textSize">
      <div class="flex mb-0 mx-6 justify-center">
        <div v-for="(type, i) in types" :key="i">
          <div class="container ">
            <div class="m-2" style="width: 100%;">
              <kanbanCard class="m-2" :baseUrl="baseUrl" @fetchTasks="fetchTasks" :taskLists="typeComputed[i]" :type="type"></kanbanCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kanbanCard from './kanbanCard.vue'
export default {
  name: 'Dashboard',
  components: {
      kanbanCard
  },
  data () {
    return {
      types: ['Backlog', 'Todo', 'Doing', 'Completed']
    }
  },
  props: ['baseUrl', 'tasks'],
  methods: {
  },
  computed: {
    typeComputed () {
      return [this.backlog, this.todo, this.doing, this.completed]
    },
    backlog () {
      return this.tasks.filter(task => {
        return task.category.toLowerCase() === 'backlog'
      })
    },
    todo () {
      return this.tasks.filter(task => {
        return task.category.toLowerCase() === 'todo'
      })
    },
    doing () {
      return this.tasks.filter(task => {
        return task.category.toLowerCase() === 'doing'
      })
    },
    completed () {
      return this.tasks.filter(task => {
        return task.category.toLowerCase() === 'completed'
      })
    }
  },
  methods: {
    fetchTasks () {
      this.$emit('fetchTasks')
    }
  }
}
</script>

<style>
</style>