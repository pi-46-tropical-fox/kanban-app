<template>
  <div>
      <div class="col-3 p-2" id="cardStatus">
          <div class="bg-primary text-white rounded text-center">
              {{ status.status}}
          </div>
          <div class="shadow p-2">
              <div class="row">
                  <CardTask 
              v-for="task in filteredTasks"
              :key="task.id"
              :task="task"
              ></CardTask>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CardTask from '../components/CardTask'
export default {
    name: "CardStatus",
    components: {
        CardTask
    },
    computed: {
        filteredTasks () {
            return this.tasksData.filter (el => el.CategoryId === this.status.id)
        }
    },
    props: ['status','tasksData']

}
</script>

<style scope>
/* #cardStatus {
    overflow-y: scroll;
    display:inline-block;
} */


</style>