<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"
</script>

<template>
	<router-view v-slot="{ Component }">
		<custom-transition>
			<component :is="Component" />
		</custom-transition>
	</router-view>
</template>
