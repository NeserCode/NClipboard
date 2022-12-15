<script lang="ts" setup>
import { ref, onMounted } from "vue"
import type { OnceClipboard } from "@/share"

import { ClipboardMonitor } from "@/core/ClipboardMonitor"
import { StoreManager } from "@/core/StoreManager"

const clipboard = ref<OnceClipboard>("")
const prefix = ref<string>("")
const storeManager = new StoreManager()
const clipboardMonitor = new ClipboardMonitor(storeManager)

onMounted(() => {
	clipboardMonitor.start()
	clipboard.value = clipboardMonitor.getClipboard().readContent
	prefix.value = clipboardMonitor.getClipboard().usefulFormat[0]
})
</script>

<template>
	<div id="clipboard">
		<span class="prefix">
			{{ prefix }}
		</span>
		<span class="main">
			{{ clipboard }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
#clipboard {
	@apply inline-flex items-center justify-center h-full max-w-md rounded
  mx-1 p-2 text-sm text-gray-400
  hover:bg-slate-200 dark:hover:bg-gray-600
  cursor-pointer select-none
  transition-colors duration-300;
}

#clipboard .prefix {
	@apply inline-flex items-center justify-center min-w-fit p-1 rounded mr-2 uppercase
  text-xs font-mono bg-gray-300 dark:bg-gray-800 text-gray-400
  truncate transition-colors duration-300;
}

#clipboard .main {
	@apply text-sm text-gray-400
  truncate
  transition-colors duration-300;
}
</style>
