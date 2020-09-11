<template>
    <div class="card  my-2">
        <div class="card-body">
            <p>{{task.title}}</p>
        </div>
        <div class="card-footer">
            <p>{{new Date(task.createdAt)}}</p>
            <p>{{task.User.email}}</p>
            <p>{{task.User.name}}</p>
            <div v-if="task.User.email == email">
                <button class="btn btn-danger" v-on:click="deleteTask">Delete</button>
                <button class="btn btn-info">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'CardTask',
    props : ['task'],
    methods:{
        deleteTask(){
            this.$emit('deleteTask', this.task)
        }
    },
    data () {
        return{
            email : localStorage.getItem('email')
        }
    },
    components : {

    }
}
</script>