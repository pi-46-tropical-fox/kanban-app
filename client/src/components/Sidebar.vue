<template>
  <div class="sidebar-container">
    <div class="logo-container">
        <img class="logo" src="https://i.imgur.com/wKAvn7p.png" height="200px" width="200px">
    </div>
    <div class="sidebar-content">
        <ul class="sidebar-menu">
          <a href="#">Add Task</a>
        </ul>
    </div>
    <div class="sidebar-footer">
      <ul class="sidebar-menu">
        <a class="logout-btn" type="submit" @click.prevent="logout" href="#">Logout</a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['dataIsLogin'],
  methods: {
    // logout() {
    //   localStorage.removeItem('access_token')
    //   this.$emit('emitIsLogout', false)
    // }
  }
}
</script>

<style>

</style>