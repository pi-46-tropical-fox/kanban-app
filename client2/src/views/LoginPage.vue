<template>
  <div>
    <h1>Login Form</h1>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          required
          placeholder="Enter your password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'login',
    data () {
        return {
            email : '',
            password : ''
        }
    },
    methods: {
        onSubmit () {
            let params = {
                email: this.email,
                password: this.password
            }

            axios ({
                url: '/login',
                method: "POST",
                data: params
            })
            .then( (data) => {
                console.log(data)
                localStorage.setItem('access_token', data.access_token)
                localStorage.setItem('id', data.id)
                localStorage.setItem('name', data.name)
                localStorage.setItem('organization', data.organization)
                this.email = '',
                this.password = ''
            })


        }
    }
}
</script>

<style>

</style>