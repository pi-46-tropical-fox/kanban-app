<template>
    <div class="card-body d-flex align-items-center" style="height: 100%;">
        <form @submit.prevent="edit">
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
            title:''
        }
    },
    props: ["task"],
    methods: {
        edit(){
            axios({
                url: `/tasks/${this.task.id}`,
                method: "PUT",
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    title: this.title
                }
            })
            .then(({data}) => {
                this.$emit("fetchTasks")
                this.$emit("toggleEdit")
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.title = this.task.title
    }
}
</script>

<style>

</style>