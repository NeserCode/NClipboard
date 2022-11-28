<script lang="ts" setup>
import WindowCreator from "@/test/WindowCreator.vue"
import { WindowCreator as WindowCreatorClass } from "@/main/windowCreator"
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, computed } from "vue"

const otherWindow = ref<WindowCreatorClass | null>(null)
const isOpening = computed(() => otherWindow.value !== null)
const cfg = {
	frame: true,
	model: true,
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
		<window-creator
			name="open /about in a new window"
			@toggle="toggleWindowCreator"
		/>
	</div>
</template>
