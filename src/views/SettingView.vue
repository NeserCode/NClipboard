<script lang="ts" setup>
import SelectionBox from "@/components/FormComponents/SelectionBox.vue"
</script>

<template>
	<div class="setting">
		<span class="setting-item">
			<selection-box />
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.setting {
	@apply inline-flex flex-col items-center w-full h-[300px] overflow-y-auto
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600;
}
</style>
