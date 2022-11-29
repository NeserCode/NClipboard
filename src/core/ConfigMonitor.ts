import type { defaultConfig } from "@/share"
import { defaultLocalConfig } from "@/share"

// Electron modules
import { app, remote } from "electron"

// Node modules
import fs from "fs"

export class ConfigMonitor {
	constructor() {
		// this.initialLocalConfig()
	}

	public getLocalConfig(): defaultConfig {
		let config
		try {
			config = JSON.parse(
				fs.readFileSync(app.getPath("userData") + "/config.json", "utf8")
			)
		} catch (error) {
			config = null
			console.warn(error, "Config file not found")
		}
		return config
	}

	public getRemoteLocalConfig(): defaultConfig {
		const { app: remoteApp } = remote
		let config
		try {
			config = JSON.parse(
				fs.readFileSync(remoteApp.getPath("userData") + "/config.json", "utf8")
			)
		} catch (error) {
			config = null
			console.warn(error, "Config file not found")
		}
		return config
	}

	private initialLocalConfig() {
		if (this.getLocalConfig() === null)
			fs.writeFileSync(
				app.getPath("userData") + "/config.json",
				JSON.stringify(defaultLocalConfig)
			)
	}
}
