<template>
    <div>
        <p class="header title is-size-5">{{ category.name }}</p>
        <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @updateTask="update"
        @switchCategory="switchCategory"
        @deleteTask="deleteTask"
        ></TaskCard>
        <form class="field columns" @submit.prevent="addTask(category.id)" style="margin-left: 0; width: 100%">
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
            this.title = ''
        },
        update(data) {
            this.$emit('updateTask', data)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        },
        switchCategory(data) {
            this.$emit('switchCategory', data)
        }
    }
}
</script>

<style>

</style>