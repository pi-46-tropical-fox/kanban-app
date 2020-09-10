<template>
    <div class="col-sm-6 col-md-4 col-xl-3"> <br>
        <div class="card bg-light">
            <div class="card-body">
                <h6 class="card-title text-uppercase text-truncate py-2">{{ctg}}</h6>
                <Task v-for="(task,i) in filteredTask" :key="i" :task="task" @emitUpdate="updateTask" @refresh="refresh"></Task>          
            </div>
        </div>
  </div>
</template>

<script>
import Task from './task'

export default {
    name: "Category",
    props: [ 'ctg', 'allTask' ],
    components: {
        Task
    },
    methods: {
        refresh() {
            this.$emit('refresh')
        },
        updateTask(id) {
            this.$emit('emitUpdateTask', id)
        }
    },
    computed: {
        filteredTask() {
            return this.allTask.filter(el => el.category == this.ctg)
        }
    }

}
</script>

<style>

</style>