<template>
    <div>
        <div class="row mt-5">
            <CardBoard v-for="(category, i) in categoryData" 
                :category="category"
                :tasksData="tasksData"
                :key="i"
                @deleteTask="deleteTask"
                @emitUpdate="updateTask"
            ></CardBoard>
        </div>
    </div>

</template>

<script>
import CardBoard from '../components/CardBoard'
export default {
    name: 'Dashboard',
    props: ['tasksData', 'categoryData'],
    components: {
        CardBoard
    },
    methods: {
        deleteTask() {
            this.$emit('delete')
        },
        updateTask(id) {
            this.$emit('emitUpdateTask', id)
        }
    }
}
</script>

<style>

</style>