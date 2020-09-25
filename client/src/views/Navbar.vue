<template>
<div  style="color:white">
    <nav class="navbar navbar-light" style="background-color: #797a7e;">
  <a style="font-weight:bold;" @click.prevent="backActivity"> Go Productive! </a>
  <h5>Hi - {{username}}!</h5>
      <button @click="logout" class="btn " type="button" style="float: right !important; background-color: #89beb3; color:white;">Logout</button>
</nav>
</div>
</template>

<script>
export default {
    name: "navbar",
    data () {
      return {
        username: null
      }
    },
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
      },
      setName() {
        this.username = localStorage.username
      }
    },
     created() {
      this.setName() 
    }
}
</script>

<style>

</style>