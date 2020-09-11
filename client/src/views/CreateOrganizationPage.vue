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
            <div class="field">
                <label class="label">Create Organization<label>
                <div class="control">
                    <input class="input" type="text">
                </div>
            </div>
            <button class="button is-info" type="submit">Create</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard Create Organization',
    methods : {
        joinOrganization() {
            this.$emit('joinOrganizationButton')
        },
        getOrganization() {
            this.$emit('dashboardOrganizationButton')
        }
    }
}
</script>

<style>

</style>