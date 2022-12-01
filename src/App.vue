<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { WindowController } from "@/core/WindowController"
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
// import { remote, ipcRenderer } from "@/utils"

const $route = useRoute()
const shouldShowMover = computed(() => $route.path === "/")

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(null)
const windowController = ref<WindowController | null>(null)

onMounted(() => {
	configRemoteMonitor.value = new ConfigRemoteMonitor()
	windowController.value = new WindowController()
	windowController.value?.listeningMovedPosition(() => {
		configRemoteMonitor.value?.setPositionfromLocalStore()
	})
	console.log(configRemoteMonitor.value.getLocalConfig())
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
