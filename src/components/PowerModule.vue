<script lang="ts" setup>
import CustomTransition from "@/components/CustomTransition.vue"

import { PowerMonitor } from "@/core/PowerMonitor"
import {
	Battery0Icon,
	Battery50Icon,
	Battery100Icon,
	BoltIcon,
} from "@heroicons/vue/20/solid"

import { ref, computed } from "vue"
import { $Bus } from "@/utils"

let powerMonitor = new PowerMonitor(navigator)
const percentage = ref(powerMonitor.getPower().percentage)
const isCharging = ref(powerMonitor.getPower().isCharging)
const isChargingClass = computed(() => (isCharging.value ? "charging" : ""))

$Bus.on("power-update", () => {
	percentage.value = powerMonitor.getPower().percentage
	isCharging.value = powerMonitor.getPower().isCharging
})
</script>

<template>
	<div id="power">
		<span class="power-line">
			<span class="power-status">
				<custom-transition v-if="percentage <= 10"
					><Battery0Icon class="power-icon"
				/></custom-transition>
				<custom-transition v-else-if="percentage <= 50"
					><Battery50Icon class="power-icon"
				/></custom-transition>
				<custom-transition v-else-if="percentage <= 100">
					<Battery100Icon class="power-icon"
				/></custom-transition>
			</span>

			<span class="power-percentage">{{ percentage }}%</span>
			<span :class="['power-charging', isChargingClass]">
				<BoltIcon class="power-icon" />
			</span>
		</span>
	</div>
</template>

<style lang="postcss" scoped>
#power {
	@apply inline-flex justify-center items-center h-full py-1 px-2 my-2
	rounded hover:bg-slate-200 font-mono dark:hover:bg-gray-600
	transition duration-200;
}

.power-icon {
	@apply inline-flex justify-center items-center h-full w-6
	fill-slate-500 dark:fill-gray-400
	-translate-y-px;
}

.power-charging .power-icon {
	@apply h-3 w-0 overflow-hidden
	transition-all duration-200;
}

.power-charging.charging .power-icon {
	@apply w-3;
}

.power-line {
	@apply inline-flex justify-center items-center h-full;
}

.power-percentage {
	@apply inline-flex justify-center items-center h-full px-px
	text-xs text-slate-500 dark:text-gray-400
	select-none;
}
</style>
