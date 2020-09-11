<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Kanban App</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="home">Board</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="addTask">Add Task</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="logout">Logout</a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li> -->
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        addTask() {
            this.$emit('emitAddTask')
        },
        home() {
            this.$emit('emitHome')
        },
        logout() {
            this.$emit('emitLogout')
        }
    }   
}
</script>