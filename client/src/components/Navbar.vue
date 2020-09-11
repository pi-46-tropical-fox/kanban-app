<template>
    <section>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../../assets/logo-kanban.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                <h1 class="brand">KANBAN</h1>
            </a>
            <a @click="logout" href="#">
                <h2>Logout</h2>
            </a>
        </nav>
    </section>
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