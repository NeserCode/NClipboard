<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from "vue"
import { TimeMonitor } from "@/core/TimeMonitor"

// get current time and update it every second.
const Monitor = ref<TimeMonitor | null>(new TimeMonitor())
let timer: string | number | NodeJS.Timeout | undefined
const time = ref(Monitor.value?.getTime())

const MinuteMode = ref(localStorage.getItem("minute-mode") === "minute")
const minuteModeClass = computed(() =>
	MinuteMode.value ? "minute-mode" : null
)

onMounted(() => {
	Monitor.value = new TimeMonitor()
	timer = setInterval(() => {
		time.value = Monitor.value?.getTime()
	}, 100)
})

onUnmounted(() => {
	Monitor.value?.destoryTimer()
	clearInterval(timer)
	Monitor.value = null
})

// function to add zero to the given number
const addZero = (num: number | undefined) => {
	if (num !== undefined) return num < 10 ? "0" + num : num
}

// function to toggle minute mode
const toggleMinuteMode = () => {
	MinuteMode.value = !MinuteMode.value
	localStorage.setItem("minute-mode", MinuteMode.value ? "minute" : "second")
}
</script>

<template>
	<div id="time" @click="toggleMinuteMode" :class="minuteModeClass">
		<span class="time-line">
			<span class="hour">{{ addZero(time?.hours) }}</span>
			<span class="spearate">:</span>
			<span class="minute">{{ addZero(time?.minutes) }}</span>
			<span class="spearate" v-if="!MinuteMode">:</span>
			<span class="second" v-if="!MinuteMode">{{
				addZero(time?.seconds)
			}}</span>
		</span>
		<span class="time-line">
			{{ `${time?.year}/${addZero(time?.month)}/${addZero(time?.day)}` }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
#time {
	@apply inline-flex flex-col items-center justify-center py-1 m-1 px-4 rounded
	text-sm font-normal font-mono text-gray-400
	hover:bg-slate-200 dark:hover:bg-gray-600 hover:cursor-pointer
	transition-colors duration-300 select-none;
}

.time-line > .spearate {
	@apply mx-0.5 font-thin;
}

#time.minute-mode .time-line .spearate {
	animation: flash 1.2s infinite steps(2, jump-none);
}

#time .time-line:first-child {
	@apply w-[72px] transition-all duration-200 overflow-hidden;
}

#time.minute-mode .time-line:first-child {
	@apply w-12 transition-all duration-200;
}

@keyframes flash {
	0% {
		@apply opacity-0;
	}
	50% {
		@apply opacity-100;
	}
	100% {
		@apply opacity-0;
	}
}
</style>
