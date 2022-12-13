import { clipboard } from "@/utils"
import { StoreManager } from "@/core/StoreManager"

import type { OnceClipboard } from "@/share"

export class ClipboardMonitor {
	private CLIPBOARD = clipboard
	private STORE_MANAGER: StoreManager | null = null

	constructor(sm: StoreManager) {
		this.STORE_MANAGER = sm
	}

	public getClipboard() {
		const containsString = this.CLIPBOARD.availableFormats()
			.join("/")
			.split("/")
		let rtv: OnceClipboard

		if (containsString.includes("text")) rtv = this.CLIPBOARD.readText()
		else if (containsString.includes("image"))
			rtv = this.CLIPBOARD.readImage().toDataURL()
		else if (containsString.includes("html")) rtv = this.CLIPBOARD.readHTML()
		else if (containsString.includes("rtf")) rtv = this.CLIPBOARD.readRTF()
		else if (containsString.includes("bookmark"))
			rtv = this.CLIPBOARD.readBookmark()
		else rtv = this.CLIPBOARD.readText()

		return {
			readContent: rtv,
			usefulFormat: this.CLIPBOARD.availableFormats(),
		}
	}

	private pushToStore() {
		const clipboard = this.getClipboard()
		if (clipboard.readContent) {
			this.STORE_MANAGER?.pushToStore(clipboard.readContent)
		}
	}
}
