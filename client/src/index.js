import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({ GoogleSignInButton ,render: createElement => createElement(App) }).$mount('#app');