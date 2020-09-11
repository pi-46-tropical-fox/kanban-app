<template>
    <div>
        <div id="form_registration">
            <form id="dataRegister" @submit.prevent="register">
              <h3>Registration Form</h3>
                <div class="">
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="nameReg" v-model="nameReg" placeholder="Name">
                    </div>
                </div>
                <br>
                <div class="">
                    <div class="col-sm-12">
                        <input type="email" class="form-control" id="emailReg" v-model="emailReg" placeholder="Email">
                    </div>
                </div>
                <br>
                <div class="">
                    <div class="col-sm-12">
                        <input type="password" class="form-control" id="passwordReg" v-model="passwordReg" placeholder="Password">
                    </div>
                </div>
                <br>
                <div class="">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RegistrationPage',
    data(){
        return{
            nameReg: '',
            emailReg: '',
            passwordReg: ''
        }
    },
    methods: {
        register(){
            let payload = {
              name: this.nameReg,
              email: this.emailReg,
              password: this.passwordReg  
            }
            this.$emit('registSubmit',payload)
            
            this.nameReg = ''
            this.emailReg = ''
            this. passwordReg = ''
        }
    },
}
</script>