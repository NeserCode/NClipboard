import type { defaultConfig } from "@/share"
import { defaultLocalConfig } from "@/share"

// Electron modules
import { remote } from "electron"
const { app: remoteApp } = remote

// Node modules
import os from "os"
import fs from "fs"

export class ConfigRemoteMonitor {
	private CONFIG_FILE_PATH: string =
		remoteApp.getPath("userData") + "/config.json"
	private CONFIG: defaultConfig | null = null

	constructor() {
		this.CONFIG = this.getLocalConfig()
		this.initialLocalConfig()
		console.log(os.userInfo(), os.release())
	}

	public getLocalConfig(): defaultConfig {
		let config
		try {
			config = JSON.parse(fs.readFileSync(this.CONFIG_FILE_PATH, "utf8"))
		} catch (error) {
			config = null
			console.warn(error, "Config file not found")
		}
		return config
	}

	private initialLocalConfig() {
		if (this.CONFIG === null)
			fs.writeFileSync(
				this.CONFIG_FILE_PATH,
				JSON.stringify(defaultLocalConfig)
			)
	}

	private saveConfig() {
		fs.writeFileSync(this.CONFIG_FILE_PATH, JSON.stringify(this.CONFIG))
		console.log("saved config", this.CONFIG)
	}

	public setPositionfromLocalStore() {
		const position = localStorage.getItem("win-position")
		if (position && this.CONFIG) {
			const { x, y } = JSON.parse(position)
			this.CONFIG.x = x
			this.CONFIG.y = y
			this.saveConfig()
		} else if (!this.CONFIG) this.initialLocalConfig()
	}
}
