<template>
  <div id="loader" v-if="waiting"></div>
</template>

<script>
export default {
  name: 'Loader',
  props: [ 'waiting' ],
};
</script>
