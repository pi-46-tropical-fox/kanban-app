<template>
	<button class="button" @click="MoveToCategory(category.id)">Move To: <slot></slot></button>
</template>

<script>
export default {
	name: 'MoveToButton',

	props: ['category'],

	methods: {
		MoveToCategory(id) {
			this.$emit('MoveToCategory', id);
		},
	},
};
</script>

<style></style>
