import Vue from 'vue';
import App from '../src/App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'

new Vue({
  render: h => h(App),
  GoogleSignInButton,
}).$mount('#app');