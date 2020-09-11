<template>
    <div id="kanban">
        <div class="row justify-content-between">
            <StatusCard
                v-for="(status, i) in statuses"
                :status="status"
                :tasks="tasks[status]"
                :key="i"
                :finalStatus="statuses[statuses.length-1]"
                class="col-2"
            ></StatusCard>
            
            <Add
                id="exampleModal"
                @added="changed"
            ></Add>
        </div>
    </div>
</template>

<script>
import StatusCard from '../components/statuscard'
import Add from '../components/addtask'
export default {
    name: 'kanban',
    props: ['tasks', 'statuses'],
    components: {
        StatusCard,
        Add
    },
    methods: {
        changed () {
            this.$emit('added')
        }
    }
}
</script>

<style>
#kanban {
    margin-top: 30px;
    display: inline-flex;
}
</style>