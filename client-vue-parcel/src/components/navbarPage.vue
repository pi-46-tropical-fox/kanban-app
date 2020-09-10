<template>
    <div>
        <nav>
            <div id="title">
                <h1><b>Kanban App</b></h1>
            </div>
            <div class="navbar">
                <!-- <a href="#" id="signin" @click.prevent="signin">Sign In</a> -->
                <a href="#" id="signin" @click.prevent="signin" v-if="page === 'login' || page === 'register'">Sign In</a>
                <a href="#" id="signup" @click.prevent="signup" v-if="page === 'login' || page === 'register'">Sign Up</a>
                <a href="#" id="signout" @click.prevent="signout" v-if="page === 'home' || page === 'addtask' || page === 'edittask'">Sign Out</a>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    props: ['page'],
    methods: {
        signout(){this.$emit('signout')},
        signin(){this.$emit('signin')},
        signup(){this.$emit('signup')}
    },
}
</script>