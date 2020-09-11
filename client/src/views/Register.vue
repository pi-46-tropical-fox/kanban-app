<template>
    <div class="container container-fluid col-sm-5 p-4">
        <div class="row-3 p-5 border border-secondary" style="border-radius: 20px; box-shadow: 0 0 25px grey, 0 0 3px grey">
        <form @submit.prevent="register" class="mx-auto">
            <span style="font-size: 30px">Register</span><br>
            <div class="form-group">
                <label for="name" class="col-form-label">Name</label>
            <div>
                <input type="text" class="form-control" v-model="name">
            </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-form-label">Email</label>
            <div>
                <input type="email" class="form-control" v-model="email">
            </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-form-label">Password</label>
            <div>
                <input type="password" class="form-control" v-model="password">
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form><br>
        </div>
    </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'RegisterPage',
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register() {
            // axios.post('/register', {
            //     data: {
            //         name: this.name,
            //         email: this.email,
            //         password: this.password
            //     }
            // })
            axios({
                method: 'POST',
                url: '/register',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                console.log(data);
                this.$emit('toPage', 'loginPage')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style>

</style>