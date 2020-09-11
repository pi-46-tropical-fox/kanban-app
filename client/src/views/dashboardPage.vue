<template>
    <navbar @logOut='logOut'></navbar>
</template>

<script>
import navbar from '../components/navbarCmp'
export default {
    name: 'DashboardPage',
    component:{

    },
    methods:{
        logout(payload){
            localStorage.clear()
            this.$emit('logOut',payload)
        }
    }
}
</script>

<style>

</style>