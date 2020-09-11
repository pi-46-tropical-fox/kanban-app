<template>
    <div class="container-form">
        <div class="box-form">
            <div class="tabs">
                <ul>
                  <li v-on:click="getOrganization"><a>Your Organization</a></li>
                  <li v-on:click="joinOrganization"><a>Join</a></li>
                  <li class="is-active"><a>Create</a></li>
                </ul>
            </div>
            <form class="field" @submit.prevent="createOrganization">
                <label class="label">Create Organization<label>
                <div class="control">
                    <input class="input" type="text" v-model="name">
                </div>
                <button class="button is-info" type="submit">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard Create Organization',
    data() {
        return {
            name: ''
        }
    },
    methods : {
        joinOrganization() {
            this.$emit('joinOrganizationButton')
        },
        getOrganization() {
            this.$emit('dashboardOrganizationButton')
        },
        createOrganization() {
            let data = {
                name : this.name
            }
            this.$emit('createOrganizationButton', data)
        }
    }
}
</script>

<style>

</style>