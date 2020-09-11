<template>
    <div class="container-form">
        <div class="box-form">
            <div class="tabs">
                <ul>
                    <li class="is-active"><a>Your Organization</a></li>
                    <li v-on:click="joinOrganization"><a>Join</a></li>
                    <li v-on:click="createOrganization"><a>Create</a></li>
                </ul>
              </div>
            <div class="field">
                <label class="label">Your Organization<label>
                <div class="control">
                    <div class="select is-info">
                        <select>
                            <option selected disabled>--Choose--</option>
                            <option>Hacktiv8</option>
                            <option>Groove Street</option>
                        </select>
                    </div>
                </div>
            </div>
            <button class="button is-info" type="submit">Enter</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dashboard Organization',
    methods: {
        createOrganization() {
            this.$emit('createOrganizationButton')
        },
        joinOrganization() {
            this.$emit('joinOrganizationButton')
        }
    }
}
</script>

<style>

</style>