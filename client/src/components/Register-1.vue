<template>
  <div id='cardRegister'>
      <div class="card col-4">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                <a class="nav-link active" href="#">Register</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
                </li>
                </ul>
            </div>
            <div class="card-body">
            <h5 class="card-title">Register</h5>
            <form v-on:submit.prevent="register"> 
            <div class="form-group card-text">
                <label for="exampleInputEmail1">Email address</label><br>
                <input type="email" class="form-control" v-model="email" id="emailRegister" aria-describedby="emailHelp"><br>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small><br>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label><br>
                <input type="password" class="form-control" v-model="password" id="passwordRegister"><br>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'RegisterPage',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        register () {
            let payload = {
                email: this.email,
                password: this.password
            }

            this.$emit('registerSubmit', payload)
        }
    }
}
</script>

<style>
#cardRegister {
    display: flex;
    margin-top: 50px;
    justify-content: center;
}

</style>