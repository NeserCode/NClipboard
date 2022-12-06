<script lang="ts" setup>
import { ref, toRefs, watch } from "vue"
import { debounce } from "ts-debounce"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid"

const $props = defineProps<{
	options: {
		value: number | string | boolean
		label: string
	}[]
	initialValue: number | string | boolean
}>()
const { options, initialValue } = toRefs($props)
const $emit = defineEmits<{
	(event: "change", result: number | string | boolean): void
}>()

const activeIndex = ref(
	options.value.findIndex((option) => option.value === initialValue.value)
)

watch(
	() => initialValue.value,
	(newValue) => {
		console.log("initialValue changed")

		activeIndex.value = options.value.findIndex(
			(option) => option.value === newValue
		)
	}
)

function activeFilter(): {
	value: number | string | boolean
	label: string
} {
	if (activeIndex.value === -1)
		return {
			value: "Invalid Value",
			label: "Unknow",
		}
	return options.value[activeIndex.value]
}

watch(activeIndex, (newIndex) => {
	$emit("change", options.value[newIndex].value)
})

function getPrevIndex(): number {
	if (activeIndex.value === 0) return options.value.length - 1
	return activeIndex.value - 1
}

function getNextIndex(): number {
	if (activeIndex.value === options.value.length - 1) return 0
	return activeIndex.value + 1
}

const prev = debounce(() => {
	activeIndex.value = getPrevIndex()
}, 300)

const next = debounce(() => {
	activeIndex.value = getNextIndex()
}, 300)
</script>

<template>
	<div class="selection-bar">
		<span class="opration" @click="prev"><ChevronLeftIcon /></span>
		<span class="selected">{{ activeFilter().label }}</span>
		<span class="opration" @click="next"><ChevronRightIcon /></span>
	</div>
</template>

<style lang="postcss" scoped>
.selection-bar {
	@apply inline-flex flex-row items-center justify-center w-full h-10 my-2
	border-2 rounded border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800
	font-medium text-sm text-gray-500 dark:text-gray-400
	transition-all duration-300 select-none;
}

.selected {
	@apply flex-1 text-center px-2;
}

.opration {
	@apply inline-flex justify-center items-center w-8 p-2 py-1.5 mx-1 rounded
	hover:bg-slate-200 dark:hover:bg-slate-600
	transition-all duration-300;
}
</style>
