<template>
    <section>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
                <img src="../../assets/logo-kanban.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
                <h1 class="brand">KANBAN</h1>
            </a>
            <h2 class="logout" @click="logout" href="#">
               <i class="fas fa-sign-out-alt"></i>
            </h2>
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