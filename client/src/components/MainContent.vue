<template>
    <div class="main-content">
        <div  v-for="task in tasks" :key="task.id">
            <Task 
            v-if="categoryId === task.CategoryId"
            :taskId="task.id"
            :taskTitle="task.title"
            :taskDescription="task.description"
            :userEmail="task.User.email"
            :taskCreated="task.createdAt"
            :taskCategoryId="task.CategoryId"
            :categoryId="categoryId"
            :categories="categories"
            @successDeleted="successDeleted"
            @forbiddenAccess="forbiddenAccess"
            @failEdit="failEdit"
            @successMoved="successMoved"
            @successEdited="successEdited">
            </Task>
        </div>
    </div>
</template>

<script>
import Task from './Task'
export default {
    name: 'MainContent',
    props: ['tasks', 'categoryId', 'categories'],
    components: {
        Task
    },
    methods: {
        successDeleted(){
            this.$emit('successDeleted')
        },
        forbiddenAccess(notif){
            this.$emit('forbiddenAccess', notif)
        },
        successMoved(){
            this.$emit('successMoved')
        },
        successEdited(){
            this.$emit('successEdited')
        },
        failEdit(notif){
            this.$emit('failEdit', notif)
        }
    }

}
</script>

<style>

</style>