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
                <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
                <button v-google-signin-button="clientId" class="google-signin-button"><i class="fa fa-google" aria-hidden="true"></i> <b>Sign In</b></button>
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
            password: "",
            clientId: '953795490728-7anj5g54bd1c95c091pfonsnkfr29gsc.apps.googleusercontent.com'
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
        },
        OnGoogleAuthSuccess (idToken) {
            console.log(idToken)
            this.$emit('googleLogin', idToken)
            // Receive the idToken and make your magic with the backend
        },
        OnGoogleAuthFail (error) {
        console.log(error)
        }
    },
}
</script>
<style>
    .google-signin-button {
        /* color: white; */
        background-color: white;
        height: 50px;
        font-size: 16px;
        border-radius: 10px;
        padding: 10px 20px 25px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>