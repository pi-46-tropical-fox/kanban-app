<template>
    <div class="col-sm-6 col-md-4 col-xl-3"> <br>
        <div class="card bg-light">
            <div class="card-body">
                <h6 class="card-title text-uppercase text-truncate py-2">{{ctg}}</h6>
                <draggable :list="filteredTask" group="task" :move="onMove" :category="ctg" @end="updateCategory">
                    <Task v-for="task in filteredTask" :key="task.id" :task="task" @emitUpdate="updateTask" @refresh="refresh" :id="task.id"></Task>  
                </draggable>        
            </div>
        </div>
  </div>
</template>

<script>
import Task from './task'
import draggable from 'vuedraggable'
import axios from '../config/api'

export default {
    name: "Category",
    props: [ 'ctg', 'allTask' ],
    data() {
        return {
            currentId: null,
            currentCategory: null,
            currenetTask: null,
            currentDescription: null
        }
    },
    components: {
        Task,
        draggable
    },
    methods: {
        refresh() {
            this.$emit('refresh')
        },
        updateTask(id) {
            this.$emit('emitUpdateTask', id)
        },
        updateCategory() {
            axios({
                method: 'PUT',
                url: `/tasks/${this.currentId}`,
                data: {
                    category: this.currentCategory,
                    task: this.task,
                    description: this.description
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(({data}) => {
                    this.$emit('fetchData')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        },
        onMove(evt) {
            // console.log(evt.draggedContext.element.id, '<<< onMove')
            // console.log(evt.relatedContext.component.$attrs.category, '<<<<<< Category nih')
            // console.log(evt)
            this.currentId = evt.draggedContext.element.id
            this.currentTask = evt.draggedContext.element.task
            this.currentDescription = evt.draggedContext.element.description
            this.currentCategory = evt.relatedContext.component.$attrs.category
        }
    },
    computed: {
        filteredTask() {
            return this.allTask.filter(el => el.category == this.ctg)
        }
    }

}
</script>

<style>

</style>