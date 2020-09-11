<template>
    <div>
      <div class="container-form">
            <form class="box-form"  @submit.prevent="login">
                <div class="tabs">
                    <ul>
                      <li @click.prevent="currentPage='loginPage'"><a>Login</a></li>
                      <li class="is-active"><a>Register</a></li>
                    </ul>
                  </div>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email"  v-model="email">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" v-model="password">
                    </div>
                </div>
                <button class="button is-info" type="submit">Regsiter</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            let payload = {
                email : this.email,
                password : this.password
            }
            this.$emit('registerSubmit', payload)
        }
    }
}
</script>

<style>

</style>