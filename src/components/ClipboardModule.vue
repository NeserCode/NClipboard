<script lang="ts" setup>
import { ref, onMounted } from "vue"
import type { OnceClipboard, clipboardData } from "@/share"

import { ClipboardMonitor } from "@/core/ClipboardMonitor"
import { StoreManager } from "@/core/StoreManager"

import { $Bus } from "@/utils"

const clipboard = ref<OnceClipboard>("")
const prefix = ref<string>("")
const maxLength = ref<number>(1e3)
const storeLength = ref<number>(0)
const storeManager = new StoreManager({ maxLength: maxLength.value })
const clipboardMonitor = new ClipboardMonitor(storeManager)
const contentWidth = ref(0)
const shouldShowContent = ref(true)
const isReady = ref(false)

onMounted(() => {
	clipboardMonitor.start()
	storeLength.value = storeManager.getStore().length

	// for animate content width
	setTimeout(() => {
		contentWidth.value = getInitialWidth()
		toggleClipboard(new MouseEvent("mousedown", { button: 2 }))
		setTimeout(() => {
			toggleClipboard(new MouseEvent("mousedown", { button: 2 }))
			isReady.value = true
		}, 0)
	}, 2000)
})

// @ts-expect-error Eimtter has writen function's (handler) type
$Bus.on("clipboard-updated", (data: clipboardData) => {
	clipboard.value = data.usefulFormat[0].split("/").includes("image")
		? "Image only support in the list"
		: data.readContent
	prefix.value = data.usefulFormat[0]
	storeLength.value = storeManager.getStore().length
})
// @ts-expect-error Eimtter has writen function's (handler) type
$Bus.on("clipboard-updated-from-last", (data: string) => {
	clipboard.value = data
	prefix.value = "Lastest"
	storeLength.value = storeManager.getStore().length
})

function getInitialWidth() {
	const target = document.querySelector("#clipboard .main") as HTMLElement
	if (target) {
		const rect = target.getBoundingClientRect()

		return rect.width
	} else return 0
}

function initWidthforContent() {
	const target = document.querySelector("#clipboard .main") as HTMLElement
	if (target) {
		target.style.width = `${
			shouldShowContent.value ? contentWidth.value : 0
		}px`
	}
}

function toggleClipboard(e: MouseEvent) {
	if (!isReady.value) return false
	if (contentWidth.value === 0) {
		contentWidth.value = getInitialWidth()
	}

	if (e.button === 2) {
		shouldShowContent.value = !shouldShowContent.value
		initWidthforContent()
	} else return false
}
</script>

<template>
	<div id="clipboard" @mousedown="toggleClipboard">
		<span class="prefix">
			{{ prefix }}
		</span>
		<span :class="['main', shouldShowContent ? null : 'hide']">
			{{ clipboard }}
		</span>
		<span class="limit"> {{ storeLength }}/{{ maxLength }} </span>
	</div>
</template>

<style lang="postcss" scoped>
#clipboard {
	@apply inline-flex items-center justify-center max-w-md rounded
  mx-1 p-2 text-sm text-gray-400
  hover:bg-slate-200 dark:hover:bg-gray-600
  cursor-pointer select-none
  transition-colors duration-300;
}

#clipboard .prefix {
	@apply inline-flex items-center justify-center min-w-fit p-1 rounded mr-2 uppercase
  text-xs font-mono bg-slate-200 dark:bg-slate-800 text-gray-400 border-2 border-transparent
  truncate transition-colors duration-300;
}
#clipboard:hover .prefix {
	@apply border-gray-300 dark:border-gray-500;
}

#clipboard .main {
	@apply text-sm text-gray-400
  truncate
  transition-all duration-300;
}

#clipboard .main.hide {
	@apply w-0;
}

#clipboard .limit {
	@apply inline-flex items-center justify-center min-w-fit p-1 rounded ml-2 uppercase
	text-xs font-mono
	transition-colors duration-300;
}
</style>
