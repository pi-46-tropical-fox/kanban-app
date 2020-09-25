<template>
  <div class="board ">
    <div class="board-header">{{ boardCategory }}</div>
    <div :class="classBody">
      <slot></slot>
    </div>
    <div :class="classFooter">{{ boardFooter }}</div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: [ 'boardCategory', 'boardFooter', 'classBody', 'classFooter' ]
};
</script>
