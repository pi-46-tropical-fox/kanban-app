<template>
  <div>
    <div id="login">
      <form action id="loginForm" @submit.prevent="login">
        <div class="form-group">
          <input type="text" v-model="username" placeholder="Username" />
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" />
        </div>
        <div class="form-group text-center">
          <input type="submit" class="btn info" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {
    login(){
      let payload = {
        username: this.username,
        password: this.password
      }

      this.username = ''
      this.password = ''

      this.$emit('login', payload)
    }
  }
};
</script>

<style>
</style>