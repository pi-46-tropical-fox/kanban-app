<template>
  <div>
    <div class="alert alert-warning col-12" role="alert">
        This is a warning alert—check it out!
        {{error}}
    </div>
  </div>
</template>

<script>
export default {
    name: 'Error',
    props: [ 'error' ]

}
</script>

<style>

</style>