<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue"
import { TimeMonitor } from "@/core/TimeMonitor"

// get current time and update it every second.
const Monitor = ref<TimeMonitor | null>(new TimeMonitor())
let timer: string | number | NodeJS.Timeout | undefined
const time = ref(Monitor.value?.getTime())

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
</script>

<template>
	<div id="time">
		<span class="time-line">{{
			`${addZero(time?.hours)}
			${addZero(time?.minutes)}
			${addZero(time?.seconds)}`
		}}</span>
		<span class="time-line">
			{{ `${time?.year}/${addZero(time?.month)}/${addZero(time?.day)}` }}
		</span>
	</div>
</template>

<style lang="postcss" scoped>
#time {
	@apply inline-flex flex-col items-center justify-center py-2 px-4
	text-sm font-normal text-gray-500 dark:text-gray-400
	hover:bg-slate-200 dark:hover:bg-gray-600 hover:cursor-pointer
	transition-colors duration-300;
}
</style>
