<template>
    <div>
        <nav>
            <div class="logo">
                <h2>KANBAN</h2>
            </div>
            <div class="logInfo">                        
                <div v-text="logedUser"> ></div>
                <div>
                    <a href="" class= "logout" v-on:click.prevent="logout">Logout</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : "navbar",
    data() {
        return {
        logedUser : localStorage.getItem('name')
        }
    },
    methods : {
        logout () {
            return localStorage.clear()
            this.$emit('logout')
        }
    }
    

}
</script>

<style>

</style>