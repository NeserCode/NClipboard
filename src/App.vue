<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { WindowController } from "@/core/WindowController"
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { ipcRenderer } from "@/utils"

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
const windowController = ref<WindowController | null>(new WindowController())

const $route = useRoute()
const shouldShowMover = computed(() => $route.path === "/")
const enabledMoverClass = ref<string | null>(updateMoverClass())

function updateMoverClass() {
	if (shouldShowMover.value) {
		return configRemoteMonitor.value?.getLocalConfig().enableMovement
			? "enabled"
			: null
	}
	return null
}

function toggleDarkmode() {
	// configRemoteMonitor.value?.toggleDarkmode()
	if (document.querySelector("html")?.classList.contains("dark")) {
		document.querySelector("html")?.classList.remove("dark")
		return false
	} else {
		document.querySelector("html")?.classList.add("dark")
		return true
	}
}

// Listeners
windowController.value?.listeningMovedPosition(() => {
	configRemoteMonitor.value?.setPositionfromLocalStore()
})
windowController.value?.listeningToggleMovement(() => {
	configRemoteMonitor.value?.toggleEnableMovement()
	enabledMoverClass.value = updateMoverClass()
})
windowController.value?.listeningToggleDarkmode(() => {
	configRemoteMonitor.value?.toggleDarkmode(toggleDarkmode())
})

ipcRenderer.send("MAIN_WINDOW_ID_GETTER")
</script>

<template>
	<div class="application">
		<router-view v-slot="{ Component }" class="views">
			<custom-transition>
				<component :is="Component" />
			</custom-transition>
		</router-view>
		<div :class="['mover', enabledMoverClass]" v-if="shouldShowMover">Drag</div>
	</div>
</template>

<style lang="postcss" scoped>
.application {
	@apply inline-flex items-center w-full h-full rounded overflow-y-hidden;
}
.views {
	@apply inline-flex items-center w-full h-full;
}

.mover {
	@apply inline-flex justify-center items-center w-0 h-14
	bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-green-300
	font-thin text-sm
	transition-all overflow-hidden;
	-webkit-app-region: drag;
}
.mover.enabled {
	@apply w-14;
}
</style>
