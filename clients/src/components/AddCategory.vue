<template>
    <div class="card-body d-flex align-items-center" style="height: 100%;">
        <form @submit.prevent="addCategory">
            <div class="form-group">
            <input type="text" class="form-control" v-model="name" aria-describedby="emailHelp" placeholder="Name">
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
            name: ''
        }
    },
    methods: {
        addCategory(){
            axios({
                url: `/categories`,
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem("access_token")
                },
                data: {
                    name: this.name
                }
            })
            .then(({data}) => {
                this.$emit("fetchTasks")
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchTaskss(){
            this.$emit("fetchTasks")
        },
    },
}
</script>

<style>

</style>