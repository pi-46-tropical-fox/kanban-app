new Vue({
    el: '#app',
    data: {
			currentPage: 'login',
			username: '',
			password:'',
			message: 'halooo',
			categories: [],
			tasks: [],
			filter: ''  
    },
    methods: {
			login(payload) {
				axios({
					url: 'http://localhost:3000/login',
					method: 'POST',
					data: payload
				})
				.then(({data}) => {
					console.log('masuk');
					console.log(data);

					// fetchCategories()
				})
				.catch((error) => {

					console.log(error);
				})
			},
			fetchCategories() {	
				axios
					.get('http://localhost:3000/tasks')
					// .headers({
					// 	access_token: localStorage.getItem('access_token')
					// })
					// .data()
					.then(({data}) => {
						this.currentPage = 'home'
						this.username = ''
						this.password = '',
						this.categories = data
						
						let temp = []
						data.forEach(e => {
							temp.push(e.Tasks)
						});
						this.tasks = temp
					})
					.catch((error) => {
						// handle error
						console.log(error);
					})
			},
			deleteItem(i) {
				this.tasks.splice(i,1)
			}
		},
		beforeCreate() {
			console.log('masuk ke beforeCreate');

		},
		created() {
				console.log('masuk ke created');
				if(localStorage.getItem('access_token')) {
					this.currentPage = 'home'
					this.fetchCategories()
				}
				else this.currentPage = 'login'

		},
		computed: {
			categoryFiltered() {
				const resultFilter = this.categories.filter(category => category.title.includes(this.filter))
				return resultFilter
			}

		},
		beforeMount() {
				console.log('masuk ke beforeMount');

		},
		mounted() {
				console.log('masuk ke mounted');

		},
		beforeUpdate() {
				console.log('masuk ke updated');

		},
		updated() {
				console.log('masuk ke sini');

		},
		beforeDestroy() {
				console.log('masuk ke beforeDestroy');

		},
		destroy() {
				console.log('masuk ke destroy');

		}
  })