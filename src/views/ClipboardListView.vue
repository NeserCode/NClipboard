<script lang="ts" setup>
import { ConfigRemoteMonitor } from "@/core/ConfigRemoteMonitor"
import { StoreManager } from "@/core/StoreManager"
import { ref, onBeforeMount } from "vue"
import { getMainWindowBounds } from "@/utils"
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

function horizontalScroll(e: WheelEvent) {
	if (e.deltaX) return
	e.preventDefault()
	const container = document.querySelector(".copy-list") as HTMLElement
	if (container && e.deltaY) {
		const bounds = getMainWindowBounds()
		const scrollLeft = container.scrollLeft
		container.scrollTo({
			left: (bounds.width * Math.abs(e.deltaY)) / e.deltaY + scrollLeft,
			top: 0,
			behavior: "smooth",
		})
	}
}

function handleClipboardUpdate(index: number, e: MouseEvent) {
	if (e.button === 2) {
		deleteClipboard(index)
	} else {
		copyClipboard(index)
	}
}
</script>

<template>
	<div class="copy-list" v-if="clipboardData" @wheel="horizontalScroll">
		<template v-for="(item, index) of clipboardData" :key="item.time">
			<div
				class="copy-item"
				@click="handleClipboardUpdate(index, $event)"
			>
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
				<!-- <span class="opearations">
					<button class="op-btn" >
						复制
					</button>
					<button
						class="op-btn danger"
						@click="deleteClipboard(index)"
					>
						删除
					</button>
				</span> -->
			</div>
		</template>
	</div>
</template>

<style lang="postcss" scoped>
.copy-list {
	@apply relative inline-flex items-center w-full max-w-full h-[120px]
  bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600
	text-gray-700 dark:text-gray-300 overflow-x-auto
	transition-all duration-300
	snap-x snap-mandatory;
}

.copy-item {
	@apply inline-flex flex-col justify-center w-full max-w-xs h-[120px] p-4 box-border border rounded-none
	bg-gray-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600
	whitespace-pre font-mono
	transition-colors duration-300
	snap-start;
}

.copy-text,
.copy-image {
	@apply inline-block w-full max-w-full h-[80px] truncate;
}

.copy-image img {
	-webkit-user-drag: none;
}

.copy-item .details {
	@apply inline-flex items-center w-full max-w-full flex-wrap
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
</style>
