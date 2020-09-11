<template>
<div>
    <div class="card shadow-sm rounded m-1">
        <div class="card-body p-2">
            <!-- <div class="card-title">
                <a href="" class="lead font-weight-light"></a>
            </div> -->
            <h5 class="card-text mx-2 my-3 font-weight-normal">{{ itemData.title }}</h5>
            <a href="#" class="card-link m-2" @click="editTask(itemData.id)">Edit</a>
            <a href="#" class="card-link m-2" @click="deleteTask(itemData.id)">Delete</a>
        </div>
    </div>
</div>
    
    
                                    
</template>
<script>
import axios from 'axios'
export default {
    props: ['itemData'],
    methods: {
        deleteTask(id) {
            axios({
                method: "DELETE",
                url: `http://localhost:3000/tasks/${id}`
            })
            .then(({data}) => {
                console.log('delete success');
                this.$emit('emitDeleteTask')
                // console.log(data);
                // this.tasks = data
            })
        },
        editTask(id) {
            //  axios({
            //     method: "GET",
            //     url: `http://localhost:3000/tasks/${id}`
            // })
            // .then(({data}) => {
            //     console.log('get by id');
            //     // this.$emit('emitDeleteTask')
            //     // console.log(data);
            //     // this.tasks = data
            // })
            this.$emit('editTask',id)
        }
    }
}
</script>