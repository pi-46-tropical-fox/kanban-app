<template>
<div>
    <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Go Productive! </a>
      <button @click="logout" class="btn btn-outline-success my-2 my-sm-0" type="button" style="float: right !important">Logout</button>
</nav>
</div>
  <!-- <nav class="navbar navbar-light bg-secondary">
    <a class="navbar-brand text-white" href="#">
      MaKanban
    </a>
    <span class="navbar-text text-white">
        Navbar text with an inline element
      </span>
  </nav> -->
</template>

<script>
export default {
    name: "navbar",
    methods: {
      logout(){
        // var auth2 = gapi.auth2.getAuthInstance();
        // auth2.signOut().then(function () {
        //   console.log('User signed out.');
        // })
        localStorage.clear()
        this.$emit('changePage', 'loginPage')
      },
      home(){
        this.$emit('changeActivity', 'projects')
      }
    }
}
</script>

<style>

</style>