<script lang="ts" setup>
import WindowCreator from "@/test/WindowCreator.vue"
import { WindowCreator as WindowCreatorClass } from "@/core/windowCreator"
import { getWindowPosition } from "@/utils/getWindowPosition"
import { ref, computed } from "vue"

const otherWindow = ref<WindowCreatorClass | null>(null)
const isOpening = computed(() => otherWindow.value !== null)
const cfg = {
	x: getWindowPosition().x + 50,
	y: getWindowPosition().y + 50,
}

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
		<window-creator name="⚙" @toggle="toggleWindowCreator" />
	</div>
</template>
