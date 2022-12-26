<script lang="ts" setup>
import { ref, onMounted } from "vue"
import type { OnceClipboard, clipboardData } from "@/share"

import { ClipboardMonitor } from "@/core/ClipboardMonitor"
import { StoreManager } from "@/core/StoreManager"

import { $Bus } from "@/utils"

const clipboard = ref<OnceClipboard>("")
const prefix = ref<string>("")
const maxLength = ref<number>(50)
const storeLength = ref<number>(0)
const storeManager = new StoreManager({ maxLength: maxLength.value })
const clipboardMonitor = new ClipboardMonitor(storeManager)

onMounted(() => {
	clipboardMonitor.start()
	storeLength.value = storeManager.getStore().length
})

// @ts-expect-error Eimtter has writen function's (handler) type
$Bus.on("clipboard-updated", (data: clipboardData) => {
	clipboard.value = data.readContent
	prefix.value = data.usefulFormat[0]
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
  text-xs font-mono bg-slate-200 dark:bg-slate-800 text-gray-400
  truncate transition-colors duration-300;
}

#clipboard .main {
	@apply text-sm text-gray-400
  truncate
  transition-colors duration-300;
}

#clipboard .limit {
	@apply inline-flex items-center justify-center min-w-fit p-1 rounded ml-2 uppercase
	text-xs font-mono
	truncate transition-colors duration-300;
}
</style>
