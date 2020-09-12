<template>
  <div class="sidebar-container">
    <div class="logo-container">
        <img class="logo" src="https://i.imgur.com/wKAvn7p.png" height="200px" width="200px">
    </div>
    <div class="sidebar-content">
        <ul class="sidebar-menu">
          <a class="home" href="#"><i class="material-icons">home</i> Home</a>
        </ul>
    </div>
    <div class="sidebar-footer">
      <ul class="sidebar-menu">
        <a class="logout-btn" type="submit" @click.prevent="logout" href="#"><i class="material-icons"> person</i>Logout</a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    logout() {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style scoped>
.home {
  padding-left: 32%;
}
</style>