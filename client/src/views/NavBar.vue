<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: black;">
    <img src="./assets/logo-2.png" class="mh-10" style="width: 50px; height: 50px;">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active" id="navbar-add">
                <a class="nav-link font-weight-bolder ml-3" href="#" @click="toAddTaskPage" style="color: #ffb142">Add <span
                        class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active" id="navbar-logout">
                <a class="nav-link font-weight-bolder" href="#" @click="logoutFunction" style="color: #ffb142">Logout <span
                        class="sr-only">(current)</span></a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
export default {
    name: "NavBar",
    methods: {
        loadNavBar() {
            this.$emit('showNavBar')
        },

        toAddTaskPage() {
            this.$emit('toAddTaskPage')
        },

        logoutFunction() {
            localStorage.removeItem('access_token')
            this.$emit('logoutFunction')
        }
    }
}
</script>

<style>

</style>