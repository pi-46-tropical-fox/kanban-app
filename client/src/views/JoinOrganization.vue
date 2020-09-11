<template>
    <div class="container-form">
        <div class="box-form">
            <div class="tabs">
                <ul>
                    <li v-on:click="getOrganization"><a>Your Organization</a></li>
                    <li class="is-active"><a>Join</a></li>
                    <li v-on:click="createOrganization"><a>Create</a></li>
                </ul>
              </div>
            <form class="field">
                <label class="label">Your Organization<label>
                <div class="organization-list">
                    <div class="organization-item" v-for="organization in organizationData" :value="organization.id" :key="organization.id">{{organization.name}}
                        <a class="button is-info" type="submit" v-on:click="organizationId(organization.id)">Join</a>
                    </div><br>
                </div><br>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard Join Organization',
    props: ['organizationData'],
    methods: {
        createOrganization() {
            this.$emit('createOrganizationButton')
        },
        getOrganization() {
            this.$emit('dashboardOrganizationButton')
        },
        organizationId(id) {
            this.$emit('joinOrganization', id)
        }
    }
}
</script>

<style>

</style>