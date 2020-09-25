<template>
  <div class="navbar">
 
    <div class="navbar-logo">
    <img src="../img/logo2.png" alt="">

    </div>
    <div class="navbar-item">
      <h1>KANBAN</h1>
    </div>
    <div class="navbar-button">
      <button @click.prevent="logout" class="button">LOGOUT</button>

    </div>
  </div>
</template>
<script>
export default {
    methods:{
      logout(){
        Swal.fire(
          'Are You Sure?',
          'no more task need action',
          'question'
        ).then(result=>{
          this.$emit('logout')
            localStorage.clear()
        })
          
          
      }
    }
  
  }
</script>
<style scoped>

</style>