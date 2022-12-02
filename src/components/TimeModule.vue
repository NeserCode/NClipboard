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
</script>

<template>
	<div id="time">
		<span class="time-line">{{
			`${time?.hours}:${time?.minutes}:${time?.seconds}`
		}}</span>
		<span class="time-line"></span>
	</div>
</template>
