<template>
    <div id="addtask">
        <button type="button" class="btn btn-dark" id="button-add" @click.prevent="addtask">Add Task</button>
    </div>
</template>
<script>
export default {
    methods: {
        addtask(){this.$emit('addTask')}
    },
}
</script>