const app = new Vue({
    el: '#register-page',
    data: {
        message: 'halohalo',
        dataSubmitted: false
    },
    methods: {
        submitData() {
            this.dataSubmitted = true
        }
    }
})