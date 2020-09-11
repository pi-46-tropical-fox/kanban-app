<template>
  <section id="navbar">
    <nav class="navbar navbar-dark">
      <img src="../images/Group 6.svg" alt="" />
      <button class="btn btn-danger my-2 my-sm-0" type="submit" @click.prevent="signOut">
        Sign Out
      </button>
    </nav>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    signOut() {
      this.$emit('signOut')
    }
  }
};
</script>

<style></style>
