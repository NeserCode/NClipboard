import type { StoredClipboard, OnceClipboard } from "@/share"

// Electron modules
import { remote } from "electron"
const { app: remoteApp } = remote

// Node modules
import fs from "fs"

export class StoreManager {
	private STORE_PATH: string =
		remoteApp.getPath("userData") + "/stored-clipboard.json"
	private STORE: StoredClipboard = this.getStore()
	private STORE_MAX_LENGTH = 10

	constructor(options?: { maxLength?: number }) {
		if (options && options.maxLength) this.STORE_MAX_LENGTH = options.maxLength
		this.initialStore()
	}

	private saveStore(store: StoredClipboard) {
		fs.writeFileSync(this.STORE_PATH, JSON.stringify(store))
	}

	private initialStore(): StoredClipboard {
		if (this.STORE === null)
			fs.writeFileSync(this.STORE_PATH, JSON.stringify([]))
		return this.STORE
	}

	public pushToStore(clipboard: OnceClipboard) {
		if (
			(this.STORE.length >= 1 &&
				this.STORE[this.STORE.length - 1].clipboard !== clipboard) ||
			this.STORE.length === 0
		) {
			const store = this.STORE
			store.push({
				time: Date.now(),
				clipboard,
			})
			if (store.length > this.STORE_MAX_LENGTH) store.shift()
			this.saveStore(store)
			console.log("StoreManager:pushed to store", store)
		}
	}

	public getStore(): StoredClipboard {
		let store
		try {
			store = JSON.parse(fs.readFileSync(this.STORE_PATH, "utf8"))
		} catch (error) {
			store = null
			console.warn(error, "Store file not found")
			this.initialStore()
		}
		return store
	}
}
