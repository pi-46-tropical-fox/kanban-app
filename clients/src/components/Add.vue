<template>
    <div class="card-body d-flex align-items-center" style="height: 100%;">
        <form @submit.prevent="addTask">
            <div class="form-group">
            <input type="text" class="form-control" v-model="title" aria-describedby="emailHelp" placeholder="Title">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    data(){
        return {
            title: ''
        }
    },
    props: ["CategoryId"],
    methods: {
        addTask(){
            axios({
                url: `tasks/${this.CategoryId}`,
                method: "POST",
                headers: {
                    access_token : localStorage.getItem("access_token")
                },
                data: {
                    title: this.title
                }
            })
            .then(({data}) => {
                this.$emit("toggleAdd")
                this.$emit("fetchTasks")
                this.$emit("newData", data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchTaskss(){
            this.$emit("fetchTasks")
        },
    }
}
</script>

<style>

</style>