<template>
    <div class="card text-white bg-danger mb-3 col-3" style="max-width: 18rem;">
        <div class="card-header">{{ task.title }}</div>
        <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.title }}</p>
        </div>
        <a class="nav-link" href="#" @click.prevent="toggleEdit">Edit</a>
        <a class="nav-link" href="#" @click.prevent="deleteTask">Delete</a>
        <Dropdown
            :taskId="task.id"
            :allCategoryId="allCategoryId" 
            :allCategoryName="allCategoryName" 
            :currentCategoryName="currentCategoryId"
            @fetchTasks="fetchTasks"
        ></Dropdown>
        <Edit 
            v-if="isEdit"
            :task="task"
            @fetchTasks="fetchTasks"
            @toggleEdit="toggleEdit"
        ></Edit>
    </div>
</template>

<script>
import Edit from './Edit' 
import axios from '../config/axios'
import Dropdown from './Dropdown-card'
export default {
    data(){
        return {
            isEdit: false
        }
    },
    props: ["task", "allCategoryId", "allCategoryName", "currentCategoryId"],
    methods: {
        toggleEdit(){
            this.isEdit = !this.isEdit
        },

        fetchTasks(){
            this.$emit("fetchTasks")
        },

        deleteTask(){
            axios({
                url: `/tasks/${this.task.id}`,
                method: "DELETE",
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            .then(({data}) => {
                this.$emit("deletedId", data.id)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        Edit,
        Dropdown
    }
}
</script>

<style>

</style>