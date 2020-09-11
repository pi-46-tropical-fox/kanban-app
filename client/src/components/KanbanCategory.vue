<template>
    <div class="col-sm-6 col-md-4 col-xl-3">
        <div class="card bg-light shadow rounded">
            <div class="card-body">
                <h2 class="card-title text-uppercase py-2 font-italic font-weight-light">{{ categoryName }}</h2>
                <div class="items border border-light">
                    <div v-if="categoryName == 'backlog'">
                        <KanbanCard v-for="task in filterBacklog" :key="task.id" :itemData="task" @emitDeleteTask="emitDelete" @editTask="editTask" ></KanbanCard>    
                    </div>
                    <div v-if="categoryName == 'todo'">
                        <KanbanCard v-for="task in filterTodo" :key="task.id" :itemData="task" @emitDeleteTask="emitDelete" @editTask="editTask"  ></KanbanCard>    
                    </div>
                    <div v-if="categoryName == 'doing'">
                        <KanbanCard v-for="task in filterDoing" :key="task.id" :itemData="task" @emitDeleteTask="emitDelete" @editTask="editTask"  ></KanbanCard>    
                    </div>
                    <div v-if="categoryName == 'done'">
                        <KanbanCard v-for="task in filterDone" :key="task.id" :itemData="task" @emitDeleteTask="emitDelete" @editTask="editTask"  ></KanbanCard>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import KanbanCard from './KanbanCard'
export default {
    props: ['categoryName','tasksData'],
    components: {
        KanbanCard
    },
    created() {
        console.log(this.tasksData);
    },
    computed: {
        filterBacklog() {
            return this.tasksData.filter((element) => element.category == 'backlog')
        },
        filterTodo() {
            return this.tasksData.filter((element) => element.category == 'todo')
        },
        filterDoing() {
            return this.tasksData.filter((element) => element.category == 'doing')
        },
        filterDone() {
            return this.tasksData.filter((element) => element.category == 'done')
        }
    },
    methods: {
        emitDelete() {
            this.$emit('fetchTasks')
        },
        editTask(id) {
            this.$emit('editTask',id)
        }
    }
}
</script>