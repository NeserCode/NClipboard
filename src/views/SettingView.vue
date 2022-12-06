<script lang="ts" setup>
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { ref } from "vue"

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)

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
</script>

<template>
	<div class="setting">
		<span class="setting-item">setting</span>
	</div>
</template>

<style lang="postcss" scoped>
.setting {
	@apply inline-flex flex-col items-center w-full h-[300px] overflow-y-auto
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	transition-all duration-300;
}
</style>
