<template>
  <div>
    <!-- REGISTER -->
    <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
            <div class="card-body">
                <h5 class="card-title text-center text-dark">Sign Up</h5>
                
                <form @submit.prevent="submitRegister" class="form-signup">
                    <div class="form-label-group">
                        <input type="text" v-model="name" class="form-control" placeholder="Name" required autofocus>
                        <label for="registerName">Name</label>
                    </div>

                    <div class="form-label-group">
                        <input type="email" v-model="email" class="form-control" placeholder="Email address" required autofocus>
                        <label for="registerEmail">Email address</label>
                    </div>
                
                    <div class="form-label-group">
                        <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                        <label for="registerPassword">Password</label>
                    </div>

                    <div class="form-label-group">
                        <input type="text" v-model="pictureUrl" class="form-control" placeholder="Image Url">
                        <label for="registerImageUrl">Image Url (Not Mandatory)</label>
                    </div><br>
                
                    <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign Up</button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'RegisterPage',
    data() {
        return{
            name: '',
            email: '',
            password: '',
            pictureUrl: ''
        }
    },
    methods: {
        submitRegister() {
            console.log(this.name, this.password, this.email, this.pictureUrl)
            axios({
                method: 'POST',
                url: 'http://localhost:3000/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    pictureUrl: this.pictureUrl
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.$emit('emitToPage', 'Login')
                })
                .catch(({err}) => {
                    console.log(err)
                })
        }
    }

}
</script>

<style>

</style>