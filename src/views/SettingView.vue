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
</script>

<template>
	<div class="setting">
		<span class="setting-item">setting</span>
		<span class="item" v-for="(item, index) of clipboardData" :key="index">
			{{ item }} | {{ index }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.setting {
	@apply inline-flex flex-col items-center w-full h-[300px] overflow-y-auto
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	text-gray-700 dark:text-gray-300
	transition-all duration-300;
}

.item {
	@apply inline-flex items-center w-full py-4 box-border
	truncate
	bg-gray-100 dark:bg-gray-700
	transition-colors duration-300;
}
</style>
