<script lang="ts" setup>
import { WindowCreator } from "./main/windowCreator"
import CustomTransition from "@/components/CustomTransition.vue"
import { ref } from "vue"

const isOpening = ref(false)
const otherWindow = ref<WindowCreator | null>(null)
const cfg = {
	frame: true,
	model: true,
}

function toggleWindowCreator() {
	isOpening.value = !isOpening.value
	if (isOpening.value) {
		otherWindow.value = new WindowCreator(cfg, "/about")
		otherWindow.value.openWindow()
	} else otherWindow.value?.closeWindow()
}
</script>

<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link> |
		<button @click="toggleWindowCreator">open new window</button>
	</nav>
	<router-view v-slot="{ Component }">
		<custom-transition>
			<component :is="Component" />
		</custom-transition>
	</router-view>
</template>
