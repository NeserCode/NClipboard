<script lang="ts" setup>
import TimeModule from "@/components/TimeModule.vue"
import type { BrowserWindowConstructorOptions } from "electron"
import WindowCreator from "@/test/WindowCreator.vue"
import { WindowCreator as WindowCreatorClass } from "@/core/windowCreator"
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { getWindowPosition } from "@/utils/getWindowPosition"
import { ref, computed } from "vue"

import { ipcRenderer, remote } from "@/utils"

let cfg: BrowserWindowConstructorOptions

ipcRenderer.on("MAIN_WINDOW_ID", (event, windowId) => {
	cfg = {
		x: getWindowPosition().x,
		y: getWindowPosition().y - 320,
		height: 300,
		parent: remote.BrowserWindow.fromId(windowId) ?? undefined,
		modal: true,
	}
})

const otherWindow = ref<WindowCreatorClass | null>(null)
const isOpening = computed(() => otherWindow.value !== null)

function toggleWindowCreator() {
	if (!isOpening.value) {
		otherWindow.value = new WindowCreatorClass(cfg, "/#/setting")
		otherWindow.value.openWindow()
	} else {
		otherWindow.value?.closeWindow()
		otherWindow.value = null
	}
}

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
</script>

<template>
	<div class="home">
		<time-module />
		<window-creator name="Setting" @toggle="toggleWindowCreator" />
	</div>
</template>

<style lang="postcss" scoped>
.home {
	@apply inline-flex items-center w-full h-full px-4
	bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	transition-colors duration-300;
}
</style>
