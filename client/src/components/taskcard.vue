<template>
    <div>
        <div class="card" style="width: auto;">
            <div class="card-body">
                <h5 class="card-title">{{task.title}}</h5>
                <p class="card-text">assigned by: {{task.User.username}}</p>
                <div class="row d-flex justify-content-around">
                    <a href="#" class="btn btn-primary col-2" v-show="task.Status.name != 'backlog'" @click.prevent="movePrev(task.id)"><img src="../images/left-arrow.png" width="15px"></a>
                    <a href="#" class="col-2" v-if="task.Status.name === 'backlog'"></a>
                    <a href="#" class="btn btn-warning col-2"><img src="../images/edit.png" width="15px"></a>
                    <a href="#" class="btn btn-danger col-2" @click.prevent="destroy(task.id)"><img src="../images/trash.png" width="15px"></a>
                    <a href="#" class="btn btn-primary col-2" v-if="task.Status.name != finalStatus" @click.prevent="moveNext(task.id)"><img src="../images/right-arrow.png" width="15px"></a>
                    <a href="#" class="col-2" v-if="task.Status.name === finalStatus"></a>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'TaskCard',
    props: ['task', 'finalStatus'],
    methods: {
        moveNext (id) {
            axios({
                url: `/tasks/${id}/next`,
                method: 'PUT',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        movePrev (id) {
            axios({
                url: `/tasks/${id}/prev`,
                method: 'PUT',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        destroy (id) {
            axios({
                url: `/tasks/${id}`,
                method: 'DELETE',
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            }).then(res => {

            }).catch(err => {
                
            })
        }
    }
}
</script>

<style>

</style>