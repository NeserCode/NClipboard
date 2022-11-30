<script lang="ts" setup>
import WindowCreator from "@/test/WindowCreator.vue"
import { WindowCreator as WindowCreatorClass } from "@/core/windowCreator"
import { getWindowPosition } from "@/utils/getWindowPosition"
import { ref, computed } from "vue"

import { ipcRenderer, remote } from "@/utils"
import { WindowController } from "@/core/WindowController"

let cfg: Record<never, never>

ipcRenderer.on("MAIN_WINDOW_ID", (event, windowId) => {
	cfg = {
		x: getWindowPosition().x + 50,
		y: getWindowPosition().y + 50,
		parent: remote.BrowserWindow.fromId(windowId),
		modal: true,
	}

	let winPosListener = new WindowController(
		remote.BrowserWindow.fromId(windowId)
	).listeningWindowPosition()
})

const otherWindow = ref<WindowCreatorClass | null>(null)
const isOpening = computed(() => otherWindow.value !== null)

function toggleWindowCreator() {
	if (!isOpening.value) {
		otherWindow.value = new WindowCreatorClass(cfg, "/#/about")
		otherWindow.value.openWindow()
	} else {
		otherWindow.value?.closeWindow()
		otherWindow.value = null
	}
}
</script>

<template>
	<div class="home">
		<window-creator name="Setting" @toggle="toggleWindowCreator" />
	</div>
</template>

<style lang="postcss" scoped>
.home {
	@apply inline-flex items-center w-full h-full
	bg-slate-200;
}
</style>
