<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"

function resizeCallback() {
	console.log("resized")
}

const applicationResizer = ref(new ResizeObserver(resizeCallback))

onMounted(() => {
	applicationResizer.value.observe(
		document.querySelector(".application") ?? document.body
	)
})

onUnmounted(() => {
	applicationResizer.value.disconnect()
})

const $route = useRoute()
const shouldShowMover = computed(() => $route.path === "/")
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
