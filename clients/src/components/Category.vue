<template>
  <div>
      <div class="category bg-dark">
        <div class="card-header title-category">
            <h4>{{ categoryName.toUpperCase() }}</h4>
            <a class="nav-link" href="#" @click.prevent="toggleAdd">Add Task</a>
            <Add
                v-if="isAdd"
                :CategoryId="tasks.id"
                @newData="newData"
                @fetchTasks="fetchTasks"
                @toggleAdd="toggleAdd"
            ></Add>
        </div>
        <div class="card-body category-body">
            <Draggable :list="tasks.tasks" group="task" :move="onMove" :category="categoryName" @end="updateCategory">
                <Card
                    v-for="task in tasks.tasks"
                    :allCategoryName="allCategoryName"
                    :allCategoryId="allCategoryId"
                    :currentCategoryId="tasks.id"
                    :key="task.id"
                    :task="task"
                    @deletedId="deletedId"
                    @fetchTasks="fetchTasks"
                ></Card>
            </Draggable>
        </div>
      </div>
  </div>
</template>

<script>
import Card from './Card'
import Add from './Add'
import Draggable from 'vuedraggable'
import axios from '../config/axios'
export default {
    data(){
        return {
            isAdd: false,
            newTask: this.tasks.tasks,
            currentId: null,
            currentCategory: null
        }
    },
    props: ["categoryName", "tasks", "allCategoryId", "allCategoryName"],
    components: {
        Card,
        Add,
        Draggable
    },
    methods: {
        toggleAdd(){
            this.isAdd = !this.isAdd
        },

        fetchTasks(){
            this.$emit("fetchTasks")
        },

        onMove(event){
            this.currentId = event.draggedContext.element.id
            this.currentCategory = event.relatedContext.component.$attrs.category
        },

        newData(data) {
            this.newTask.push(data)
        },

        deletedId(id) {
            const newData = this.newTask.filter(task => task.id !== id)
            this.newTask = newData
        },
        
        updateCategory(categoryId){
            axios({
                url: `/movecategory/${this.taskId}`,
                method: 'patch',
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    newCategoryId: categoryId,
                    currentCategoryId: this.currentCategoryId
                }
            })
            .then(() => {
                this.$emit("fetchTasks")
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.fetchTasks()
    }
}
</script>

<style>

</style>