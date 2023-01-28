<script lang="ts" setup>
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { StoreManager } from "@/core/StoreManager"
import { ref, onBeforeMount } from "vue"

import { StoredClipboard } from "@/share"

const configRemoteMonitor = ref<ConfigRemoteMonitor | null>(
	new ConfigRemoteMonitor()
)
const storeManager = ref<StoreManager | null>(new StoreManager())

const clipboardData = ref<StoredClipboard>([])

function toggleDarkmode(darkmode: boolean) {
	if (darkmode) document.querySelector("html")?.classList.add("dark")
	else document.querySelector("html")?.classList.remove("dark")
}

if (configRemoteMonitor.value) {
	configRemoteMonitor.value.listeningConfigUpdated((config) => {
		toggleDarkmode(config.darkmode)
		console.log("config updated")
	})
}

onBeforeMount(() => {
	if (storeManager.value)
		clipboardData.value = storeManager.value.getStore().reverse()
})

function isImage(raw: string) {
	let regx =
		/^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i

	return regx.test(raw)
}

function translateTime(time: number) {
	let date = new Date(time)

	// how far is the time from now
	let diff = new Date().getTime() - date.getTime()
	let diffHours = Math.floor(diff / (1000 * 3600))
	let diffMinutes = Math.floor(diff / (1000 * 60))
	let diffSeconds = Math.floor(diff / 1000)

	function getDiffString() {
		if (diffHours < 1) {
			if (diffMinutes < 1) {
				if (diffSeconds < 1) return "just now"
				return `${diffSeconds} seconds ago`
			}
			return `${diffMinutes} minutes ago`
		}
		return `${diffHours} hours ago`
	}

	if (date.toLocaleDateString() === new Date().toLocaleDateString())
		return `${date.toLocaleTimeString("chinese", {
			hour12: false,
		})} · ${getDiffString()}`
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString("chinese", {
		hour12: false,
	})}`
}

function getTranslatedSize(words: string): string {
	let bit = new Blob([words]).size
	let kb = bit / 1024
	let mb = kb / 1024
	let gb = mb / 1024

	if (gb > 1) return `${gb.toFixed(2)}GB`
	if (mb > 1) return `${mb.toFixed(2)}MB`
	if (kb > 1) return `${kb.toFixed(2)}KB`
	return `${bit}B`
}
</script>

<template>
	<div class="copy-list">
		<template v-for="item of clipboardData" :key="item.time">
			<div class="copy-item">
				<span class="copy-text" v-if="!isImage(item.clipboard)">{{
					item.clipboard
				}}</span>
				<span class="copy-image" v-else>
					<img :src="item.clipboard" alt="image from clipboard" />
				</span>
				<span class="details">
					<span class="translated-time">
						{{ translateTime(item.time) }}
					</span>
					<span class="type">
						{{ isImage(item.clipboard) ? "IMAGE/PNG" : "TEXT/PLAIN" }}
						{{ getTranslatedSize(item.clipboard) }}
					</span>
				</span>
				<span class="opearations">
					<span class="op-btn">全部复制</span>
					<span class="op-btn">删除</span>
				</span>
			</div>
		</template>
	</div>
</template>

<style lang="postcss" scoped>
.copy-list {
	@apply inline-flex flex-col items-center w-full h-[300px] max-w-full overflow-x-hidden
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	text-gray-700 dark:text-gray-300 overflow-y-auto
	transition-all duration-300;
}

.copy-item {
	@apply inline-flex flex-col justify-center w-full max-w-full p-4 box-border border rounded-none
	bg-gray-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600
	whitespace-pre font-mono
	transition-colors duration-300;
}

.copy-item .details {
	@apply inline-flex items-center w-full max-w-full mt-2
	text-gray-400
	transition-colors duration-300;
}
.details .translated-time {
	@apply inline-flex items-center text-sm;
}
.details .type {
	@apply inline-flex items-center text-xs ml-2 px-1 rounded-sm
	bg-gray-200 dark:bg-gray-600;
}

.opearations {
	@apply inline-flex items-center w-full max-w-full mt-2
	text-gray-400
	transition-colors duration-300;
}

.op-btn {
	@apply inline-flex items-center text-xs px-1.5 py-1 mr-1 rounded
	bg-gray-200 dark:bg-gray-600
	transition-colors duration-300;
}
</style>
