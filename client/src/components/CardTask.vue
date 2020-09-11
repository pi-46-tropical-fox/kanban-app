<template>
    <div>
        <div class="col-sm-12">
            <div class="items border border-light">
                <div class="card draggable shadow-sm">
                    <div class="card-body p-2">
                        <div class="card-title">
                            <p>
                                {{ task.title }}
                            </p>
                        </div>
                        <span class="text-muted font-weight-light" style="font-size: small;">{{task.User.name}}</span>
                        <div class="float-right">
                            <button class="btn btn-warning btn-sm" @click.prevent="updateTask(task.id)">Update</button>
                            <button class="btn btn-danger btn-sm" @click.prevent="deleteTask(task.id)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'CardHero',
    props: ['task'],
    methods: {
        deleteTask(id) {
            console.log(id);
            axios({
                method: 'DELETE',
                url: `/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(({data}) => {
                console.log(data);
                this.$emit('delete')
            })
        },
        updateTask(id) {
            this.$emit('emitUpdate', id)
        }
    }
}
</script>

<style>

</style>