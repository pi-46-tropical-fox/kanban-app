<template>

  <g-signin-button 
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">

    <i class="fab fa-google"></i>
    oogle
  </g-signin-button>
</template>
 
<script>
// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
export default {
name:'googleSignIn',
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object} 
       */
      googleSignInParams: {
        client_id: '296883314892-bvvia7e9e21k7kk2lv8o1be52alcu0ra.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile() // etc etc
      console.log(profile)
      const google_access_token = googleUser.getAuthResponse().id_token;
      this.$parent.$parent.$parent.googleLogin(google_access_token)
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
//   components: {GSignInButton}
}
</script> 
 
<style>
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
}
</style> 