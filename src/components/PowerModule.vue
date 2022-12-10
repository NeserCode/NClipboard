<script lang="ts" setup>
import { PowerMonitor } from "@/core/PowerMonitor"

let powerMonitor = new PowerMonitor(navigator)

console.log(powerMonitor.getPower())
</script>

<template>
	<div id="power">
		<span class="power-line">
			<span class="power-status">power</span>
		</span>
	</div>
</template>
<style lang="postcss" scoped></style>
