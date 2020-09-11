<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Kanban</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">add task <span class="sr-only">(current)</span></a>
                    </li>
                    <li v-if = "!isLogin" class="nav-item active">
                        <a @click.prevent="toPage('Logout')" class="nav-link js-scroll-trigger" href="#">Sign Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name:'NavBar',
    props: ['isLogin'],
    methods: {
        toPage(value) {
            this.$emit('emitToPage', value)
        }
    }
}
</script>

<style>
</style> 