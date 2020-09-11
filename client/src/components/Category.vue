<template>
    <div>
        <p class="header">{{ category.name }}</p>
        <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @deleteTask="deleteTask"
        @userEmail="userEmail"
        ></TaskCard>
        <form class="field" @submit.prevent="addTask(category.id)">
            <input class="input" type="text" name="title" v-model="title">
            <button class="button" type="submit">Add</button>
        </form>
    </div>
</template>

<script>
import TaskCard from '../components/TaskCard'
export default {
    name: 'Category',
    props: ['category', 'tasksData'],
    components: {
        TaskCard
    },
    computed: {
        filteredTasks() {
            return this.tasksData.filter(el => el.CategoryId == this.category.id)
        }
    },
    data() {
        return {
            title: ''
        }
    },
    methods: {
        addTask(id) {
            let data = {
                title: this.title,
                CategoryId: id
            }
            this.$emit('addTask', data, id)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    }
}
</script>

<style>

</style>