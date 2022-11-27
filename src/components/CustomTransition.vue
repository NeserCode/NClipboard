<script lang="ts" setup></script>

<template>
	<transition mode="out-in" name="custom-transition">
		<slot></slot>
	</transition>
</template>

<style lang="postcss" scoped>
.custom-transition-enter-active,
.custom-transition-leave-active {
	transition: opacity 0.5s ease;
}

.custom-transition-enter-from,
.custom-transition-leave-to {
	opacity: 0;
}
</style>
