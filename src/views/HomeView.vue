<script lang="ts" setup>
import TimeModule from "@/components/TimeModule.vue"
import PowerModule from "@/components/PowerModule.vue"
import ClipboardModule from "@/components/ClipboardModule.vue"
import { WindowCreator as WindowCreatorClass } from "@/core/windowCreator"
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { getWindowPosition } from "@/utils/getWindowPosition"
import { ref, computed } from "vue"

// import { remote } from "@/utils"

const otherWindow = ref<WindowCreatorClass | null>(null)
const isOpening = computed(() => otherWindow.value !== null)

const disabledClass = computed(() => (isOpening.value ? "disabled" : null))

function toggleWindowCreator() {
	if (!isOpening.value) {
		otherWindow.value = new WindowCreatorClass(
			{
				x: getWindowPosition().x,
				y: getWindowPosition().y - 320,
				height: 300,
				alwaysOnTop: true,
				// parent: remote.getCurrentWindow(),
				// modal: true,
			},
			"/#/setting"
		)
		otherWindow.value.openWindow()
	} else {
		otherWindow.value?.closeWindow()
		otherWindow.value = null
	}
}

function toggleDarkmode(darkmode: boolean) {
	if (darkmode) document.querySelector("html")?.classList.add("dark")
	else document.querySelector("html")?.classList.remove("dark")
}

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
configRemoteMonitor.value?.listeningConfigUpdated((config) => {
	console.log("config updated", config)
	toggleDarkmode(config.darkmode)
})
</script>

<template>
	<div :class="['home', disabledClass]">
		<time-module />
		<power-module />
		<clipboard-module @click="toggleWindowCreator" />
	</div>
</template>

<style lang="postcss" scoped>
.home {
	@apply inline-flex items-center w-full h-[60px] box-border
	bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	transition-colors duration-300;
}

.home.disabled {
	@apply border-2 rounded border-red-400 dark:border-red-600;
}
</style>
