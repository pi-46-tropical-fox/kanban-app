new Vue({
    el: '#app',
    data: {
        currentPage: 'login',
        name: '',
        description: '',
        email: '',
        password: '',
        taskForm: false,
        orgData: [],
        boardData: [],
        categoryData: []
    },
    methods: {
        loginPost() {
            axios.post('http://localhost:3000/auth/login', {
                email: this.email,
                password: this.password
            })
                .then(res => {
                    localStorage.setItem('access_token', res.data.access_token)
                    this.currentPage = 'main-menu'
                    this.getOrganization()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        registerPost() {
            axios.post('http://localhost:3000/auth/register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
                .then(() => {
                    this.currentPage = 'login'
                })
                .catch(err => {
                    console.log(err);
                })
        },

        changePage(page) {
            this.currentPage = page
        },

        getOrganization() {
            axios.get('http://localhost:3000/organization/my', {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    this.orgData = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },

        getBoard(id) {
            axios.get(`http://localhost:3000/board/${id}`, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    this.boardData = res.data
                    this.currentPage = 'board'
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        },

        postOrganization() {
            axios({
                method: 'post',
                url: 'http://localhost:3000/organization',
                data: {
                    name: this.name,
                    description: this.description,
                },
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    this.getOrganization()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        getCategory(id) {
            axios({
                method: 'get',
                url: `http://localhost:3000/category/${id}`,
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
                .then(res => {
                    console.log(res.data);
                    this.categoryData = res.data
                    this.currentPage = 'category'
                })
                .catch(err => {
                    console.log(err);
                })
        },

        showAddTaskForm() {
            this.taskForm = !this.taskForm
        },

        postTask(id) {

        }
    },
    created() {
        if (localStorage.getItem('access_token')) {
            this.currentPage = 'main-menu'
            this.getOrganization()
        } else {
            this.currentPage = 'login'
        }
    }
})