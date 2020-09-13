<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <a class="navbar-brand" href="#">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#" @click.prevent="pageName('home')">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item" >
              <a @click.prevent="toLogin" class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item" >
              <a @click.prevent="toRegister" class="nav-link" href="#">Register</a>
            </li>
            <li class="nav-item">
              <a @click.prevent="logout" class="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
  </div>
</template>

<script>
export default {
    name:'Navbar',
    
    methods: {
        logout() {
            this.$emit('logout')
        },
        toRegister() {
            this.$emit('toRegister')
        },
        toLogin(){
            this.$emit('toLogin')
        }
    }

}
</script>

<style>

</style>