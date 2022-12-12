<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { WindowController } from "@/core/WindowController"
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"

import { GenshinKit } from "@genshin-kit/core"

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

const GenshinMain = new GenshinKit()
const GenshinUid_test = 191328306

GenshinMain.loginWithCookie(
	"_MHYUUID=5a4942e3-0f54-4ed0-81f7-762073a43bcf; _MHYUUID=5a4942e3-0f54-4ed0-81f7-762073a43bcf; DEVICEFP_SEED_ID=cbfb33dfa8cdaa50; DEVICEFP_SEED_TIME=1669956998486; DEVICEFP=38d7ec53fd055; LOGIN_PLATFORM_SWITCH_STATUS={%22bll8iq97cem8%22:{%22pwd_login_tab%22:true%2C%22password_reset_entry%22:true%2C%22sms_login_tab%22:true}}"
)

GenshinMain.getUserInfo(GenshinUid_test).then((result) => {
	console.log(result)
})
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
