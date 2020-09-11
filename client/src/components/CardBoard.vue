<template>
    <div class="col" style="justify-content: space-between">
        <div class="bg-light">
            <div class="card-body">
                <div class="card-title text-uppercase text-truncate p-2 rounded" :class="category.backgroundColor">
                    {{category.name}}
                </div>
                <div>
                    <CardTask 
                        v-for="task in filteredTasks" 
                        :key="task.id"
                        :task="task"
                        @delete="deleteTask"
                        @emitUpdate="updateTask"
                    ></CardTask>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardTask from './CardTask'
export default {
    name: 'CardBoard',
    props: ['category', 'tasksData'],
    components: {
        CardTask
    },
    computed: {
        filteredTasks() {
            return this.tasksData.filter(el => el.category === this.category.name)
        }
    },
    methods: {
        deleteTask() {
            this.$emit('deleteTask')
        },
        updateTask(id) {
            this.$emit('emitUpdate', id)
        }
    }
}
</script>

<style>

</style>