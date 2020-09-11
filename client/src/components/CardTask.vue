<template>
    <div class="card  my-2">
        <div class="card-body">
            <p>{{task.title}}</p>
            <input required class="form-control" v-if="update" type="text" v-model="task.title">
            <button v-if="update" class="btn btn-info" v-on:click="moveTask">Save</button>
        </div>
        <div class="card-footer">
            <p>{{new Date(task.createdAt)}}</p>
            <p>{{task.User.email}}</p>
            <p>{{task.User.name}}</p>
            <div v-if="isSelf">
                <button class="btn btn-danger" v-on:click="deleteTask">Delete</button>
                <button class="btn btn-info" v-on:click="updateTask">Update</button>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                        Move to
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" v-for="category in categories" :key="category.id" v-on:click="moveTask(category)">{{ category.name }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'CardTask',
    props : ['task', 'categories'],
    methods:{
        moveTask(category){
            this.$emit('moveTask', { task : this.task, category })
            this.update = false
        },
        updateTask(){
            this.update = true
        },
        deleteTask(){
            this.$emit('deleteTask', this.task)
        }
    },
    data () {
        return{
            update : false
        }
    },
    computed: {
        isSelf:  function() {
            return this.task.User.email == localStorage.getItem('email')
        }
    },
    components : {

    }
}
</script>