<template>
  <section id="register-page">
    <div class="register-page-left">
        <img src="./assets/logo.png" alt="register page">
    </div>
    <div class="register-page-right">
        <h1>Sign Up</h1>
        <form>
            <label>Full Name</label>
            <input type="name"  v-model="fullName" id="register-fullname" required>
            <label>Role</label>
            <input type="role"  v-model="role" id="register-role" required>
            <label>Email</label>
            <input type="email"  v-model="email" id="register-email" required>
            <label>Password</label>
            <input type="password"  v-model="password" id="register-password" required>
            <button class="register-btn" type="submit">Register</button><br>
            <p>Already have an id? <a href="#">Sign in here</a></p>
        </form>
    </div>
</section>
</template>

<script>
export default {
    name: "RegisterPage",
    data() {
        return {
            fullName: "",
            role: "",
            email: "",
            password: ""
        }
    },
    methods: {
        registerChild() {
            let payload = {
            fullName: this.fullName,
            role: this.role,
            email: this.email,
            password: this.password
            }
            this.$emit("registerSubmit", payload)
        }
    }

}
</script>

<style>

</style>