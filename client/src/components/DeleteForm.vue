<template>
  <div style=" color:white;background-color: #797a7e;">
       sure want to delete?
    <button type="button"  @click.prevent="confirm('yes')" class="btn btn-success">Yes</button>
    <button type="button"  @click.prevent="confirm('no')" class="btn btn-danger">No</button>
  </div>
</template>

<script>
export default {
    name:"DeleteForm",
    methods: {
      confirm(status) {
			  this.$emit('deleteConfirm', status)
      },
    }
    

}
</script>

<style>

</style>