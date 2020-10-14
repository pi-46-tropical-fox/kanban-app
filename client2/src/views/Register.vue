<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
            <b-card-img src="https://picsum.photos/400/400/?image=41" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="Register Form" class="mt-3">
              <div v-if="notification">{{notification}}</div>        
              <b-form  class="mt-2" v-on:submit.prevent="registerSubmit">
                <b-form-group label="Name:">
                  <b-form-input
                    v-model="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                  ></b-form-input>
                </b-form-group>  

                <b-form-group label="Email address:">
                  <b-form-input
                    v-model="email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Your Password:">
                  <b-form-input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter Password"
                  ></b-form-input>
                </b-form-group>
              <b-button type="submit" variant="primary">Register</b-button>
            </b-form>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
    name: 'register',
    data () {
        return {
            name: '',
            email: '',
            password:'',
            notification: ''
        }
    },
    methods : {
        registerSubmit () {
            let payload = {
                name: this.name,
                email: this.email,
                password:this.password
            }
            console.log(payload)
            axios ({
                url: '/register',
                method: "POST",
                data : payload
            })
            .then( ({response}) => {
                
                this.$emit('registerSubmit')
                this.name = ''
                this.email = ''
                this.password = ''
            })
            .catch( ({response}) => {
                console.log(response.data.errors)
                this.notification = response.data.errors.join(',')
            })
        }
    }
    

}
</script>

<style>

</style>