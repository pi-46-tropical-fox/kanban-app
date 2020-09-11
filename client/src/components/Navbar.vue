<template>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: teal; justify-content: space-between">
        <div id="logo">
            <img src="https://hacktiv8.com/assets/img/logos/hacktiv8_black.png" alt="Logo hacktiv8">
        </div>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav text-uppercase ml-auto">
                <li v-if = "!isLogin" class="nav-item"><a @click.prevent="page('loginPage')" class="nav-link js-scroll-trigger" href="#">Sign In</a></li>
                <li v-if = "!isLogin" class="nav-item"><a  @click.prevent="page('registerPage')" class="nav-link js-scroll-trigger" href="#">Sign Up</a></li>
                <li v-if = "isLogin" class="nav-item"><a @click.prevent="page('homePage')" class="nav-link js-scroll-trigger" href="#">Dashboard</a></li>
                <li v-if = "isLogin" class="nav-item"><a @click.prevent="page('addTaskPage')" class="nav-link js-scroll-trigger" href="#">New Task</a></li>
                <li v-if = "isLogin" class="nav-item"><a @click.prevent="page('logout')" class="nav-link js-scroll-trigger" href="#">Logout</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Header',
    props: ['isLogin'],
    methods: {
        page(value) {
            this.$emit('toPage', value)
        }
    }
}
</script>

<style>

</style>