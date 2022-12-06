<script lang="ts" setup>
import SelectionBar from "@/components/FormComponents/SelectionBar.vue"

import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { ref } from "vue"

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
let selectionDarkmode = configRemoteMonitor.value?.getLocalConfig().darkmode

function toggleDarkmode(darkmode: boolean) {
	if (darkmode) document.querySelector("html")?.classList.add("dark")
	else document.querySelector("html")?.classList.remove("dark")
}

function updateSelection() {
	if (configRemoteMonitor.value)
		selectionDarkmode = configRemoteMonitor.value.getLocalConfig().darkmode
}

if (configRemoteMonitor.value) {
	configRemoteMonitor.value.listeningConfigUpdated((config) => {
		toggleDarkmode(config.darkmode)
		updateSelection()
		console.log("config updated")
	})
}

const options = [
	{
		value: true,
		label: "Dark",
	},
	{
		value: false,
		label: "Light",
	},
]
</script>

<template>
	<div class="setting">
		<span class="setting-item">
			<selection-bar :options="options" :initial-value="selectionDarkmode" />
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.setting {
	@apply inline-flex flex-col items-center w-full h-[300px] overflow-y-auto
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	transition-all duration-300;
}
</style>
