<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Kanban</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    </ul>
    <div class="my-2 my-lg-0" v-if="page === 'dashboard'">
      <a href="#" v-on:click="logout">Logout</a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name : 'Navbar',
  props : ['page', 'email', 'name'],
  methods : {
    logout(){
      this.$emit('logout')
    }
  }
}
</script>