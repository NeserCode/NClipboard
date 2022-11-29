<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
import { ref, onActivated, onDeactivated } from "vue"

function resizeCallback() {
	console.log("resized")
}

const applicationResizer = ref(new ResizeObserver(resizeCallback))

onActivated(() => {
	applicationResizer.value.observe(
		document.querySelector(".application") ?? document.body
	)
})

onDeactivated(() => {
	applicationResizer.value.disconnect()
})
</script>

<template>
	<div class="application">
		<router-view v-slot="{ Component }" class="views">
			<custom-transition>
				<component :is="Component" />
			</custom-transition>
		</router-view>
		<div class="mover"></div>
	</div>
</template>

<style lang="postcss" scoped>
.application {
	@apply inline-flex items-center border rounded overflow-y-hidden
	bg-black bg-opacity-40;
}
.views {
	@apply w-full h-full overflow-hidden;
}

.mover {
	@apply w-6 h-4 mx-4 rounded
	bg-white;
	-webkit-app-region: drag;
}
</style>
