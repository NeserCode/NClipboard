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
const WeekDayMode = ref(localStorage.getItem("week-day-mode") === "week-day")
const weekdayModeClass = computed(() =>
	WeekDayMode.value ? "weekday-mode" : null
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
const toggleMode = (e: MouseEvent) => {
	if (e.button === 2) {
		MinuteMode.value = !MinuteMode.value
		localStorage.setItem("minute-mode", MinuteMode.value ? "minute" : "second")
	} else if (e.button === 0) {
		WeekDayMode.value = !WeekDayMode.value
		localStorage.setItem(
			"week-day-mode",
			WeekDayMode.value ? "week-day" : "none"
		)
	}
}
</script>

<template>
	<div
		id="time"
		@mousedown="toggleMode"
		:class="[minuteModeClass, weekdayModeClass]"
	>
		<span class="normal-line">
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
		</span>
		<span class="week-line">
			{{ time?.weekString }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
#time {
	@apply inline-flex items-center justify-center w-[97px] py-1 m-1 px-4 rounded
	text-sm font-normal font-mono text-gray-400
	hover:bg-slate-200 dark:hover:bg-gray-600 hover:cursor-pointer
	transition-all duration-300 select-none;
}

.normal-line {
	@apply inline-flex flex-col items-center justify-center;
}

.week-line {
	@apply inline-flex items-center justify-center w-0 overflow-hidden
	text-xs font-thin text-gray-400 transition-all duration-200;
}

#time.weekday-mode {
	@apply w-[142px];
}
#time.weekday-mode .week-line {
	@apply w-12 pl-4;
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
