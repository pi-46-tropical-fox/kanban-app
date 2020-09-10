<template>
  <div>
    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
        <div class="container">
            <a  @click.prevent="toPage('Welcome')" class="navbar-brand js-scroll-trigger" href="#page-top">Kanban App</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars ml-1"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav text-uppercase ml-auto">
                    <li v-if = "!isLogin" class="nav-item"><a @click.prevent="toPage('Login')" class="nav-link js-scroll-trigger" href="#">Sign In</a></li>
                    <li v-if = "!isLogin" class="nav-item"><a  @click.prevent="toPage('Register')" class="nav-link js-scroll-trigger" href="#">Sign Up</a></li>
                    <li v-if = "isLogin" class="nav-item"><a @click.prevent="toPage('Dashboard')" class="nav-link js-scroll-trigger" href="#">Dashboard</a></li>
                    <li v-if = "isLogin" class="nav-item"><a @click.prevent="toPage('AddTask')" class="nav-link js-scroll-trigger" href="#">Add Task</a></li>
                    <li v-if = "isLogin" class="nav-item"><a @click.prevent="toPage('Logout')" class="nav-link js-scroll-trigger" href="#">Sign Out</a></li>
                </ul>
            </div>
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