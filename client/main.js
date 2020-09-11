import Vue from 'vue'
import App from './src/App'
import { LoaderPlugin } from 'vue-google-login'
import googleParams from './src/config/googleParams'

Vue.use(LoaderPlugin, {
    client_id : googleParams.clientId
})

new Vue({ render: createElement => createElement(App) }).$mount('#app');

