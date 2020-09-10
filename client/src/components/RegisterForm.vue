<template>
      <!-- REGISTER PAGE -->
        <section>
            <div class="container" id="register-page">
                <form @submit.prevent="registerUser" id="register-form">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" v-model="email" aria-describedby="emailHelp">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="form-group">
                        <label for="organization">Organization</label>
                        <input type="text" class="form-control" v-model="organization" placeholder="Hacktiv8">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>
        </section>
</template>

<script>
export default {
name: 'RegisterForm',
data: function(){
     return{
        email: '',
        password: '',
        organization:''
    }
},
methods: {
 registerUser(){
     const payload = {
         email: this.email,
         password: this.password,
         organization: this.organization
     }
     //emit

     this.email ='';
     this.password = '';
     this.organization= '';
 }
}
}
</script>

<style>

</style>