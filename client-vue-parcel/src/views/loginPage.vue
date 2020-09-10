<template>
    <div>
        <div id="form_login">
            <form id="dataLogin" @submit.prevent="login">
              <h3>Login</h3>
                <div class="">
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="emailLogin" v-model="email" placeholder="Email">
                    </div>
                </div>
                <br>
                <div class="">
                    <div class="col-sm-12">
                        <input type="password" class="form-control" id="passwordLogin" v-model="password" placeholder="Password">
                    </div>
                </div>
                <br>
                <div class="col-sm-12">
                    <button type="submit" class="btn btn-primary">LOGIN</button>
                </div>
            </form>
            <div class="col-sm-12" style="margin-top: 10px; margin-bottom: 10px;">
                Or Login With Google:
            </div>
            <div class="col-sm-12">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <div class="col-sm-12" style="margin-top: 10px;" id="registerclick">
                <h5>Don't have an account? <a href="#" @click.prevent="signup">Sign Up</a></h5>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    // props: ['page'],
    name: 'LoginPage',
    data(){
        return{
            email: "",
            password: ""
        }
    },
    methods: {
        login(){
            let payload = {
                email: this.email,
                password: this.password
            }
            // console.log(payload)
            this.$emit('loginSubmit', payload)
        },
        signup(){
            this.$emit('signup')
        }
    },
}
</script>