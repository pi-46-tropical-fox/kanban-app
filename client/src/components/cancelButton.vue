<template>
  <div class="float-right"><button class="btn mr-5" style="background-color: #89beb3; color:white;" @click.prevent="cancel">Cancel</button></div>
</template>

<script>
export default {
    name: 'CancelButton',
    methods: {
        cancel() {
            this.$emit('cancelAction', 'show')
        }
    }
}
</script>

<style>

</style>