<template>
    <form class="" @submit.prevent="login">
                    <h1>Login</h1>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Email" v-model="loginForm.email">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" v-model="loginForm.password">
                    </div>
                    <input class="btn btn-primary" type="submit">
                </form>

                
</template>

<script>
export default {
    name : 'LoginForm'
}
</script>