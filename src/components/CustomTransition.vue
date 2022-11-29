<script lang="ts" setup></script>

<template>
	<transition mode="out-in" name="custom-transition">
		<slot></slot>
	</transition>
</template>

<style lang="postcss" scoped>
.custom-transition-enter-active,
.custom-transition-leave-active {
	@apply transition-all duration-500;
}

.custom-transition-enter-from,
.custom-transition-leave-to {
	@apply opacity-0;
}
</style>
