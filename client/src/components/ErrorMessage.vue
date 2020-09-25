<template>
  <div id="errorMessage" class="alert alert-warning alert-dismissible fade show" role="alert" v-if="error">
    <h6><strong>{{ message }}</strong></h6>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="closeError">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: [ 'message', 'error' ],
  methods: {
    closeError() {
      this.$emit('closeError')
    }
  },
};
</script>
