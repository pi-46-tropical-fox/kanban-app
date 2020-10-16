import Vue from 'vue';
import App from './App.vue';
import GoogleSignInButton from 'vue-google-signin-button-directive'


new Vue({
  GoogleSignInButton,
  render: createElement => createElement(App),
}).$mount('#app');



// new Vue ({
//   el: '#app',
//   data: {
//     currentPage: 'login',
//     email:'',
//     password:'',
//     bands: [],
//     search: ''
//   },
//   methods: {
//     login() {
//       localStorage.setItem('access_token', 'aWhjdahuD938dEWUnxZ')
//       fetchBands()
//     },
//     fetchBands() {
//       axios
//         .get('http://localhost:3000/bands')
//         .then(({ data }) => {
//           this.currentPage = 'home'
//           this.email = ''
//           this.password = ''
//           this.bands = data
//         })
//         .catch(err => {
//           console.log(err);
//         })
//     }
//   },
//   created() {
//     if (localStorage.getItem('access_token')) {
//       this.currentPage = 'home'
//       this.fetchBands()
//     } else {
//       this.currentPage = 'login'
//     }
//   },
//   computed: {
//     bandFiltered() {
//       const newBand = this.bands.filter(band => band.name.includes(this.search))
//       return newBand
//     }
//   }
// })