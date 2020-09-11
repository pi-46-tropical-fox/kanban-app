<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <h1 class="navbar-item">KANBAN</h1>
          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" v-on:click="dashboardOrganization">
              Dashboard
            </a>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <!-- <a class="button is-primary has-text-justify">
                    <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                    Log in
                </a> -->
                <a class="button is-danger" v-on:click="logout">
                    Log out
                </a>
              </div>
            </div>
          </div>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$emit('logoutButton')
        },
        dashboardOrganization() {
            this.$emit('dashboardOrganizationButton')
        }
    }
}
</script>

<style>

</style>