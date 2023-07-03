<script lang="ts" setup>
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { StoreManager } from "@/core/StoreManager"
import { ref, onBeforeMount } from "vue"
// import { debounce } from "ts-debounce"

import { StoredClipboard } from "@/share"
import { ClipboardMonitor } from "@/core/ClipboardMonitor"

const configRemoteMonitor = ref<ConfigRemoteMonitor>(new ConfigRemoteMonitor())
const storeManager = ref<StoreManager>(new StoreManager())
const clipManager = ref<ClipboardMonitor>(
	new ClipboardMonitor(new StoreManager(), {})
)

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

function deleteClipboard(index: number) {
	if (storeManager.value) {
		storeManager.value.deleteClipboard(index)
		clipboardData.value = storeManager.value.getStore().reverse()
	}
}

function copyClipboard(index: number) {
	const clipboard = clipboardData.value[index].clipboard

	if (clipManager.value) {
		clipManager.value.copyToClipboard(clipboard, isImage(clipboard))
	}
}
</script>

<template>
	<div class="copy-list" v-if="clipboardData">
		<template v-for="(item, index) of clipboardData" :key="item.time">
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
						{{
							isImage(item.clipboard) ? "IMAGE/PNG" : "TEXT/PLAIN"
						}}
						{{ getTranslatedSize(item.clipboard) }}
					</span>
				</span>
				<span class="opearations">
					<button class="op-btn" @click="copyClipboard(index)">
						复制
					</button>
					<button
						class="op-btn danger"
						@click="deleteClipboard(index)"
					>
						删除
					</button>
				</span>
			</div>
		</template>
	</div>
</template>

<style lang="postcss" scoped>
.copy-list {
	@apply relative inline-flex flex-col items-center w-full max-w-full overflow-x-hidden
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

.copy-image {
	@apply border-2 border-gray-400 dark:border-gray-600 w-fit;
}

.copy-image img {
	-webkit-user-drag: none;
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
	@apply inline-flex items-center text-xs px-2 py-1 mr-1 rounded border border-transparent
	bg-gray-200 dark:bg-gray-600 active:border-gray-600 active:dark:border-gray-400
	active:bg-gray-600 dark:active:bg-gray-200 active:text-gray-200 active:dark:text-gray-600
	transition-colors duration-150 cursor-pointer;
}

.danger {
	@apply bg-red-500 dark:bg-red-400 text-gray-50 dark:text-gray-700;
}
</style>
