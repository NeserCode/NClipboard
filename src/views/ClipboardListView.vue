<script lang="ts" setup>
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { StoreManager } from "@/core/StoreManager"
import { ref, onBeforeMount } from "vue"

import { StoredClipboard } from "@/share"

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
const storeManager = ref<StoreManager | null>(new StoreManager())

const clipboardData = ref<StoredClipboard>([])

function toggleDarkmode(darkmode: boolean) {
	if (darkmode) document.querySelector("html")?.classList.add("dark")
	else document.querySelector("html")?.classList.remove("dark")
}

if (configRemoteMonitor.value) {
	configRemoteMonitor.value.listeningConfigUpdated((config) => {
		toggleDarkmode(config.darkmode)
		console.log("config updated")
	})
}

onBeforeMount(() => {
	if (storeManager.value)
		clipboardData.value = storeManager.value.getStore().reverse()
})

function isBase64(str: string) {
	try {
		return btoa(atob(str)) == str
	} catch (err) {
		return false
	}
}

function getComputedContent(raw: string) {
	return isBase64(raw) ? "[Image]" : raw
}
</script>

<template>
	<div class="copy-list">
		<span class="copy-item" v-for="item of clipboardData" :key="item.time">
			<span class="copy-text">{{ getComputedContent(item.clipboard) }}</span>
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.copy-list {
	@apply inline-flex flex-col items-center w-full h-[300px] max-w-full overflow-x-hidden
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	text-gray-700 dark:text-gray-300 overflow-y-auto
	transition-all duration-300;
}

.copy-item {
	@apply inline-flex items-center w-full max-w-full p-4 box-border border rounded-none
	bg-gray-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600
	whitespace-pre font-mono
	transition-colors duration-300;
}
</style>
