<template>
      <div class="header">
        <nav>
            <div>
                <i class="fas fa-home"></i>
            </div>
            <div id="logo">
                <a href="">My Kanban</a>
                <i class="fas fa-thumbtack"></i>
            </div>
            <div>
                <span id="nav-logout">
                    <a @click.prevent="logout"><i class="fas fa-user"></i> Logout</a>
                </span>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout(){
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>