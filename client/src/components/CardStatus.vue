<template>
  <div>
      <div class="col-3" id="cardStatus">
          <div class="shadow bg-info  text-white rounded">
              {{ status.status}}
          </div>
          <div class="shadow p-2">
              <!-- {{ status }} -->
              <div class="row">
                  <CardTask 
              v-for="task in tasksData"
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
    props: ['status','tasksData']

}
</script>

<style scope>
#cardStatus {
    overflow-y: scroll;
}


</style>