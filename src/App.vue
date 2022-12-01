<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { computed } from "vue"
import { useRoute } from "vue-router"
import { WindowController } from "@/core/WindowController"
import { remote, ipcRenderer } from "@/utils"

const $route = useRoute()
const shouldShowMover = computed(() => $route.path === "/")

ipcRenderer.on("MAIN_WINDOW_ID", (event, windowId) => {
	new WindowController(remote.BrowserWindow.fromId(windowId))
})
</script>

<template>
	<div class="application">
		<router-view v-slot="{ Component }" class="views">
			<custom-transition>
				<component :is="Component" />
			</custom-transition>
		</router-view>
		<div class="mover" v-if="shouldShowMover"></div>
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
	@apply w-8 h-14
	bg-gray-300;
	-webkit-app-region: drag;
}
</style>
