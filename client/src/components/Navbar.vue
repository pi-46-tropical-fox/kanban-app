<template>
    <div>
        <nav class="navbar navbar-light bg-transparent">
            <a class="navbar-brand" href="#">
                <img src="../../assets/logo-kanban.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                <h1 class="brand">KANBAN</h1>
            </a>
            <h1 class="logout" @click="logout" href="#">
               LOGOUT <i class="fas fa-sign-out-alt"></i>
            </h1>
        </nav>
    </div>
</template>

<script>
export default {
name: 'Navbar',
methods:{
    logout(){
        this.$emit('logout')
    }
}
}
</script>

<style>

</style>