<template>
<!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="add">
                    <div class="form-group row justify-content-center">
                        <label class="col-4">Title:</label>
                        <input v-model="title" type="text" class="col-4 form-control" placeholder="Task title" required>
                    </div>
                    <div class="row justify-content-center">
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    data: function () {
        return {
            title: ''
        }
    },
    methods: {
        add () {
            axios({
                url: '/tasks',
                method: 'POST',
                headers: {
                    access_token: localStorage.getItem('access_token')
                },
                data: {
                    title: this.title
                }
            }).then(res => {
                this.$emit('added')
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>