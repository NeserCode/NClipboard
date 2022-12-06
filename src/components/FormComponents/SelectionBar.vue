<script lang="ts" setup>
import { ref, toRefs, computed } from "vue"

const $props = defineProps<{
	options: {
		value: number | string | boolean
		label: string
	}[]
	initialValue: number | string | boolean
}>()
const { options } = toRefs($props)
const $emit = defineEmits<{
	(event: "change", result: number | string | boolean): void
}>()

const activeIndex = computed(() => {
	return options.value.findIndex(
		(option) => option.value === $props.initialValue
	)
})

function activeFilter(): {
	value: number | string | boolean
	label: string
} {
	if (activeIndex.value === -1) return "Unknow"
	return options.value[activeIndex.value]
}
</script>

<template>
	<div class="selection-bar">{{ activeFilter().label }}</div>
</template>

<style lang="postcss" scoped></style>
