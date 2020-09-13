<template>
    <div class="col-3">
        <div class="card rounded shadow">
            <div class="card-header" :class="category.color">
                <button type="button" class="close text-black ml-auto" aria-label="Close">
                    <span @click="addTask" aria-hidden="true">+</span>
                </button>
                <h3>{{category.title}}</h3>
            </div>
            <!-- {{filterTasks}} -->
            <TaskCard
            v-for="task in filterTasks"
            :key="task.id"
            :task='task'
            @deleteTask='deleteTask'
            ></TaskCard>
            <!-- card task-->
        </div>
    </div>
</template>

<script>
import TaskCard from './taskCard'

export default {
    name:'Category',
    methods: {
        addTask() {
            this.$emit('toAddTask',this.category.category)
        },
        deleteTask(paylod) {
            
            this.$emit('deleteTask',paylod)
        }
    },
    props: ['category','tasks'],
    components: {
        TaskCard
    },
    computed: {
        filterTasks() {
            return this.tasks.filter(task => task.category === this.category.category)
        }
    }
}
</script>

<style>

</style>