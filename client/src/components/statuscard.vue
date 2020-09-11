<template>
    <div>
        <div class="card" style="width: 18rem;">
            <div class="card-header">
                {{status}}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <TaskCard
                        v-for="(task, i) in tasks"
                        :key="i"
                        :task="task"
                        :finalStatus="finalStatus"
                    ></TaskCard>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import TaskCard from './taskcard'
export default {
    name: 'StatusCard',
    props: ['status', 'tasks', 'finalStatus'],
    components: {
        TaskCard
    }
}
</script>

<style>

</style>