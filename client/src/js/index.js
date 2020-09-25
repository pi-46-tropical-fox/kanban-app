import Vue from 'vue';
import App from '../App.vue';
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '602159561116-eubv6a4q33s5ldu3ilamottim02d6o98.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)


new Vue({ render: createElement => createElement(App) }).$mount('#app');