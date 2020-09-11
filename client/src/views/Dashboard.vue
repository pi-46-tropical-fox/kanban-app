<template>
<div>
    <h1 class= "text-center" v-if="currentPage === 'dashboardPage' ">{{ message }}</h1>
    <p class= "text-center"  v-if="currentPage === 'dashboardPage' ">{{ message2 }}</p>
    {{tasksData}}
</div>
  
</template>

<script>
export default {
    data () {
        return {
            message: 'Kanban Board',
            message2: 'Dashboard View',
            currentPage: 'dashboardPage',
            props: ['tasksData']
        };
    },

}
</script>

<style>

</style>