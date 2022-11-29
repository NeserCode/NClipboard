<script lang="ts" setup>
import { toRefs, defineEmits, defineProps } from "vue"
const $emit = defineEmits(["toggle"])
const $props = defineProps<{
	name: string
}>()

const { name } = toRefs($props)

function emit(): void {
	$emit("toggle")
}
</script>

<template>
	<button class="WindowCreatorBtn" @click="emit">
		<span class="creatorName">{{ name }}</span>
	</button>
</template>

<style lang="postcss" scoped>
.WindowCreatorBtn {
	@apply flex flex-col justify-center items-center
  px-4 py-1.5 border-2 rounded m-2 shadow
  bg-gray-100 hover:bg-gray-200 hover:border-gray-300
  transition-all select-none;
}
</style>
