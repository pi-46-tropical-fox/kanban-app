<template>
  <div id="cardLogin">
      <div class="card col-4">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                <a class="nav-link active" v-on:click.prevent="openLogin" href="#">Login</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" v-on:click.prevent="openRegister" href="#">Register</a>
                </li>
                </ul>
            </div>
            <div class="card-body">
            <h5 class="card-title">Login</h5>
            <form v-on:submit.prevent="login"> 
            <div class="form-group card-text">
                <label for="exampleInputEmail1">Email address</label><br>
                <input type="email" class="form-control" v-model="email" id="emailLogin" aria-describedby="emailHelp"><br>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small><br>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label><br>
                <input type="password" class="form-control" v-model="password" id="passwordLogin"><br>
            </div>
            <button type="submit" class="btn btn-primary">Log In</button>
        </form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login () {
            let payload = {
                email: this.email,
                password: this.password
            }

            this.$emit('loginSubmit', payload)
        },

        openLogin () {
            this.$emit("openForm", "loginPage")
        },

         openRegister () {
            this.$emit("openForm", "registerPage")
        }
    }
}
</script>

<style scoped>
#cardLogin {
    display: flex;
    margin-top: 50px;
    justify-content: center;
}


</style>